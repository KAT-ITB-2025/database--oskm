import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

export const migrationClient = postgres(
  process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/coba',
  { max: 1 },
);
export const db = drizzle(migrationClient, { schema });

await migrate(db, { migrationsFolder: './drizzle' });
await migrationClient.end();
