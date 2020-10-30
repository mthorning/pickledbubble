<script lang="ts">
  import { onMount } from 'svelte'
  import FaBars from 'svelte-icons/fa/FaBars.svelte'

  interface Route {
    name: string
    href: string
    regex: RegExp
  }

  export let segment: string,
    style: string,
    homePageName: string = 'home',
    isHome: boolean

  const routes: Route[] = [
    { name: 'about', href: '/about', regex: new RegExp(/about/) },
    { name: 'create', href: '/create', regex: new RegExp(/^create/) },
  ]

  let open = false
  let nav: HTMLElement
  const toggleOpen = () => (open = open ? false : true)

  const handleDocClick = ({ target }) => {
    if (open && !nav.contains(target)) open = false
  }

  onMount(() => {
    document.addEventListener('click', handleDocClick)
  })

  const detectAnchorClick = (e: MouseEvent) => {
    const element = e.target as HTMLElement
    if (element.tagName === 'A') open = false
  }
</script>

<style>
  nav {
    display: flex;
    align-items: center;
    font-weight: 300;
    padding: 0 1em;
    box-sizing: border-box;
    width: 100%;
    height: 57px;
    background: var(--nav-bg-color);
    position: fixed;
    top: 0;
    z-index: var(--nav-z-index, 1);
  }
  img {
    height: 50px;
    width: auto;
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-38%);
  }
  ul {
    margin: 0;
    padding: 0;
  }
  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }
  li {
    list-style-type: none;
  }
  .menu-items {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 57px;
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: 0.5s ease-in-out height;
    background: var(--nav-dropdown-bg);
    border-bottom: 1px solid var(--text-color);
  }
  .menu-items.open {
    height: 150px;
  }
  .menu-items li a {
    width: 100%;
    text-align: center;
  }
  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: inline-block;
  }
  button {
    width: 3em;
    height: 3em;
    padding: 12px;
    color: var(--mobile-button-color);
    background: var(--mobile-button-bg);
    align-self: center;
    cursor: pointer;
    border: 1px solid var(--mobile-button-color);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
  }
  button:focus {
    outline: none;
  }
  @media (min-width: 400px) {
    nav {
      position: static;
    }
    img {
      position: absolute;
      top: 5px;
      left: initial;
      right: 5px;
    }
    button {
      display: none;
    }
    .menu-items {
      z-index: initial;
      position: initial;
      width: initial;
      border-bottom: 0;
      height: initial;
      background: rgba(0, 0, 0, 0);
    }
    .menu-items li {
      display: block;
      float: left;
    }
    .menu-items li:hover {
      color: var(--nav-item-hover-color);
    }
    .menu-items li a {
      width: initial;
    }
    [aria-current] {
      position: relative;
      display: inline-block;
    }

    [aria-current]::after {
      position: absolute;
      content: '';
      width: calc(100% - 10px);
      height: 1px;
      background-color: var(--nav-selected-underline-color);
      display: block;
      bottom: 2px;
      left: 5px;
    }
  }
</style>

<nav {style} bind:this={nav}>
  <button on:click={toggleOpen}>
    <FaBars />
  </button>
  <ul
    data-test="menu-items"
    class:open
    class="menu-items"
    on:click={detectAnchorClick}>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === undefined ? 'page' : undefined}
        href="/">
        {homePageName}
      </a>
    </li>
    <li />
    {#each routes as route}
      <li>
        <a
          rel="prefetch"
          aria-current={route.regex.test(segment) ? 'page' : undefined}
          href={route.href}>
          {route.name}
        </a>
      </li>
    {/each}
  </ul>
  {#if !isHome}<img alt="pickledbubble logo" src="logo.png" />{/if}
</nav>
