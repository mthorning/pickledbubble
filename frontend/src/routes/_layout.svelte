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
    padding: calc(57px + 25px) 10px 25px 10px;
  }
  @media (min-width: 400px) {
    main {
      padding: 25px;
    }
  }
</style>

<Nav
  style={`
      --nav-bg-color: var(--background-color);
      --nav-dropdown-bg: var(--background-color);
      --nav-dropdown-border: #aaa; 
      --mobile-button-bg: rgba(255, 255, 255, 0.05);
      --mobile-button-color: var(--text-color);
      --nav-selected-underline-color: var(--primary-color);
      --nav-z-index: 110;
    `}
  {segment} />

<main>
  <slot />
</main>
