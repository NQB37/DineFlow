import { env } from './env';

export const corsOption = {
  origin: env.FRONTEND_URL,
  credentials: true,
};
