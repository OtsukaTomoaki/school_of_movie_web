<template>
  <div class="movie-thumbnail" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <img :src="posterUrl" :alt="movie.title" />
    <span :title="movie.title" class="movie-thumbnail-title">{{ truncatedTitle }}</span>
    <p>{{ genreNames }}</p>
    <!-- <div :class="['overview', { 'is-visible': showOverview }]">{{ movie.overview }}</div> -->
  </div>
</template>

<script lang="ts">
import { defineProps, defineComponent, defineExpose, ref } from 'vue'
import { Movie } from '@/movieTypes'

export default defineComponent({
  name: 'MovieThumbnail'
})
</script>

<script setup lang="ts">
const props = defineProps<{
  movie: Movie;
}>()

const showOverview = ref(false)

const onMouseEnter = () => {
  showOverview.value = true
}

const onMouseLeave = () => {
  showOverview.value = false
  console.log('leave')
}

const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.posterPath}`

const truncatedTitle = props.movie.title.length > 20 ? `${props.movie.title.slice(0, 20)}...` : props.movie.title

const genreNames = props.movie.movieGenres.map((genre) => genre.name).join(', ')

// defineExpose({ onMouseEnter, onMouseLeave })

</script>

<style scoped>
.movie-thumbnail {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.movie-thumbnail img {
  width: 100%;
  height: auto;
}

.movie-thumbnail-title {
  font-size: 1px;
  font-weight: bold;
  margin: 0.5rem 0;
}

.movie-thumbnail p {
  font-size: 1rem;
  margin: 0;
  text-align: center;
}

.overview {
  display: none;
  position: absolute;
  left: 0;
  width: 100%;
  height: 0%;
  background-color: black;
  color: #fff;
  font-size: 0.9rem;
  z-index: 1;
}

.overview.is-visible {
  translate: 0.3s;
  display: block;
  opacity: 0.9;
}
</style>
