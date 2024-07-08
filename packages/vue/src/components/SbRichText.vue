<script setup lang="ts">
import { useSbRichtextResolver } from '../'
import { SbRichTextProps } from '../types'

const props = defineProps<SbRichTextProps>()

const { render } = useSbRichtextResolver({
  resolvers: props.resolvers,
})

const root = () => render(props.doc)
</script>

<template>
  <root />
</template>
