<template>
  <div class="modal-content" v-if="movie">
    <img :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`" alt="">
    <div class="movie-description">
      <div class="movie-description-title">
        {{ movie.title }}
      </div>
      <div class="movie-description-release-date">
        {{ movie.releaseDate.split('T')[0] }}
      </div>
      <div class="movie-description-vote-average">
        {{ movie.voteAverage }}
      </div>
      <div class="movie-description-genres">
        <BadgeList :badges="movie.movieGenres.map((genre: any) => genre.name)"></BadgeList>
      </div>
      <div class="movie-description-overview">
        {{ movie.overview }}
      </div>
    </div>
    <img :src="`https://image.tmdb.org/t/p/w500${movie.backdropPath}`" alt="">
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, ref, watch } from 'vue'
import { FetchMovie } from '@/apis/movies'
import BadgeList from '@/components/molecules/BadgeList.vue'
const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
})
const movie = ref(null)
const emits = defineEmits(['close'])

const closeModal = () => {
  emits('close')
}

onMounted(async function () {
  if (!props.movieId) {
    return
  }
  console.log('MovieDetailModal mounted')
})

watch(() => props.movieId, async (newVal, oldVal) => {
  if (!newVal || newVal === oldVal) {
    return
  }
  movie.value = await FetchMovie(newVal)
  console.log(movie.value)
})

</script>

<style scoped>
.modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

.modal-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
