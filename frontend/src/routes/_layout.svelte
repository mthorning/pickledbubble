<script>
  import Nav from '../components/Nav.svelte'

  export let segment
</script>

<style>
  main {
    height: 100vh;
    max-width: 1000px;
    margin: auto;
    box-sizing: border-box;
    padding: 0 10px 25px 10px;
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

{#if segment}
  <Nav
    style={`
      --nav-bg-color: var(--background-color);
      --nav-dropdown-bg: var(--background-color);
      --nav-dropdown-border: #aaa; 
      --mobile-button-bg: rgba(255, 255, 255, 0.05);
      --mobile-button-color: var(--text-color);
      --nav-selected-underline-color: var(--secondary-color);
      --nav-z-index: 110;
      --nav-item-hover-color: var(--secondary-color);
    `}
    {segment} />
{/if}

<main>
  <slot />
</main>
