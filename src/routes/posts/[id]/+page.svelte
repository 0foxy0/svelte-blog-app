<script lang="ts">
  import type { PageServerData } from "./$types";
  import Post from "$lib/components/Post.svelte";

  export let data: PageServerData;
</script>

<svelte:head>
  <title>{data.post.title}</title>
</svelte:head>

<Post post={data.post} />
