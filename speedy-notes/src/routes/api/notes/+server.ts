import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notes } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
  const notebookId = url.searchParams.get('notebookId');
  
  if (!notebookId) {
    return json({ error: 'Notebook ID is required' }, { status: 400 });
  }

  try {
    const notesList = await db
      .select({
        id: notes.id,
        title: notes.title,
        createdAt: notes.createdAt
      })
      .from(notes)
      .where(eq(notes.notebookId, notebookId))
      .orderBy(notes.createdAt);

    return json(notesList, {
      headers: {
        'Cache-Control': 'public, max-age=60' // Cache for 1 minute
      }
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
} 