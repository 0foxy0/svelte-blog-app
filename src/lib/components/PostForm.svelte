<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Post from "./Post.svelte";
  import type { FormPostOrDraft } from "$lib/types/FormPostOrDraft";
  import type { PostFormButtons } from "$lib/types/PostFormButtons";
  import { createDraft } from "$lib/helper/client/api/drafts/createDraft";
  import { createPost } from "$lib/helper/client/api/posts/createPost";
  import { escapeTags } from "$lib/helper/client/postForm/escapeTags";
  import { correctEditorBehaviour } from "$lib/helper/client/postForm/correctEditorBehaviour";

  type ToolbarAction = "BOLD" | "ITALIC" | "LIST" | "QUOTES" | "LINK" | "TABLE";

  const handleSaveAsDraft = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const [title, description, body] = [
      formData.get("title"),
      formData.get("description"),
      formData.get("body"),
    ];

    if (!title || !description || !body) {
      error = "Title, Description or Content is empty";
      return;
    }

    const resStatus = await createDraft(
      title.toString(),
      description.toString(),
      body.toString(),
      sessionCookie
    );

    if (resStatus !== 200) {
      error = "Unexpected Error";
      return;
    }

    goto("/lj-admin");
  };

  const handlePost = async (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const [title, description, body] = [
      formData.get("title"),
      formData.get("description"),
      formData.get("body"),
    ];

    if (!title || !description || !body) {
      error = "Title, Description or Content is empty";
      return;
    }

    const resStatus = await createPost(
      title.toString(),
      description.toString(),
      body.toString(),
      sessionCookie
    );

    if (resStatus !== 200) {
      error = "Unexpected Error";
      return;
    }

    goto("/lj-admin");
  };

  const buttonDefaultValues = {
    primary: { label: "Post", onClick: handlePost },
    secondary: { label: "Save as draft", onClick: handleSaveAsDraft },
  };

  export let sessionCookie: string;
  export let buttons: PostFormButtons = buttonDefaultValues;
  export let post: FormPostOrDraft | undefined = undefined;
  export let error = "";

  let currentPost: FormPostOrDraft = post ?? {
    date: "",
    title: "",
    description: "",
    body: "",
    latestChangeDate: "",
  };
  let form: HTMLFormElement;

  if (!buttons.primary) {
    buttons.primary = buttonDefaultValues.primary;
  }
  if (!buttons.secondary) {
    buttons.secondary = buttonDefaultValues.secondary;
  }

  onMount(() => {
    const titleInput = document.querySelector(
      'input[name="title"]'
    ) as HTMLInputElement | null;
    const descInput = document.querySelector(
      'input[name="description"]'
    ) as HTMLInputElement | null;
    const content = document.querySelector("textarea");

    form = document.querySelector("form") as HTMLFormElement;

    if (!titleInput || !descInput || !content) {
      return;
    }

    titleInput.onkeyup = () => (currentPost.title = titleInput.value);
    descInput.onkeyup = () => (currentPost.description = descInput.value);
    content.onkeyup = () => (currentPost.body = content?.value);
  });

  const executeToolbarAction = (action: ToolbarAction) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) {
      return;
    }

    switch (action) {
      case "BOLD":
        break;
      case "ITALIC":
        break;
      case "LIST":
        break;
      case "QUOTES":
        break;
      case "LINK":
        break;
      case "TABLE":
        break;
    }
  };
</script>

<form on:submit|preventDefault={buttons.primary?.onClick}>
  <label for="title">Title</label>
  <input id="title" value={post?.title ?? ""} name="title" />

  <label for="description">Description</label>
  <input id="description" value={post?.description ?? ""} name="description" />

  <div id="editor">
    <label for="body">Content</label>
    <div id="editor-toolbar">
      <button
        class="editor-button"
        type="button"
        on:click={() => executeToolbarAction("BOLD")}>B</button
      >
      <button
        class="editor-button"
        type="button"
        on:click={() => executeToolbarAction("ITALIC")}><i>Italic</i></button
      >
      <button
        class="editor-button"
        type="button"
        on:click={() => executeToolbarAction("LIST")}
      >
        <iconify-icon class="editor-toolbar-icon" icon="cil:list" />
      </button>
      <button
        class="editor-button"
        type="button"
        on:click={() => executeToolbarAction("QUOTES")}
      >
        <iconify-icon class="editor-toolbar-icon" icon="ri:double-quotes-r" />
      </button>
      <button
        class="editor-button"
        type="button"
        on:click={() => executeToolbarAction("LINK")}
      >
        <iconify-icon
          class="editor-toolbar-icon"
          icon="material-symbols:link"
        />
      </button>
      <button
        class="editor-button"
        type="button"
        on:click={() => executeToolbarAction("TABLE")}
      >
        <iconify-icon class="editor-toolbar-icon" icon="uiw:table" />
      </button>
    </div>
    <textarea
      id="body"
      value={post?.body ?? ""}
      name="body"
      on:keyup={escapeTags}
      on:keydown={correctEditorBehaviour}
    />
  </div>

  {#if error}
    <p class="form-error">{error}</p>
  {/if}

  <div class="buttons">
    <button
      class="form-button"
      id="draftBtn"
      type="button"
      on:click={() => buttons.secondary?.onClick(form)}
      >{buttons.secondary?.label}</button
    >
    <button class="form-button" id="postBtn" type="submit"
      >{buttons.primary?.label}</button
    >
  </div>
</form>
<h1 id="previewTitle">Preview</h1>
<Post post={currentPost} />

<style>
  form {
    max-width: 1000px;
    margin: 4rem auto;
  }
  label {
    margin-top: 20px;
    margin-bottom: 4px;
  }
  label:first-of-type {
    margin-top: 0;
  }

  #editor {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  #editor-toolbar {
    background-color: var(--theme-button-background);
    display: flex;
  }
  .editor-button {
    border-radius: 0;
    padding: 8px 20px;
    height: auto;
    font-size: 15px;
    border-right: 1px solid;
    margin: 0;
  }
  .editor-button:last-of-type {
    border: none;
  }
  .editor-toolbar-icon {
    font-size: 18px;
  }
  textarea {
    resize: vertical;
    height: 300px;
    outline: none;
    border: 1px solid transparent;
    background-color: var(--theme-input-background);
  }
  textarea:hover,
  textarea:focus {
    border: 1px solid var(--theme-accent);
  }

  .form-button {
    border-radius: 5px;
    padding: 10px;
    height: auto;
    font-size: 14px;
  }
  #draftBtn:hover {
    background-color: var(--theme-button-secondary-hover);
  }
  #postBtn {
    margin-left: 10px;
    background-color: var(--theme-accent);
    color: white;
  }
  #postBtn:hover {
    background-color: var(--theme-accent-light);
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 1rem;
  }
  #previewTitle {
    text-align: center;
    text-decoration: underline wavy;
    margin-bottom: 35px;
  }
</style>
