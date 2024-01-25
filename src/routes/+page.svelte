<script lang="ts">
  import PostPreview from "$lib/components/PostPreview.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { posts } = data;
</script>

<svelte:head>
  <title>Explore-Code-Learn</title>
</svelte:head>

<section id="title">
  <h1>Explore - Code - Learn</h1>
  <p>A blog about a german fullstack web developer.</p>
</section>
<main>
  {#each posts as post}
    <PostPreview {...post} />
  {/each}
</main>

<style>
  #title {
    margin-top: 2.5rem;
    text-align: center;
    animation: color-switching 5s infinite ease-in-out;
    margin-bottom: 4rem;
  }
  #title h1 {
    font-size: 43px;
  }
  #title p {
    margin-top: 0.5rem;
    color: var(--theme-text-light);
  }
</style>
