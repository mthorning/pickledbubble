<script lang="ts">
  import { onMount, SvelteComponent } from 'svelte'
  import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
  import FaPinterestP from 'svelte-icons/fa/FaPinterestP.svelte'
  import FaEtsy from 'svelte-icons/fa/FaEtsy.svelte'

  interface Route {
    name: string
    href: string
    regex: RegExp
  }

  export let segment: string, style: string

  const routes: Route[] = [
    { name: 'create', href: '/create', regex: new RegExp(/^create/) },
    { name: 'contact', href: '/contact', regex: new RegExp(/contact/) },
  ]

  interface SocialLink {
    component: typeof SvelteComponent
    href: string
  }
  const socialLinks: SocialLink[] = [
    {
      component: FaInstagram,
      href: 'https://www.instagram.com/pickledbubble/',
    },
    {
      component: FaPinterestP,
      href: 'https://www.pinterest.co.uk/pickledbubble/_saved/',
    },
    { component: FaEtsy, href: '' },
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
    font-weight: 300;
    max-width: 1000px;
    margin: auto;
    box-sizing: border-box;
    width: 100%;
    background: var(--nav-bg-color);
    top: 0;
    z-index: var(--nav-z-index, 1);
    position: relative;
    height: 150px;
  }
  img {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    height: 100px;
  }
  @media (min-width: 600px) {
    img {
      height: 120px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    position: absolute;
    display: inline-block;
  }
  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }
  li {
    list-style-type: none;
    display: block;
    float: left;
  }
  li a {
    text-align: center;
  }
  a {
    text-decoration: none;
    display: inline-block;
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
  .menu-items {
    left: 8px;
  }
  .social {
    right: 8px;
  }
  @media (min-width: 600px) {
    .menu-items {
      left: 20px;
    }
    .social {
      right: 20px;
    }
  }
  .menu-items li:hover {
    color: var(--nav-item-hover-color);
  }
  .menu-items li a {
    padding: 0 8px 12px;
  }
  .menu-items,
  .social {
    bottom: 0;
  }
  .social li {
    padding-bottom: 12px;
  }
  .social li a {
    border: 1px solid var(--text-color);
    border-radius: var(--border-radius);
    height: 15px;
    width: 15px;
    margin: 0 4px;
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .social li a:hover {
    background: var(--secondary-color);
    border-color: var(--secondary-color);
    color: var(--background-color);
  }
</style>

<nav {style} bind:this={nav}>
  <ul data-test="menu-items" class="menu-items" on:click={detectAnchorClick}>
    {#each routes as route}
      <li>
        <a
          rel="prefetch"
          aria-current={route.regex.test(segment) ? 'page' : undefined}
          href={route.href}>
          {route.name.toUpperCase()}
        </a>
      </li>
    {/each}
  </ul>
  <a href="/"><img alt="pickledbubble logo" src="logo.png" /></a>
  <ul class="social">
    {#each socialLinks as socialLink}
      {#if socialLink.href}
        <li>
          <a href={socialLink?.href}>
            <svelte:component this={socialLink.component} />
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</nav>
