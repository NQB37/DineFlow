import { describe, expect, it, vi } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import { signAccessToken } from '../lib/tokens';
import { UserRole } from '../types/user';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

describe('auth middleware', () => {
  it('attaches user from a valid bearer token', () => {
    const token = signAccessToken({ userId: 'user-1', role: UserRole.ADMIN });
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const next = vi.fn() as NextFunction;

    requireAuth(req, {} as Response, next);

    expect(req.user).toEqual({ id: 'user-1', role: UserRole.ADMIN });
    expect(next).toHaveBeenCalledWith();
  });

  it('rejects users without an allowed role', () => {
    const req = { user: { id: 'user-1', role: UserRole.CUSTOMER } } as Request;
    const next = vi.fn() as NextFunction;

    requireRole(UserRole.ADMIN)(req, {} as Response, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 403 }));
  });
});
