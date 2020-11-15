<style>
  .container {
    width: 100%;
    text-align: center;
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 200px;
    margin: 50px auto;
  }
  a {
    width: 75px;
    padding: 5px;
    border-radius: var(--border-radius);
    border: 1px solid var(--color);
    background-color: var(--background-color);
    color: var(--color);
  }
  a:hover {
    border: 1px solid var(--color);
    background-color: var(--color);
    color: var(--background-color);
  }
  img {
    width: 100%;
    max-width: 800px;
    height: auto;
    margin: auto;
  }
</style>

<svelte:head>
  <title>PickledBubble</title>
</svelte:head>

<div class="container">
  <img alt="pickled bubble logo" src="logo.png" />
  <div class="buttons">
    <a style="--color:var(--primary-color);" href="/create">CREATE</a>
    <a style="--color:var(--secondary-color);" href="/contact">CONTACT</a>
  </div>
</div>
