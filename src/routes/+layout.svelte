<script lang="ts">
  import "$lib/styles/global.css";
  import logo from "$lib/assets/logo.png";
  import "iconify-icon";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { Theme } from "$lib/types/Theme";
  const storeKey = "LJ_THEME";
  const THEMES: { light: Theme; dark: Theme } = {
    light: {
      name: "LIGHT",
      displayedIconName: "ph:moon",
    },
    dark: {
      name: "DARK",
      displayedIconName: "ph:sun",
    },
  };

  let themeIconName = THEMES.light.displayedIconName;
  let theme = THEMES.light.name;

  onMount(() => {
    const storedTheme = localStorage.getItem(storeKey);
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (storedTheme === null) {
      if (systemSettingDark) theme = THEMES.dark.name;
      localStorage.setItem(storeKey, theme);
    } else if (storedTheme === THEMES.dark.name) {
      theme = storedTheme;
      document.documentElement.classList.toggle("dark");
    }

    themeIconName =
      theme === THEMES.dark.name
        ? THEMES.dark.displayedIconName
        : THEMES.light.displayedIconName;
  });

  const changeTheme = (currentTheme: Theme["name"]) => {
    themeIconName =
      currentTheme === THEMES.dark.name
        ? THEMES.light.displayedIconName
        : THEMES.dark.displayedIconName;

    theme =
      currentTheme === THEMES.dark.name ? THEMES.light.name : THEMES.dark.name;

    localStorage.setItem(storeKey, theme);
    document.documentElement.classList.toggle("dark");
  };
</script>

{#if $page.error}
  <main id="error">
    <slot />
  </main>
{:else}
  <header>
    <h2>
      <a href="/" class="flex-box">
        <img src={logo} alt="A clickable Logo of the Brand" width="48" height="48" />
        <span id="name">Foxy</span>
      </a>
    </h2>
    <button id="toggle-theme-button" on:click={() => changeTheme(theme)}>
      <iconify-icon icon={themeIconName} height="32" />
    </button>
  </header>
  <slot />
  <footer>
    <a href="/legal-notice">Legal Notice</a>
    <a href="/privacy-policy">Privacy Policy</a>
  </footer>
{/if}

<style>
  #error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #name {
    color: var(--theme-text);
  }
  #name:hover,
  #name:focus {
    color: var(--theme-accent);
  }
  #toggle-theme-button {
    width: 37px;
    height: 37px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
  }
  footer a:first-of-type {
    margin-right: 2rem;
  }
</style>
