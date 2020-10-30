<script lang="ts">
  import type { Tag } from '../../routes/create/index.json'

  export let tags: Tag[],
    currentTags: string[] = [],
    style: string,
    updateQueryString: (newSelected: string[]) => void

  $: uniqueTags = tags.reduce((uniq, tag) => {
    if (uniq.some((a) => a.name === tag.name)) return uniq
    return [...uniq, tag]
  }, [])

  function onTagClick(clickedTag: Tag) {
    if (currentTags?.includes(clickedTag.name)) {
      updateQueryString(currentTags.filter((name) => clickedTag.name !== name))
    } else {
      updateQueryString([...currentTags, clickedTag.name])
    }
  }
</script>

<style>
  ul {
    padding: 0;
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
    color: var(--color);
    border-color: var(--color);
    user-select: none;
  }
  li:hover,
  .selected {
    background-color: var(--color);
    color: var(--background-color);
  }
</style>

<ul {style}>
  {#each uniqueTags as tag}
    <li
      class:selected={currentTags?.includes(tag.name)}
      class="type"
      on:click={() => onTagClick(tag)}>
      {tag.name}
    </li>
  {/each}
</ul>
