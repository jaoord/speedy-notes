<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  export let data: PageData;
  export let form: ActionData;

  let selectedNotebook: string | null = data.selectedNotebookId;
  let notebookToDelete: string | null = null;

  // Reset form after successful submission
  $: if (form?.success) {
    notebookToDelete = null;
    // Only navigate in the browser
    if (browser) {
      goto('?notebookId=' + selectedNotebook, { replaceState: true });
    }
  }

  function selectNotebook(notebookId: string) {
    selectedNotebook = notebookId;
    if (browser) {
      goto('?notebookId=' + notebookId, { replaceState: true });
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex gap-8">
    <!-- Notebooks Sidebar -->
    <div class="w-64">
      <h2 class="text-xl font-semibold mb-4">Notebooks</h2>
      <form action="?/createNotebook" method="POST" class="mb-4">
        <div class="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="New notebook name"
            class="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            type="submit"
            class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center leading-none"
          >
            +
          </button>
        </div>
      </form>
      <div class="space-y-2">
        {#each data.notebooks as notebook}
          <div class="flex items-center gap-2">
            <button
              on:click={() => selectNotebook(notebook.id)}
              class="flex-1 text-left px-4 py-2 rounded-lg {selectedNotebook === notebook.id ? 'bg-blue-100' : 'hover:bg-gray-100'}"
            >
              {notebook.name}
            </button>
            <button
              on:click={() => notebookToDelete = notebook.id}
              class="px-3 py-1 text-red-600 hover:text-red-800 cursor-pointer text-lg font-bold"
              title="Delete notebook"
            >
              ×
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- Notes Area -->
    <div class="flex-1">
      {#if selectedNotebook}
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Your Notes</h2>
          <a
            href="/notes/new?notebookId={selectedNotebook}"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <span class="text-lg">+</span>
            New Note
          </a>
        </div>
        <div class="space-y-4">
          {#each data.notes as note}
            <div class="p-4 border rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
              <h3 class="font-semibold">{note.title}</h3>
            </div>
          {/each}
          {#if data.notes.length === 0}
            <p class="text-gray-500 italic">No notes yet. Click "New Note" to create one!</p>
          {/if}
        </div>
      {:else}
        <p class="text-gray-600">Select a notebook to view its notes</p>
      {/if}
    </div>
  </div>
</div>

{#if notebookToDelete}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
      <h3 class="text-xl font-semibold mb-4">Delete Notebook</h3>
      <p class="text-gray-600 mb-6">Are you sure you want to delete this notebook? This action cannot be undone.</p>
      <div class="flex justify-end gap-4">
        <button
          on:click={() => notebookToDelete = null}
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <form action="?/deleteNotebook" method="POST">
          <input type="hidden" name="notebookId" value={notebookToDelete} />
          <button
            type="submit"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  </div>
{/if} 