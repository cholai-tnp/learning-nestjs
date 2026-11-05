import type { Dialect } from 'sequelize';

// Shared by the Nest app (app.module.ts) and the migration runner (migrate.ts).
export const databaseConfig = {
  dialect: 'postgres' as Dialect,
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'myuser',
  password: process.env.DB_PASSWORD ?? 'mypassword',
  database: process.env.DB_NAME ?? 'mydb',
};
