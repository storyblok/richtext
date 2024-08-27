<script setup lang="ts">
import { VNode } from 'vue';
import { useStoryblokRichtextResolver } from '../'
import { StoryblokRichTextNode } from '../../../../dist';
import { StoryblokRichTextProps } from '../types'

const props = defineProps<StoryblokRichTextProps>()

const { render } = useStoryblokRichtextResolver({
  resolvers: props.resolvers,
})

const root = () => render(props.doc as StoryblokRichTextNode<VNode>)
</script>

<template>
  <root />
</template>
