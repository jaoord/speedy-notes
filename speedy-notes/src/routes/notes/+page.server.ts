import { db } from '$lib/db';
import { notebooks, notes } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq } from 'drizzle-orm';
import type { InferModel } from 'drizzle-orm';

type Note = InferModel<typeof notes>;

export const load: PageServerLoad = async ({ url }) => {
  try {
    const notebooksList = await db.select().from(notebooks);
    const selectedNotebookId = url.searchParams.get('notebookId');
    
    let notesList: Note[] = [];
    if (selectedNotebookId) {
      notesList = await db.select().from(notes).where(eq(notes.notebookId, selectedNotebookId));
    }

    return { 
      notebooks: notebooksList,
      notes: notesList,
      selectedNotebookId
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return { notebooks: [], notes: [], selectedNotebookId: null };
  }
};

export const actions: Actions = {
  createNotebook: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.toString();

    if (!name) {
      return fail(400, { error: 'Name is required' });
    }

    try {
      await db.insert(notebooks).values({ name });
      return { success: true };
    } catch (error) {
      console.error('Error creating notebook:', error);
      return fail(500, { error: 'Failed to create notebook' });
    }
  },

  createNote: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();
    const notebookId = formData.get('notebookId')?.toString();

    if (!title || !content || !notebookId) {
      return fail(400, { error: 'All fields are required' });
    }

    try {
      await db.insert(notes).values({
        title,
        content,
        notebookId
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating note:', error);
      return fail(500, { error: 'Failed to create note' });
    }
  },

  deleteNotebook: async ({ request }) => {
    const formData = await request.formData();
    const notebookId = formData.get('notebookId')?.toString();

    if (!notebookId) {
      return fail(400, { error: 'Notebook ID is required' });
    }

    try {
      await db.delete(notebooks).where(eq(notebooks.id, notebookId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting notebook:', error);
      return fail(500, { error: 'Failed to delete notebook' });
    }
  }
}; 