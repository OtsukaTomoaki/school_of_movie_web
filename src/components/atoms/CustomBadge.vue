<template>
  <div class="badge-content">{{ text }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.badge-content {
  background-color: #F9D949;
  border: 1px solid #F0F0F0;
  border-radius: 25px;
  padding: 5px 10px;
  font-size: 8px;
  opacity: 0.9;
  display: inline-block;
  color: #3C486B;
  font-weight: 700;
}
</style>
