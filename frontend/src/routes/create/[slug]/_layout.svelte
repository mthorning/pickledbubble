<script lang="ts">
  import { fade } from 'svelte/transition'
  import ShareButtons from '../../../components/ShareButtons.svelte'
  import FaCaretLeft from 'svelte-icons/fa/FaCaretLeft.svelte'

  let scrollY: number, innerHeight: number
  let showShare: boolean, disableShare: boolean
  $: if (scrollY > 300) showShare = true
</script>

<style>
  .content {
    transition: 0.3s padding-left ease-in-out;
  }
  .content.showShare {
    padding-left: 35px;
  }
  .content.disableShare {
    padding-left: 0;
  }
  .share-buttons {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    width: 10px;
    color: #d4d1d1;
  }
</style>

<svelte:window bind:scrollY bind:innerHeight />
{#if showShare && !disableShare}
  <div class="share-buttons">
    <ShareButtons />
    <div
      on:click={() => (disableShare = true)}
      in:fade={{ delay: 1000 }}
      class="icon"
      class:showShare>
      <FaCaretLeft />
    </div>
  </div>
{/if}
<div class="content" class:showShare class:disableShare>
  <slot />
</div>
