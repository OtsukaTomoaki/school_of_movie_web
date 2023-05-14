<template>
  <div>
    <div v-for="movie in movies" :key="movie.id"  class="movie_thumbnail_wrap">
      <MovieThumbnail :movie="movie"></MovieThumbnail>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineProps, onMounted } from 'vue'
import MovieThumbnail from '@/components/movie/MovieThumbnail.vue'
import { FetchMovies } from '@/apis/movies'
import { Movie } from '@/apis/types'

export default {
  name: 'MovieThumbnail',

  components: {
    MovieThumbnail
  }
}
</script>

<script setup lang="ts">
const movies = ref([])

const props = defineProps({
  movies: []
})
onMounted(async function () {
  movies.value = await FetchMovies()
})
</script>

<style scoped>
.movie_thumbnail_wrap {
  display: inline-block;
  width: 200px;
  height: 300px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px #ccc;
}
</style>
