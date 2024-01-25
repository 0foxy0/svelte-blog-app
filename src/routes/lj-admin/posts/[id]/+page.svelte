<script lang="ts">
  import { goto } from "$app/navigation";
  import PostForm from "$lib/components/PostForm.svelte";
  import { updatePost } from "$lib/helper/client/api/posts/updatePost";
  import { convertPostOrDraftToFormPostOrDraft } from "$lib/helper/client/convertPostOrDraftToFormPostOrDraft";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  $: post = data.post;
  let error = "";

  const handleUpdatePost = async (event: SubmitEvent) => {
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

    const resStatus = await updatePost(
      post.id,
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
  post={convertPostOrDraftToFormPostOrDraft(post)}
  buttons={{
    primary: {
      label: "Update",
      onClick: handleUpdatePost,
    },
  }}
  {error}
  sessionCookie={data.sessionCookie}
/>
