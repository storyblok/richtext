<script lang="ts">
import { onMount } from "svelte";
import {
  getStoryblokApi,
  useStoryblokBridge,
  StoryblokComponent,
} from "@storyblok/svelte";
import { BlockTypes, MarkTypes, RichTextResolver, type Node, type SbRichtextOptions} from '@storyblok/richtext'
import ComponentNode from './ComponentNode.svelte';
import LinkNode from './LinkNode.svelte';
import RichTextNode from './RichTextNode.svelte';

let story = null;
let content = [];

const componentResolver = (node) => {
  return {
    component: ComponentNode,
    props: {
      blok: node?.attrs?.body[0],
      id: node.attrs?.id,
    },
  };
};
const attrsToString = (attrs: Record<string, string> = {}) => Object.keys(attrs)
  .map(key => `${key}="${attrs[key]}"`)
  .join(' ')

const options = {
    renderFn: (tag, attrs, children) => {
      return {
        component: tag,
        props: attrs,
        children,
      };
    },
    /* textFn: (text) => text, */
    resolvers: {
        [MarkTypes.LINK]: (node) => {
          return node.attrs?.linktype === 'STORY'
            ? {
                component: LinkNode,
                props: {
                  href: node.attrs?.href,
                  target: node.attrs?.target,
                  text: node.text,
                },
              }
            : {
                component: LinkNode,
                props: {
                  href: node.attrs?.href,
                  target: node.attrs?.target,
                  text: node.text,
                },
              };
        },
        [BlockTypes.COMPONENT]: componentResolver,
      },
  };

onMount(async () => {
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/stories/home", {
    version: "draft",
  });
  story = data.story;

  content = [RichTextResolver(options).render(story.content.richtext)];
  console.log(content);
  useStoryblokBridge(data.story.id, (newStory) => (story = newStory));
});

function renderFn(tag, attrs, children) {
  const attrsString = attrsToString(attrs)
  const tagString = attrsString ? `${tag} ${attrsString}` : tag
  return `<${tagString}>${Array.isArray(children) ? children.join('') : children || ''}</${tag}>` as unknown as T
}
</script>

<main>
  {#each content as node (node.props.key)}
    <RichTextNode {node} />
  {/each}
</main>
<!-- {#each content as node (node.props.id)}
    {#if node.children}
      {#each node.children as child (child.props.key)}
        {#if typeof child.component === 'string'}
          { @html renderFn(child.component, child.props, child.children) }
        {:else}
          <svelte:component this={child.component} {...child.props} />
        {/if}
      {/each}
    {/if}
  {/each} -->
<style>

</style>
