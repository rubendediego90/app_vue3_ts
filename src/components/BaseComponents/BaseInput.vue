<script setup lang="ts">
import { defineProps,PropType,defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    required:true,
    default:''
  },
  max:{
      type:Number as PropType<number>,
      default:Infinity
  }
})

const emit = defineEmits(['update:modelValue'])

const handleInputChange = (event : Event) =>{
    emit('update:modelValue',(event.target as HTMLInputElement).value)
}

const validate = (event:KeyboardEvent) =>{
  if((event.target as HTMLInputElement).value.length > (props.max-1) && event.key !=='Backspace'){
      event.preventDefault()
  }
}

</script>

<template>
  <input type="text" :value="modelValue" @input="handleInputChange($event)" @keydown="validate"/>
</template>

<style scoped>

</style>