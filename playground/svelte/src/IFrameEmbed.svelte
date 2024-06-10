<script lang="ts">
  export let blok: { url: { url: string } };
</script>

<iframe src={blok.url.url} class="w-full aspect-video" frameborder="0" title=""></iframe>

<style>
  .w-full {
    width: 100%;
  }
  .aspect-video {
    aspect-ratio: 16 / 9; /* Adjust as necessary for the desired aspect ratio */
  }
</style>