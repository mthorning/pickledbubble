<script>
  export let status
  export let error

  const dev = process.env.NODE_ENV === 'development'
</script>

<style>
  div {
    max-width: 600px;
    margin: 30px auto;
  }
  h1,
  p {
    margin: 0 auto;
  }
  p {
    margin: 1em auto;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div>
  <h1>{error?.message ?? 'Uh oh!'}</h1>

  <p>
    It looks like something has gone wrong! Please return to the
    <a href="/">homepage</a>
    or
    <a href="/contact">contact us</a>
    if you need help.
  </p>
</div>
