<template>
  <div class="movie-poster-image-wrap">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

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

onMounted(() => {
  console.log('mounted')
})

</script>

<style scoped>
.movie-poster-image-wrap {
  position: relative;
  width: 100%;
  height: calc(100% - 2rem);
  text-align: center;
}

img {
  position:relative;
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
}
</style>
