<script setup lang="ts">
import { VNode } from 'vue';
import { useSbRichtextResolver } from '../'
import { SbRichTextNode } from '../../../../dist';
import { SbRichTextProps } from '../types'

const props = defineProps<SbRichTextProps>()

const { render } = useSbRichtextResolver({
  resolvers: props.resolvers,
})

const root = () => render(props.doc as SbRichTextNode<VNode>)
</script>

<template>
  <root />
</template>
