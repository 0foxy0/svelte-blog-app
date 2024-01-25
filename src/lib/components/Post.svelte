<script lang="ts">
  import { firstDateIsOlder } from "$lib/helper/client/firstDateIsOlder";
  import type { FormPostOrDraft } from "$lib/types/FormPostOrDraft";
  import type { Post } from "$lib/types/Post";
  import { onMount } from "svelte";
  import { marked } from "marked";

  const setInnerHTML = async (post: Post | FormPostOrDraft) => {
    if (typeof document === "undefined") {
      return;
    }

    const content = document.querySelector("#content");
    if (!content) {
      return;
    }

    content.innerHTML = await marked(post.body);
  };

  export let post: Post | FormPostOrDraft;
  $: post && setInnerHTML(post);
  let date = new Date();

  if ((post as Post)?.date) {
    date = new Date((post as Post).date);
  }

  onMount(() => {
    setInnerHTML(post);
    if (location.pathname.includes("/lj-admin/posts")) {
      post.latestChangeDate = new Date().toISOString();
    }
  });
</script>

<main id="main">
  <header id="header">
    <p id="date">
      {date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
      {post.latestChangeDate &&
      firstDateIsOlder(post.date, post.latestChangeDate)
        ? ` | Updated: ${new Date(post.latestChangeDate).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}`
        : ""}
    </p>
    <h1 id="post-title">{post.title}</h1>
    <p>
      <a
        href="https://github.com/0foxy0"
        target="_blank"
        rel="noopener noreferrer">@0foxy0</a
      >
    </p>
    <p id="post-desc">{post.description}</p>
  </header>
  <article id="content" />
</main>

<style>
  #header {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 3px solid var(--theme-seperator-color);
  }
  #date {
    color: var(--theme-text-light);
  }
  #post-title {
    margin: 10px 0 1rem;
    animation: color-switching 5s infinite ease-in-out;
  }
  #post-desc {
    margin-top: 15px;
    font-size: 20px;
  }

  #content {
    margin-top: 2rem;
  }
</style>
