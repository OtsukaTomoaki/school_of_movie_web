<template>
  <div class="modal-content" v-if="movie">
    <PreviewImage
      :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`"
      :alt="movie.title" />
    <!-- <img :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`" alt=""> -->
    <div class="movie-description">
      <div class="movie-description-title">
        {{ movie.title }}
      </div>
      <div class="movie-description-release-date">
        {{ movie.releaseDate.split('T')[0] }}
      </div>
      <div class="movie-description-vote-average">
        <star-rating
        :increment="0.01"
        :rating="(movie.voteAverage / 2)"
        :star-size="20"
        :read-only="true"></star-rating>
      </div>
      <div class="movie-description-genres">
        <BadgeList :badges="movie.movieGenres.map((genre: any) => genre.name)"></BadgeList>
      </div>
      <div class="movie-description-overview">
        {{ movie.overview }}
      </div>
    </div>
    <img :src="`https://image.tmdb.org/t/p/w500${movie.backdropPath}`" alt="">
    <MessageList talk-room-id="f8c38692-a333-430a-8297-fde53b18d790" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FetchMovie } from '@/apis/movies'
import BadgeList from '@/components/molecules/BadgeList.vue'
import PreviewImage from '@/components/molecules/PreviewImage.vue'
import MessageList from '@/components/talk_room/MessageList.vue'

const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
})
const movie = ref(null)

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
