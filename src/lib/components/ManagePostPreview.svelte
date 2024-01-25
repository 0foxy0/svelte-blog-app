<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { deletePost } from "$lib/helper/client/api/posts/deletePost";
  import type { Post } from "$lib/types/Post";

  export let post: Post;
  export let sessionCookie: string;

  const parsedDate = new Date(post.date);

  const redirectToEditPostPage = (postId: Post["id"]) => {
    goto(`/lj-admin/posts/${postId}`);
  };
  const deletePostAndRefreshData = async () => {
    await deletePost(post.id, sessionCookie);
    invalidateAll();
  };
</script>

<article>
  <p id="date">
    {parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </p>
  <h1 id="post-title"><a href="/posts/{post.id}">{post.title}</a></h1>
  <p>{post.description}</p>
  <button id="delete-icon" on:click={deletePostAndRefreshData}>
    <iconify-icon icon="mdi:trashcan-outline" height="32" />
  </button>
  <button id="edit-icon" on:click={() => redirectToEditPostPage(post.id)}>
    <iconify-icon icon="solar:pen-linear" height="32" />
  </button>
</article>

<style>
  article:first-of-type {
    border-top: 3px solid var(--theme-seperator-color);
  }
  article {
    position: relative;
    border-bottom: 3px solid var(--theme-seperator-color);
    padding: 10px 0;
  }
  #date {
    color: var(--theme-text-light);
    font-size: 20px;
  }
  #post-title {
    margin: 5px 0;
    font-size: 36px;
  }
  #post-title a {
    color: var(--theme-text);
    text-decoration-color: var(--theme-accent);
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
  #delete-icon {
    top: 5px;
  }
  #edit-icon {
    top: 47px;
  }
  #delete-icon:hover,
  #edit-icon:hover {
    color: var(--theme-accent);
  }
</style>
