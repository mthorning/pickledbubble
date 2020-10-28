<script lang="ts">
  import type { Tag } from '../routes/create/index.json'

  export let selectedTags = []
  export let unselectedTags = []

  const queryKey = 'tags'

  function updateQueryString(newSelected: string[]) {
    const params = new URLSearchParams(window.location.search)
    params.set(queryKey, Array.from(new Set(newSelected)).join(','))
    window.location.search = params.toString()
  }

  const names = (tags: Tag[]) => tags.map((tag) => tag.name)

  function onTagClick(name: string) {
    updateQueryString([...names(selectedTags), name])
  }

  function onSelectedTagClick(name: string) {
    updateQueryString(names(selectedTags.filter((tag) => tag.name !== name)))
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
  li {
    list-style-type: none;
    float: left;
    padding: 4px;
    border-radius: var(--border-radius);
    border: 1px solid #333;
    margin: 4px;
    cursor: pointer;
  }
</style>

{#if selectedTags?.length && unselectedTags?.length}
  <section>
    <ul>
      {#each selectedTags as tag}
        <li on:click={() => onSelectedTagClick(tag.name)}>{tag.name}</li>
      {/each}
    </ul>
    <hr />
    <ul>
      {#each unselectedTags as tag}
        <li on:click={() => onTagClick(tag.name)}>{tag.name}</li>
      {/each}
    </ul>
  </section>
{/if}
