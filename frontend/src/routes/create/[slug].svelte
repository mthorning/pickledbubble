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
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<h1>{article.title}</h1>

<div class="content">
  {@html article.body}
</div>
<ClapButton id={article.id} claps={article.claps} />
