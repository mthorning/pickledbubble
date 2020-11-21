<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { stores } from '@sapper/app'
  import TagList from './TagList.svelte'
  import FaRegTimesCircle from 'svelte-icons/fa/FaRegTimesCircle.svelte'

  import type { Tag } from '../../routes/create/index.json'

  const dispatch = createEventDispatcher()
  const { page } = stores()

  export let tags: { [category: string]: Tag[] },
    dataLoaded: boolean,
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

    let newTags = params.toString()
    if (newTags) newTags = `?${newTags}`
    window.history.pushState(newSelected, 'filters', `${$page.path}${newTags}`)
    dispatch('filterChange', newTags)
    currentTags = [...tagsToSet]
  }

  const pluralise = (str: string, num: number) => `${str}${num > 1 ? 's' : ''}`
</script>

<style>
  section {
    border-bottom: none;
  }
  div {
    position: relative;
    padding: 8px 33px 0 4px;
    min-height: 25px;
    margin-bottom: 8px;
  }
  @media (min-width: 600px) {
    section {
      border-bottom: 1px solid var(--text-color);
      padding-bottom: 10px;
    }
    div {
      margin-bottom: 20px;
    }
  }
  button {
    height: 25px;
    color: var(--primary-color);
    width: 25px;
    padding: 0;
    background-color: transparent;
    border: none;
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  button:hover {
    color: var(--secondary-color);
  }
</style>

{#if tags.type?.length || tags.theme?.length}
  <section>
    <TagList
      {dataLoaded}
      tags={tags.type}
      style="--color: var(--primary-color);"
      {updateQueryString}
      {currentTags} />

    <TagList
      {dataLoaded}
      tags={tags.theme}
      style="--color: var(--secondary-color);"
      {updateQueryString}
      {currentTags} />
  </section>
  <div>
    {#if currentTags.length && dataLoaded}
      {`Found ${numArticles} ${pluralise('post', numArticles)} with the ${pluralise('tag', currentTags.length)} ${currentTags.length > 1 ? [
              ...currentTags.slice(0, currentTags.length - 1),
              'and',
              ...currentTags.slice(-1),
            ]
              .join(', ')
              .replace(', and,', ' and ') : currentTags[0]}:`}
      <button
        on:click={() => updateQueryString([])}><FaRegTimesCircle /></button>
    {/if}
  </div>
{/if}
