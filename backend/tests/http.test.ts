import { describe, expect, it, vi } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import { asyncRoute, HttpError } from '../lib/http';

describe('HttpError', () => {
  it('stores status and message', () => {
    const error = new HttpError(401, 'Unauthorized');

    expect(error.status).toBe(401);
    expect(error.message).toBe('Unauthorized');
  });
});

describe('asyncRoute', () => {
  it('passes rejected errors to next', async () => {
    const error = new Error('boom');
    const next = vi.fn() as NextFunction;
    const handler = asyncRoute(async () => {
      throw error;
    });

    await handler({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
