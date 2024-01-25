<script lang="ts">
  import { goto } from "$app/navigation";
  import ManagePostPreview from "$lib/components/ManagePostPreview.svelte";
  import LogoutContextMenu from "$lib/components/LogoutContextMenu.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  $: posts = data.posts;
  $: sessionCookie = data.sessionCookie;

  const redirectToCreatePostPage = () => {
    goto("/lj-admin/post");
  };
</script>

<LogoutContextMenu {sessionCookie} />
<main>
  <div class="flex-box">
    <button on:click={redirectToCreatePostPage}>+</button>
    <a id="drafts-link" href="/lj-admin/drafts">Drafts</a>
  </div>
  {#each posts as post}
    <ManagePostPreview {post} {sessionCookie} />
  {/each}
</main>

<style>
  button {
    padding: 0;
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
    font-size: 32px;
    background-color: transparent;
  }
  button:hover,
  button:focus {
    color: var(--theme-accent);
  }
  main {
    margin-top: 4rem;
  }
  .flex-box {
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  #drafts-link {
    font-size: 20px;
    text-decoration: none;
    color: var(--theme-accent);
  }
  #drafts-link:hover,
  #drafts-link:focus {
    color: var(--theme-accent-light);
  }
</style>
