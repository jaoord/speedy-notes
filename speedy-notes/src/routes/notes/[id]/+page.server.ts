import { db } from '$lib/server/db';
import { notes } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
  const note = await db.select().from(notes).where(eq(notes.id, params.id));

  if (!note[0]) {
    throw redirect(303, '/notes');
  }

  return { 
    note: note[0],
    notebookId: note[0].notebookId
  };
};

export const actions: Actions = {
  deleteNote: async ({ params }) => {
    const note = await db.select().from(notes).where(eq(notes.id, params.id));
    
    if (!note[0]) {
      return fail(404, { error: 'Note not found' });
    }

    const notebookId = note[0].notebookId;
    
    await db.delete(notes).where(eq(notes.id, params.id));
    
    throw redirect(303, `/notes?notebookId=${notebookId}`);
  }
}; 