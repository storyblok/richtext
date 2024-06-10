<!-- RichTextNode.svelte -->
<script lang="ts">
import RichTextNode from './RichTextNode.svelte';
export let node;

const isString = (value) => typeof value === 'string';

function renderFn(tag, attrs, children) {
  const attrsString = attrsToString(attrs);
  const tagString = attrsString ? `${tag} ${attrsString}` : tag;
  return `<${tagString}>${Array.isArray(children) ? children.join('') : children || ''}</${tag}>`;
}

const attrsToString = (attrs = {}) =>
  Object.keys(attrs)
    .map((key) => `${key}="${attrs[key]}"`)
    .join(' ');

const isEmptyObject = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

</script>

{#if typeof node === 'string'}
  {@html node}
{:else}
  {#if Array.isArray(node.children)}
    {#each node.children as child}
      {#if isString(child)}
        {@html renderFn(node.component, node.props, child)}
      {:else}
        <RichTextNode node={child} />
      {/if}
    {/each}
    {:else}
    {#if typeof node.component === 'string'}
      {@html renderFn(node.component, node.props, node.children)}
    {:else}
      <svelte:component this={node.component} {...node.props} />
    {/if}
  {/if}
  
{/if}
