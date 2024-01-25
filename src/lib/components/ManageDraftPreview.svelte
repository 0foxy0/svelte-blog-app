<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { deleteDraft } from "$lib/helper/client/api/drafts/deleteDraft";
  import type { Draft } from "$lib/types/Draft";

  export let draft: Draft;
  export let sessionCookie: string;

  const deleteDraftAndRefreshData = async () => {
    await deleteDraft(draft.id, sessionCookie);
    invalidateAll();
  };
</script>

<article>
  <h1 id="post-title"><a href="/lj-admin/drafts/{draft.id}">{draft.title}</a></h1>
  <p>{draft.description}</p>
  <button id="delete-icon" on:click={deleteDraftAndRefreshData}>
    <iconify-icon icon="mdi:trashcan-outline" height="32" />
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
  #delete-icon:hover {
    color: var(--theme-accent);
  }
</style>
