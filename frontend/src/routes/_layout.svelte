<script>
  import Nav from '../components/Nav.svelte'

  export let segment
</script>

<style>
  :global(body) {
    --primary-color: #007c9b;
    --background-color: #fff;
    --text-color: #888;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  :global(h1) {
    color: var(--primary-color);
  }

  main {
    position: relative;
    max-width: 56em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
