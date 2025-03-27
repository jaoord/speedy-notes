import { db } from '$lib/db';
import { notes } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const note = await db.select().from(notes).where(eq(notes.id, params.id));

    if (!note[0]) {
      throw redirect(303, '/notes');
    }

    return { 
      note: note[0],
      notebookId: note[0].notebookId
    };
  } catch (error) {
    console.error('Error loading note:', error);
    throw redirect(303, '/notes');
  }
};

export const actions: Actions = {
  deleteNote: async ({ params }) => {
    try {
      await db.delete(notes).where(eq(notes.id, params.id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting note:', error);
      return fail(500, { error: 'Failed to delete note' });
    }
  }
}; 