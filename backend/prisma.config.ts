import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'models',
  migrations: {
    path: 'migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
