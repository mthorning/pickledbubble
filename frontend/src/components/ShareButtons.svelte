<script lang="ts">
  import {
    Email,
    Reddit,
    LinkedIn,
    Pinterest,
    Tumblr,
    WhatsApp,
    Facebook,
    Twitter,
  } from 'svelte-share-buttons-component'
  import { stores } from '@sapper/app'
  import { fly } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

  export let title: string

  let url: string
  const { page } = stores()
  page.subscribe(({ host, path }) => (url = `${host}${path}`))

  const desc = 'Take a look at this article I found on pickledbubble'
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  :global(.ssbc-button--override) {
    background-color: #007c9b52;
  }
  :global(.ssbc-button--override):hover {
    background-color: var(--primary-color);
  }
</style>

<div
  in:fly={{ delay: 300, duration: 500, y: 1000, opacity: 0.5, easing: quintOut }}>
  <Email class="ssbc-button--override" subject={title} body="{desc} {url}" />
  <Reddit class="ssbc-button--override" {title} {url} />
  <LinkedIn class="ssbc-button--override" {url} />
  <Tumblr class="ssbc-button--override" {title} {url} caption={title} />
  <Pinterest class="ssbc-button--override" {url} description={title} />
  <WhatsApp class="ssbc-button--override" text="{title} {url}" />
  <Facebook class="ssbc-button--override" {url} />
  <Twitter class="ssbc-button--override" text={title} {url} />
</div>
