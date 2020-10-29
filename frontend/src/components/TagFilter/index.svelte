<script lang="ts">
  import { onMount } from 'svelte'
  import TagList from './TagList.svelte'

  import type { Tag } from '../../routes/create/index.json'
  import type { type } from 'os'

  export let tags: { [category: string]: Tag[] }

  const queryKey = 'tags'

  let params: URLSearchParams,
    currentTags: string[] = []

  onMount(() => {
    params = new URLSearchParams(window.location.search)
    currentTags = params.get(queryKey)?.split(',') ?? []
  })

  function updateQueryString(newSelected: string[]) {
    const tagsToSet = Array.from(new Set(newSelected.filter((name) => !!name)))
    if (tagsToSet.length) {
      params.set(queryKey, tagsToSet.join(','))
    } else {
      params.delete(queryKey)
    }
    window.location.search = params.toString()
  }
</script>

<style>
  section {
    height: 100px;
  }
</style>

{#if tags.type?.length || tags.theme?.length}
  <section>
    <TagList
      tags={tags.type}
      style="--color: var(--primary-color);"
      {updateQueryString}
      {currentTags} />

    <TagList
      tags={tags.theme}
      style="--color: var(--secondary-color);"
      {updateQueryString}
      {currentTags} />
  </section>
{/if}
