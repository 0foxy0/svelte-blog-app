<script lang="ts">
  import { beforeUpdate } from "svelte";
  import type { ActionData, PageServerData } from "./$types";
  import { goto } from "$app/navigation";

  export let data: PageServerData;
  export let form: ActionData;

  $: authorized = data.authorized;

  beforeUpdate(() => {
    if (form?.success || authorized) {
      goto("/lj-admin");
    }
  });
</script>

<svelte:head>
  <title>Login | ECL</title>
</svelte:head>

<form method="post">
  <input name="username" type="text" placeholder="Username" />
  <input name="password" type="password" placeholder="Password" />
  {#if form?.error}
    <p class="form-error">{form.error}</p>
  {/if}
  <button>Login</button>
</form>

<style>
  form {
    max-width: 400px;
    margin: 4rem auto;
  }
  input:last-of-type {
    margin-top: 10px;
  }
  button {
    width: 100px;
    padding: 10px;
    height: auto;
    margin: 0 auto;
    margin-top: 1rem;
    background-color: var(--theme-accent);
    color: white;
  }
  button:hover {
    background-color: var(--theme-accent-light);
  }
</style>
