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

  export let title: string

  let url: string
  const { page } = stores()
  page.subscribe(({ host, path }) => (url = `${host}${path}`))

  const desc = 'Take a look at this article I found on pickledbubble'
</script>

<style>
  :global(.svelte-share-buttons *) {
    margin: 0 0 2px 1px;
  }
</style>

<div class="svelte-share-buttons">
  <Email subject={title} body="{desc} {url}" />
  <Reddit class="share-button" {title} {url} />
  <LinkedIn class="share-button" {url} />
  <Tumblr class="share-button" {title} {url} caption={title} />
  <Pinterest class="share-button" {url} description={title} />
  <WhatsApp class="share-button" text="{title} {url}" />
  <Facebook class="share-button" {url} />
  <Twitter class="share-button" text={title} {url} />
</div>
