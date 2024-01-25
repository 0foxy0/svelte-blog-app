<script lang="ts">
  import { goto } from "$app/navigation";
  import { beforeUpdate } from "svelte";
  import type { LayoutServerData } from "./$types";

  export let data: LayoutServerData;
  $: authorized = data.authorized;

  beforeUpdate(() => {
    if (!authorized) {
      goto("/lj-login");
    }
  });
</script>

<svelte:head>
  <title>Admin Panel | ECL</title>
</svelte:head>

<slot />
