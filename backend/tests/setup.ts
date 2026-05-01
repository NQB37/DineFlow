process.env.NODE_ENV = 'test';
process.env.PORT = '8000';
process.env.DATABASE_URL =
  'postgresql://test:test@localhost:5432/dineflow_test';
process.env.FRONTEND_URL = 'http://localhost:3000';
process.env.JWT_ACCESS_SECRET = 'test-access-secret-at-least-thirty-two-chars';
process.env.JWT_REFRESH_SECRET =
  'test-refresh-secret-at-least-thirty-two-chars';
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret';
process.env.GOOGLE_REDIRECT_URI = 'http://localhost:8000/auth/google/callback';
