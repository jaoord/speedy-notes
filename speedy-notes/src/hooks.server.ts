import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  if (!session) {
    return resolve(event);
  }

  const user = await db.select().from(users).where(eq(users.id, session));

  if (!user[0]) {
    event.cookies.delete('session');
    return resolve(event);
  }

  event.locals.user = user[0];
  return resolve(event);
}; 