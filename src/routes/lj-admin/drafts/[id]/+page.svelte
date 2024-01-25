<script lang="ts">
  import { goto } from "$app/navigation";
  import PostForm from "$lib/components/PostForm.svelte";
  import { deleteDraft } from "$lib/helper/client/api/drafts/deleteDraft";
  import { updateDraft } from "$lib/helper/client/api/drafts/updateDraft";
  import { createPost } from "$lib/helper/client/api/posts/createPost";
  import { convertPostOrDraftToFormPostOrDraft } from "$lib/helper/client/convertPostOrDraftToFormPostOrDraft";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  $: draft = data.draft;
  let error = "";

  const handleUpdateDraft = async (form: HTMLFormElement) => {
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

    const resStatus = await updateDraft(
      draft.id,
      title.toString(),
      description.toString(),
      body.toString(),
      data.sessionCookie
    );

    if (resStatus !== 200) {
      error = "Unexpected Error";
      return;
    }

    goto("/lj-admin/drafts");
  };

  const handleDeleteDraftAndPost = async (event: SubmitEvent) => {
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

    await deleteDraft(draft.id, data.sessionCookie);

    const resStatus = await createPost(
      title.toString(),
      description.toString(),
      body.toString(),
      data.sessionCookie
    );

    if (resStatus !== 200) {
      error = "Unexpected Error";
      return;
    }

    goto("/lj-admin");
  };
</script>

<PostForm
  post={convertPostOrDraftToFormPostOrDraft(draft)}
  buttons={{
    secondary: {
      label: "Update",
      onClick: handleUpdateDraft,
    },
    primary: {
      label: "Post",
      onClick: handleDeleteDraftAndPost,
    },
  }}
  {error}
  sessionCookie={data.sessionCookie}
/>
