<script>
  import { StoryblokComponent } from '@storyblok/svelte'
  export let blok;
  export let id;
</script>

<StoryblokComponent {blok} {id} />