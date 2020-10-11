<script>
    import Nav from "../components/Nav.svelte";

    export let segment;
</script>

<style>
    :global(body) {
        --primary-bg-color: #007c9b;
        --primary-text-color: #eee;
        background-color: var(--primary-bg-color);
        color: var(--primary-text-color);
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
