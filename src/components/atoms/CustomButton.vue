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
  background-color: #F9D949;
  border: 1px solid #F0F0F0;
  color: #3C486B;
  border-radius: 25px;
  padding: 10px 15px;
}
</style>
