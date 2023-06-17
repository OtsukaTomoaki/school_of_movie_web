<template>
  <div class="movie-thumbnail-wrap">
    <div class="movie-thumbnail" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <span :title="movie.title" class="movie-thumbnail-title">{{ truncatedTitle }}</span>
      <!-- <div class></div> -->
      <div class="movie-poster-image-wrap">
        <img :src="posterUrl" :alt="movie.title" />
      </div>
      <!-- <p>{{ genreNames }}</p> -->
      <!-- <div :class="['overview', { 'is-visible': showOverview }]">{{ movie.overview }}</div> -->
      <BadgeList :badges="movie.movieGenres.map((genre) => genre.name)" class="genre-badge-list"></BadgeList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineComponent, defineExpose, ref } from 'vue'
import { Movie } from '@/movieTypes'
import BadgeList from '@/components/molecules/BadgeList.vue'

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

// defineExpose({ onMouseEnter, onMouseLeave })

</script>

<style scoped>

.movie-thumbnail-wrap {

}
.movie-thumbnail {
  width: 200px;
  height: 350px;
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
  overflow: visible;
}

.movie-thumbnail img {
  width: 100%;
  height: auto;
}

.movie-thumbnail-title {
  font-size: 2px;
  font-weight: 900;
  margin: 0.5rem 0;
  color: #3C486B;
  padding: 0;
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

.genre-badge-list {
  bottom: 0;
  left: 0;
  z-index: 1;
  margin-top: -10px;
}

.movie-poster-image-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
</style>