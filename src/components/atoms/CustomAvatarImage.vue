<template>
  <v-avatar :size="size">
    <img class="avatar-image" :src="imageUri" />
  </v-avatar>
</template>

<script setup lang="ts">
defineProps({
  imageUri: {
    type: String,
    required: true,
    default: ''
  },
  size: {
    type: Number,
    required: false,
    default: 80
  }
})
</script>

<style scoped>
.avatar-image {
  width: 100%;
  height: auto;
}
</style>