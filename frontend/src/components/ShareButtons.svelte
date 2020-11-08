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
  import { fade, fly } from 'svelte/transition'
  import FaCaretLeft from 'svelte-icons/fa/FaCaretLeft.svelte'
  import { stores } from '@sapper/app'
  import { quintIn, quintOut } from 'svelte/easing'

  export let title: string,
    showShare: boolean,
    disableShare: () => void,
    disabled = false

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
  .icon {
    position: absolute;
    left: 50%;
    bottom: -30px;
    transform: translateX(-50%);
    cursor: pointer;
    width: 10px;
    color: #d4d1d1;
  }
  .share-buttons {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

{#if showShare && !disabled}
  <div
    class="share-buttons"
    in:fly={{ delay: 300, duration: 500, y: 1000, easing: quintOut }}
    out:fly={{ duration: 200, x: -200, easing: quintIn }}>
    <Email class="ssbc-button--override" subject={title} body="{desc} {url}" />
    <Reddit class="ssbc-button--override" {title} {url} />
    <LinkedIn class="ssbc-button--override" {url} />
    <Tumblr class="ssbc-button--override" {title} {url} caption={title} />
    <Pinterest class="ssbc-button--override" {url} description={title} />
    <WhatsApp class="ssbc-button--override" text="{title} {url}" />
    <Facebook class="ssbc-button--override" {url} />
    <Twitter class="ssbc-button--override" text={title} {url} />
    <div
      on:click={disableShare}
      in:fade={{ delay: 500 }}
      out:fade={{ duration: 0, delay: 0 }}
      class="icon"
      class:showShare>
      <FaCaretLeft />
    </div>
  </div>
{/if}
