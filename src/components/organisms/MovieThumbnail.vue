<template>
  <div class="movie-thumbnail-container" @click="onThumbnailClick">
    <div class="heart-button-wrapper" @click.stop>
      <CustomHeartButton
        class="heart-icon"
        :id="'like_'+movie.id"
        :isLiked="isLiked"
        @click.stop="onLiked"
      />
    </div>
    <div class="movie-rating-wrap">
      <star-rating
      :increment="0.01"
      :rating="(movie.voteAverage / 2)"
      :star-size="20"
      :read-only="true"
      :show-rating="false"></star-rating>
    </div>
    <div class="movie-thumbnail" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <span :title="movie.title" class="movie-thumbnail-title">{{ truncatedTitle }}</span>
      <ThumbnailImage :src="posterUrl" :alt="movie.title" />
      <div class="movie-genre-wrapper">
        <BadgeList :badges="movie.movieGenres.map((genre) => genre.name)" class="genre-badge-list"></BadgeList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Movie } from '@/movieTypes'
import BadgeList from '@/components/molecules/BadgeList.vue'
import ThumbnailImage from '@/components/molecules/ThumbnailImage.vue'
import CustomHeartButton from '@/components/atoms/CustomHeartButton.vue'

const emit = defineEmits(['movie_thumbnail:click', 'like:click'])
const props = defineProps<{
  movie: Movie,
  isLiked: boolean
}>()

const showOverview = ref(false)

const onMouseEnter = () => {
  showOverview.value = true
}

const onMouseLeave = () => {
  showOverview.value = false
}

const posterUrl = `https://image.tmdb.org/t/p/w500${props.movie.posterPath}`

const truncatedTitle = props.movie.title.length > 20 ? `${props.movie.title.slice(0, 20)}...` : props.movie.title

const onLiked = (event: Event, isLiked: boolean) => {
  emit('like:click', props.movie.id, isLiked)
}

const onThumbnailClick = () => {
  emit('movie_thumbnail:click', props.movie.id)
}

</script>

<style scoped>

.movie-thumbnail-container {
  position: relative;
  display: inline-block;
  width: 100%;
}
.movie-thumbnail {
  min-width: 200px;
  width: 100%;
  aspect-ratio: 2 / 3;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.movie-thumbnail-title {
  font-size: 2px;
  font-weight: 900;
  margin: 0.5rem 0;
  color: #3C486B;
  padding: 0;
  display: none;
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

.movie-rating-wrap {
  position: absolute;
  top: 0;
  right: 0;
  height: auto;
  z-index: 1;
  border-radius: 0 0 0 4px;
  display: inline-block;
}

.movie-genre-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  margin-top: -10px;
}

.heart-button-wrapper {
  position: absolute;
  z-index: 1;
  margin-left: -30px;
  margin-top: -30px;
}
</style>
