import { describe, expect, it } from 'vitest';
import {
  hashRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
} from '../lib/tokens';
import { UserRole } from '../types/user';

describe('token helpers', () => {
  it('signs and verifies access tokens', () => {
    const token = signAccessToken({ userId: 'user-1', role: UserRole.ADMIN });
    const payload = verifyAccessToken(token);

    expect(payload.userId).toBe('user-1');
    expect(payload.role).toBe(UserRole.ADMIN);
  });

  it('hashes refresh tokens deterministically', () => {
    const token = signRefreshToken({ userId: 'user-1', tokenId: 'refresh-1' });

    expect(hashRefreshToken(token)).toBe(hashRefreshToken(token));
    expect(hashRefreshToken(token)).not.toContain(token);
  });
});
