<template>
  <button @click="emitPageNumber">
    {{ pageNumber }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  pageNumber: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['click'])

const emitPageNumber = () => {
  emit('click', props.pageNumber)
}
</script>
