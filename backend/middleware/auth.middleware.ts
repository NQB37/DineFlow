import type { RequestHandler } from 'express';
import { HttpError } from '../lib/http';
import { verifyAccessToken } from '../lib/tokens';
import type { UserRole } from '../types/user';

declare module 'express-serve-static-core' {
  export interface Request {
    user: {
      id: string;
      role: UserRole;
    };
  }
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const [scheme, token] = req.headers.authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    next(new HttpError(401, 'Unauthorized'));
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch {
    next(new HttpError(401, 'Unauthorized'));
  }
};

export const requireRole =
  (...allowedRoles: UserRole[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      next(new HttpError(401, 'Unauthorized'));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new HttpError(403, 'Forbidden'));
      return;
    }

    next();
  };
