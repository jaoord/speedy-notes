import { db } from './db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email));
}

export async function requireAuth(locals: App.Locals) {
  if (!locals.user) {
    throw fail(401, { error: 'Unauthorized' });
  }
  return locals.user;
}

export async function requireNotebookAccess(locals: App.Locals, notebookId: string) {
  const user = await requireAuth(locals);
  const notebook = await db
    .select()
    .from(notebooks)
    .where(eq(notebooks.id, notebookId))
    .where(eq(notebooks.userId, user.id));

  if (!notebook[0]) {
    throw fail(403, { error: 'Access denied' });
  }

  return notebook[0];
} 