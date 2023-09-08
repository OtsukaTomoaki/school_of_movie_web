<template>
  <div class="movie-poster-image-wrap">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
defineProps({
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
.movie-poster-image-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
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
