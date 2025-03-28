import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { notebooks } from '$lib/db/schema';

export async function GET() {
  try {
    const notebooksList = await db.select().from(notebooks);
    return json(notebooksList);
  } catch (error) {
    console.error('Error fetching notebooks:', error);
    return json({ error: 'Failed to fetch notebooks' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const { name } = await request.json();
    const [newNotebook] = await db.insert(notebooks).values({ name }).returning();
    return json(newNotebook);
  } catch (error) {
    console.error('Error creating notebook:', error);
    return json({ error: 'Failed to create notebook' }, { status: 500 });
  }
} 