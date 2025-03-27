<script lang="ts">
  import type { PageData } from './$types';

  interface FormValues {
    title?: string;
    content?: string;
  }

  interface ActionError {
    error: string;
    values?: FormValues;
  }

  type ActionData = ActionError;

  function isError(form: ActionData | null): form is ActionError {
    return form !== null && 'error' in form;
  }

  export let data: PageData;
  export let form: ActionData;

  let title = '';
  let content = '';

  // Recover form values after error
  $: if (isError(form) && form.values) {
    title = form.values.title ?? title;
    content = form.values.content ?? content;
  }
</script>

<div class="max-w-4xl mx-auto p-6">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-semibold">New Note in {data.notebook.name}</h1>
    <a
      href="/notes?notebookId={data.notebook.id}"
      class="px-4 py-2 text-gray-600 hover:text-gray-800"
    >
      Back to Notes
    </a>
  </div>

  <form 
    action="?/createNote" 
    method="POST" 
    class="space-y-6"
  >
    <input type="hidden" name="notebookId" value={data.notebook.id} />
    
    {#if isError(form)}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{form.error}</span>
      </div>
    {/if}

    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        bind:value={title}
        placeholder="Note title"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>

    <div>
      <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
      <textarea
        id="content"
        name="content"
        bind:value={content}
        placeholder="Write your note here..."
        class="w-full h-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      ></textarea>
    </div>

    <button
      type="submit"
      class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Create Note
    </button>
  </form>
</div> 