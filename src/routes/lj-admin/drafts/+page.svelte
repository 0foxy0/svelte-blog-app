<script lang="ts">
  import { goto } from "$app/navigation";
  import ManageDraftPreview from "$lib/components/ManageDraftPreview.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  $: drafts = data.drafts;
  const { sessionCookie } = data;

  const redirectToCreatePostPage = () => {
    goto("/lj-admin/post");
  };
</script>

<main>
  <div class="flex-box">
    <button on:click={redirectToCreatePostPage}>+</button>
  </div>
  {#each drafts as draft}
    <ManageDraftPreview {draft} {sessionCookie} />
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
</style>
