<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`create/${params.slug}.json`)
    const data = await res.json()

    if (res.status === 200) {
      return { data }
    } else {
      this.error(res.status, data.message)
    }
  }
</script>

<script lang="ts">
  import IoIosHourglass from 'svelte-icons/io/IoIosHourglass.svelte'
  import GiScissors from 'svelte-icons/gi/GiScissors.svelte'
  import ClapButton from '../../components/ClapButton.svelte'

  import type { Data } from './[slug].json'

  export let data: Data
  const { article } = data
</script>

<style>
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .content :global(img) {
    max-width: 75%;
    margin: 2em auto;
    display: block;
  }
  .top-section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .title,
  .required-items {
    margin-bottom: 30px;
  }
  .title {
    align-self: flex-start;
  }
  .meta {
    display: flex;
    align-items: center;
  }
  .meta .icon {
    height: 20px;
    width: 20px;
    color: var(--primary-color);
    margin-right: 4px;
  }
  .required-items {
    flex: 1 0 auto;
    text-align: center;
  }
  .required-items div {
    margin: auto;
    font-family: 'Caveat', cursive;
    font-size: 25px;
    background-image: linear-gradient(
        0deg,
        transparent 5em,
        rgba(255, 0, 0, 0.2) 0,
        transparent 5.1em
      ),
      linear-gradient(rgba(0, 0, 255, 0.3) 1px, transparent 0);
    background-size: 100% 35px;
    display: inline-block;
    border: 1px solid var(--text-color);
    box-shadow: 1px 1px 5px var(--text-color);
    padding: 25px;
  }
  .required-items h2 {
    margin-bottom: 25px;
    font-size: 43px;
    color: var(--secondary-color);
  }
  .clap {
    display: flex;
    justify-content: flex-end;
  }
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<div class="top-section">
  <div class="title">
    <h1>{article.title}</h1>

    {#if article?.timeToComplete}
      <div class="meta">
        <div class="icon">
          <IoIosHourglass />
        </div>
        {article.timeToComplete}
      </div>
    {/if}

    {#if article?.difficulty}
      <div class="meta">
        <div class="icon">
          <GiScissors />
        </div>
        {article.difficulty}
      </div>
    {/if}
  </div>
  <div class="required-items">
    {#if article?.requiredItems}
      <div>
        <h2>You Will Need:</h2>
        {@html article.requiredItems}
      </div>
    {/if}
  </div>
</div>

<div class="content">
  {@html article.body}
</div>
<div class="clap">
  <ClapButton id={article.id} claps={article.claps} />
</div>
