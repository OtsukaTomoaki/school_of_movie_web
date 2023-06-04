<template>
  <input
    class="search-box"
    type="text"
    v-model="localText"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  }
})

const localText = ref(props.modelValue)
const emits = defineEmits<{(e: 'update:modelValue', text: string): void}>()
const updateValue = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}

watchEffect(() => {
  localText.value = props.modelValue
})
</script>

<style scoped>
.search-box {
  width: 100%;
  padding: 5px 10px;
  outline: none;
}
</style>
