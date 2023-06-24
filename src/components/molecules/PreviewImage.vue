<template>
  <div class="image-wrap">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: false
  }
})

</script>

<style scoped>
.image-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrap img {
  max-width: 300px;
  height: auto;
  object-fit: cover;
}
</style>
