<template>
  <div class="modal-contentainer" v-if="movie">
    <div class="content-left">
      <div class="preview-image-wrapper">
        <PreviewImage
          :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`"
          :alt="movie.title" />
      </div>
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
    </div>
    <div class="content-right">
      <MessageList v-if="talkRoomId" :talk-room-id="talkRoomId"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FetchMovie } from '@/apis/movies'
import BadgeList from '@/components/molecules/BadgeList.vue'
import PreviewImage from '@/components/molecules/PreviewImage.vue'
import MessageList from '@/components/talk_room/MessageList.vue'
import { FetchMovieTalkRoom } from '@/apis/movie_talk_rooms'

const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
})
const movie = ref(null)
const talkRoomId = ref(null)

onMounted(async function () {
  if (!props.movieId) {
    return
  }
})

watch(() => props.movieId, async (newVal, oldVal) => {
  if (!newVal || newVal === oldVal) {
    return
  }
  movie.value = await FetchMovie(newVal)
  talkRoomId.value = null // ここでnullにしないと、v-ifの条件が変わらないので再描画されない
  talkRoomId.value = (await FetchMovieTalkRoom(props.movieId)).talkRoomId
})

</script>

<style scoped>
.modal-contentainer {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: hidden;
}

.modal-contentainer img {
  width: auto;
  height: 300px;
  object-fit: cover;
}

.content-left {
  padding: 0px 10px;
  width: 50%;
  overflow-y: auto;
}

.content-right {
  padding: 0px 10px;
  width: 50%;
  overflow-y: auto;
}

</style>
