<template>
  <button class="search-button" @click="$emit('click')">{{ text }}</button>
</template>

<script lang="ts">
import { defineProps } from 'vue'
export default {
  name: 'CustomButton'
}
</script>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.search-button {
  /* ボタンのスタイルを定義します。 */
  background-color: aqua;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 5px 10px;
}
</style>
