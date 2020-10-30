<script lang="ts">
  import { onMount } from 'svelte'
  import TagList from './TagList.svelte'

  import type { Tag } from '../../routes/create/index.json'

  export let tags: { [category: string]: Tag[] },
    numArticles: number = 0

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

  const pluralise = (str: string, num: number) => `${str}${num > 1 ? 's' : ''}`
</script>

<style>
  section {
    min-height: 100px;
    border-bottom: none;
  }
  div {
    margin-bottom: 10px;
    min-height: 25px;
  }
  @media (min-width: 400px) {
    section {
      border-bottom: 1px solid var(--text-color);
    }
    div {
      margin-bottom: 40px;
    }
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
  <div>
    {#if currentTags.length}
      {`Found ${numArticles} ${pluralise('post', numArticles)} with the ${pluralise('tag', currentTags.length)} ${currentTags.length > 1 ? [
              ...currentTags.slice(0, currentTags.length - 1),
              'and',
              ...currentTags.slice(-1),
            ]
              .join(', ')
              .replace(', and,', ' and ') : currentTags[0]}:`}
    {/if}
  </div>
{/if}
