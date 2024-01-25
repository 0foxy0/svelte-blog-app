<script lang="ts">
  import { goto } from "$app/navigation";

  export let sessionCookie: string;

  let pos = { x: 0, y: 0 };
  let menu: { w?: number; h: number; y?: number } = { h: 0, y: 0 };
  let browser: { w?: number; h: number; y?: number } = { h: 0, y: 0 };
  let showMenu = false;

  const rightClickContextMenu = (e: MouseEvent | TouchEvent) => {
    showMenu = true;
    browser = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    if (e instanceof TouchEvent) {
      const touch = e.touches[0] || e.changedTouches[0];

      pos.x = touch.pageX;
      pos.y = touch.pageY;
    } else if (e instanceof MouseEvent) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }

    if (browser.h - pos.y < menu.h) {
      pos.y = pos.y - menu.h;
    }
    if ((browser.w ?? 0) - pos.x < (menu.w ?? 0)) {
      pos.x = pos.x - (menu.w ?? 0);
    }
  };

  const onPageClick = () => {
    showMenu = false;
  };

  const getContextMenuDimension = (node: HTMLElement) => {
    let height = node.offsetHeight;
    let width = node.offsetWidth;

    menu = {
      h: height,
      w: width,
    };
  };

  const logout = async () => {
    const res = await fetch("/api/session/logout", {
      headers: { Cookie: sessionCookie },
    });

    if (res.status === 200) {
      goto("/");
    }
  };
</script>

{#if showMenu}
  <nav
    use:getContextMenuDimension
    style="position: absolute; top:{pos.y}px; left:{pos.x}px; z-index: 9999"
  >
    <div>
      <button on:click={logout}>
        <iconify-icon icon="material-symbols:logout" height="24" />
        Logout
      </button>
    </div>
  </nav>
{/if}

<svelte:window
  on:contextmenu|preventDefault={rightClickContextMenu}
  on:click={onPageClick}
/>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    padding: 10px;
    border-radius: 5px;
    overflow: hidden;
    font-size: 16px;
  }
</style>
