<template>
  <div class="badge-list">
    <Badge v-for="badge in badges" :text="badge" :key="badge" class="badge-item"></Badge>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Badge from '@/components/atoms/CustomBadge.vue'

const props = defineProps({
  badges: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.badge-list {
  width: 100%;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
