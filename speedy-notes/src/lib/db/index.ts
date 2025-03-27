import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const client = postgres(DATABASE_URL, {
  ssl: process.env.NODE_ENV === 'production',
  max: 10, // Maximum number of connections
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Timeout connections after 10 seconds
  prepare: false // Disable prepared statements for better compatibility
});

export const db = drizzle(client, { schema }); 