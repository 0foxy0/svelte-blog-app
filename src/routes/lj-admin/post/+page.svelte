<script lang="ts">
  import PostForm from "$lib/components/PostForm.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<PostForm sessionCookie={data.sessionCookie} />
