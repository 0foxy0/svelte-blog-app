<script lang="ts">
  import type { Post } from "$lib/types/Post";

  export let id: Post["id"];
  export let date: Post["date"];
  export let title: Post["title"];
  export let description: Post["description"];

  const parsedDate = new Date(date);
</script>

<article>
  <p id="date">
    {parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </p>
  <h1 id="post-title"><a href="/posts/{id}">{title}</a></h1>
  <p id="post-desc">{description}</p>
  <a href="/posts/{id}">Read more about it</a>
</article>

<style>
  article:first-of-type {
    border-top: 3px solid var(--theme-seperator-color);
  }
  article {
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
  #post-desc {
    margin-bottom: 1rem;
  }
</style>
