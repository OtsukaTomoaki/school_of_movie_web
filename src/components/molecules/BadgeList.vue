<template>
  <div class="badge-list">
    <Badge v-for="badge in badges" :text="badge" :key="badge" class="badge-item"></Badge>
  </div>
</template>

<script setup lang="ts">
import Badge from '@/components/atoms/CustomBadge.vue'

defineProps({
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
  text-align:left;
}
</style>
