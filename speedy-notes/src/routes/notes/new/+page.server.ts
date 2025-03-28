import { db } from '$lib/server/db';
import { notebooks, notes } from '$lib/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

interface FormValues {
  title?: string;
  content?: string;
}

interface ActionSuccess {
  success: true;
}

interface ActionError {
  success?: never;
  error: string;
  values?: FormValues;
}

type ActionResult = ActionSuccess | ActionError;

export const load: PageServerLoad = async ({ url }) => {
  const notebookId = url.searchParams.get('notebookId');
  if (!notebookId) {
    throw redirect(303, '/notes');
  }

  // Verify notebook exists and user has access
  const notebook = await db.select().from(notebooks).where(eq(notebooks.id, notebookId));

  if (!notebook[0]) {
    throw redirect(303, '/notes');
  }

  return { notebook: notebook[0] };
};

export const actions: Actions = {
  createNote: async ({ request, url }) => {
    const formData = await request.formData();
    const title = formData.get('title')?.toString().trim();
    const content = formData.get('content')?.toString().trim();
    const notebookId = formData.get('notebookId')?.toString();

    if (!title || !content || !notebookId) {
      return fail(400, {
        error: 'All fields are required',
        values: { title, content }
      } satisfies ActionError);
    }

    // Verify notebook exists
    const notebook = await db.select().from(notebooks).where(eq(notebooks.id, notebookId));

    if (!notebook[0]) {
      return fail(404, {
        error: 'Notebook not found'
      } satisfies ActionError);
    }

    // Try to insert the note
    try {
      await db.insert(notes).values({
        title,
        content,
        notebookId
      });
    } catch (error) {
      console.error('Error creating note:', error);
      return fail(500, {
        error: 'Failed to create note',
        values: { title, content }
      } satisfies ActionError);
    }

    // If we get here, the note was created successfully
    return redirect(303, `/notes?notebookId=${notebookId}`);
  }
}; 