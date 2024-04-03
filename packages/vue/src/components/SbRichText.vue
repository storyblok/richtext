<script setup lang="ts">
import { useSbRichtextResolver } from '../'

const props = defineProps<{ doc: any, resolvers?: any }>()

const { render } = useSbRichtextResolver({
  resolvers: props.resolvers,
})

const root = () => render(props.doc)
</script>

<template>
  <root />
</template>
