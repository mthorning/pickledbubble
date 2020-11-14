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
  import IoIosPricetags from 'svelte-icons/io/IoIosPricetags.svelte'
  import ClapButton from '../../../components/ClapButton.svelte'

  import type { Data } from './index.json'

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
  .top-section h1 {
    margin-bottom: 12px;
  }
  .title,
  .required-items {
    margin-bottom: 30px;
  }
  .title {
    align-self: flex-start;
  }
  .meta,
  .meta div {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .icon {
    height: 20px;
    width: 20px;
    color: var(--primary-color);
    margin-right: 4px;
  }

  /* styling paper */
  .paper {
    position: relative;
    margin: 20px auto;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px #888;
    background-image: repeating-linear-gradient(
      white 0px,
      white 24px,
      teal 25px
    );
    padding-top: 6px;
    padding-left: 56px;
    padding-right: 16px;
    line-height: 25px;
    letter-spacing: 1px;
    word-spacing: 5px;
    margin: auto;
    text-align: left;
    font-family: 'selimaregular', cursive;
    box-shadow: 1px 1px 5px var(--text-color);
    display: inline-block;
  }

  /* styling red vertical line */
  .paper::before {
    content: '';
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 40px;
    background-color: rgba(255, 0, 0, 0.6);
  }
  .required-items {
    flex: 1 0 auto;
    text-align: center;
    font-size: 20px;
  }
  .required-items h2,
  :global(.required-items ul) {
    margin: 0;
  }
  .required-items h2 {
    color: var(--secondary-color);
  }
  .clap {
    display: flex;
    justify-content: flex-end;
  }
  .clap p {
    max-width: 250px;
    display: flex;
    flex: 1 1;
    text-align: right;
    align-items: center;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 30px 0 50px;
    flex-wrap: wrap;
  }
  .tags {
    margin-top: 30px;
    flex: 1;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    align-self: flex-end;
  }
  .tags a {
    margin-left: 2px;
  }
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<div class="top-section">
  <div class="title">
    <h1>{article.title}</h1>

    <div class="meta">
      {#if article?.timeToComplete}
        <div>
          <div class="icon">
            <IoIosHourglass />
          </div>
          {article.timeToComplete}
        </div>
      {/if}

      {#if article?.difficulty}
        <div>
          <div class="icon">
            <GiScissors />
          </div>
          {article.difficulty}
        </div>
      {/if}
    </div>
  </div>
  <div class="required-items">
    {#if article?.requiredItems}
      <div class="paper">
        <h2>You Will Need:</h2>
        {@html article.requiredItems}
      </div>
    {/if}
  </div>
</div>

<div class="content">
  {@html article.body}
</div>

<div class="footer">
  <div class="clap">
    <p>If you enjoyed this article then let me know with a clap or two!</p>
    <ClapButton id={article.id} claps={article.claps} />
  </div>
  {#if article.tags}
    <div class="tags">
      <div class="icon">
        <IoIosPricetags />
      </div>
      {#each article.tags as tag, i}
        {i > 0 ? ', ' : ''}
        <a href={`/create?tags=${tag.name}`}>{tag.name}</a>
      {/each}
    </div>
  {/if}
</div>
