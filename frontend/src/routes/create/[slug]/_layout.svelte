<script lang="ts">
  import ShareButtons from '../../../components/ShareButtons.svelte'

  let scrollY: number, innerHeight: number
  let showShare: boolean
  let disabled: boolean
  $: showShare = scrollY > innerHeight / 5
</script>

<style>
  .content {
    transition: padding-left 0.3s ease-out;
  }
  .content.showShare {
    padding-left: 35px;
  }
</style>

<svelte:window bind:scrollY bind:innerHeight />
<ShareButtons {disabled} {showShare} disableShare={() => (disabled = true)} />
<div class="content" class:showShare={showShare && !disabled}>
  <slot />
</div>
