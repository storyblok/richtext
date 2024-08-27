<script setup lang="ts">
import { VNode } from 'vue';
import { useStoryblokRichTextResolver } from '../'
import { StoryblokRichTextNode } from '../../../../dist';
import { StoryblokRichTextProps } from '../types'

const props = defineProps<StoryblokRichTextProps>()

const { render } = useStoryblokRichTextResolver({
  resolvers: props.resolvers,
})

const root = () => render(props.doc as StoryblokRichTextNode<VNode>)
</script>

<template>
  <root />
</template>
