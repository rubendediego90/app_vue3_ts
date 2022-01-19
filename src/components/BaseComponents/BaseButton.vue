<script setup lang="ts">
import { defineProps,PropType } from 'vue';

defineProps({
  text: {
    type: String as PropType<string>,
    required:true
  }
})

</script>

<template>
  <button>{{ text }}</button>
</template>

<style scoped>

</style>