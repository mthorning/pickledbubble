<script>
  import Nav from '../components/Nav.svelte'
  import { stores } from '@sapper/app'

  export let segment
  const { page } = stores()
</script>

<style>
  main {
    height: 100vh;
    max-width: 1000px;
    margin: auto;
    box-sizing: border-box;
    padding: 25px 10px;
  }
  :global(main a) {
    color: var(--primary-color);
    text-decoration: none;
  }
  :global(main a):hover {
    color: var(--secondary-color);
  }
  @media (min-width: 600px) {
    main {
      padding: 25px;
    }
  }
</style>

{#if segment || $page.error}
  <Nav {segment} />
{/if}

<main>
  <slot />
</main>
