<script lang="ts">
  import { onMount } from 'svelte'

  import type { Tag } from '../routes/create/index.json'
  interface TagWithSelected extends Tag {
    selected: boolean
  }

  export let tags: Tag[][] = [[]]
  const queryKey = 'tags'
  let params: URLSearchParams,
    currentTags: string[],
    mounted: boolean = false

  onMount(() => {
    params = new URLSearchParams(window.location.search)
    currentTags = params.get(queryKey)?.split(',') ?? []
    mounted = true
  })

  let categorisedTags: TagWithSelected[][]
  $: categorisedTags = mounted
    ? tags.map((category) =>
        category.map((tag) => ({
          ...tag,
          selected: currentTags?.includes(tag.name),
        }))
      )
    : [[]]

  function updateQueryString(newSelected: string[]) {
    params.set(queryKey, Array.from(new Set(newSelected)).join(','))
    window.location.search = params.toString()
  }

  function onTagClick(tag: TagWithSelected) {
    tag.selected
      ? updateQueryString(currentTags.filter((name) => name !== tag.name))
      : updateQueryString([...currentTags, tag.name])
  }
</script>

<style>
  section {
    max-width: 800px;
    margin: auto;
  }
  ul {
    margin: 0;
    width: 100%;
    height: 50px;
  }
  .type {
    --color: var(--primary-color);
  }
  .theme {
    --color: var(--secondary-color);
  }
  li {
    list-style-type: none;
    float: left;
    padding: 4px;
    border-radius: var(--border-radius);
    border: 1px solid #333;
    margin: 4px;
    cursor: pointer;
    color: var(--color);
    border-color: var(--color);
  }
  .selected {
    background-color: var(--color);
    color: var(--background-color);
  }
</style>

<section>
  {#each categorisedTags as tags}
    {#if tags?.length}
      <ul>
        {#each tags as tag}
          <li
            class:selected={tag.selected}
            class={tag.category}
            on:click={() => onTagClick(tag)}>
            {tag.name}
          </li>
        {/each}
      </ul>
    {/if}
  {/each}
</section>
