import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '$lib/db/schema';
import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const client = postgres(DATABASE_URL, {
  ssl: process.env.NODE_ENV === 'production',
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false
});

export const db = drizzle(client, { schema }); 