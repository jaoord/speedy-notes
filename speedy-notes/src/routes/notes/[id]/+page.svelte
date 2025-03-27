<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  export let data: PageData;
  export let form: ActionData;

  let showDeleteConfirm = false;

  $: if (form?.success && browser) {
    goto('/notes?notebookId=' + data.notebookId);
  }
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-semibold">{data.note.title}</h1>
    <div class="flex gap-4">
      <a
        href="/notes?notebookId={data.notebookId}"
        class="px-4 py-2 text-gray-600 hover:text-gray-800"
      >
        Back to Notes
      </a>
      <button
        on:click={() => showDeleteConfirm = true}
        class="px-4 py-2 text-red-600 hover:text-red-800"
      >
        Delete Note
      </button>
    </div>
  </div>

  <div class="prose max-w-none">
    <p class="text-gray-500 mb-8">
      Created on {new Date(data.note.createdAt).toLocaleDateString()}
    </p>
    <div class="whitespace-pre-wrap">{data.note.content}</div>
  </div>
</div>

{#if showDeleteConfirm}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
      <h3 class="text-xl font-semibold mb-4">Delete Note</h3>
      <p class="text-gray-600 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
      <div class="flex justify-end gap-4">
        <button
          on:click={() => showDeleteConfirm = false}
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <form action="?/deleteNote" method="POST">
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