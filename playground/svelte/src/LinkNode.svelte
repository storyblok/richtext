<!-- LinkNode.svelte -->
<script>
  export let href;
  export let target;
  export let text;
</script>

<a href={href} target={target}>{text}</a>
