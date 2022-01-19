<script setup lang="ts">
import { defineProps,PropType } from 'vue';

defineProps({
  modelValue: {
    type: Date as PropType<Date>,
    required:true
  }
})

</script>

<template>
  <input type="date" :v-model="modelValue"/>
</template>

<style scoped>

</style>