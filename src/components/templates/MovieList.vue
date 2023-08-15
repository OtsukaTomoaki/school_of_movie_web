<template>
  <div class="movie-page-container">
    <notifications />
    <MovieSearchForm @result="updateMovies"></MovieSearchForm>
    <div class="movie-list-container">
      <div v-for="movie in movies" :key="movie.id" class="movie-thumbnail-wrap">
        <MovieThumbnail
          :movie="movie"
          @movie_thumbnail:click="onThumbnailClick"
          @like:click="onLikeClick"
        />
      </div>
    </div>
    <div class="pagenation-container">
      <CustomPagination :totalPages="tatalPages" @page-changed="changePage"></CustomPagination>
    </div>
    <!-- <MovieModal v-if="showMovieModal" @close="closeMovieModal" class="movie_modal"></MovieModal> -->
    <FormModal v-bind:show=showMovieModal @close="closeMovieModal">
      <MoviePreview :movieId="selectedMovieId" />
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { notify } from '@kyvg/vue3-notification'
import { useStore } from 'vuex'

import MovieThumbnail from '@/components/organisms/MovieThumbnail.vue'
import { FetchMovies } from '@/apis/movies'
import { BackgroundJob as BackgroundJobType } from '@/backgroundJobs'
import { BackgroundJob } from '@/classes/BackgroundJob'
import MovieSearchForm from '@/components/organisms/movie/MovieSearchForm.vue'
import CustomPagination from '../molecules/CustomPagination.vue'
import { useRouter } from 'vue-router'
import MoviePreview from '@/components/organisms/MoviePreview.vue'
import FormModal from '@/components/organisms/FormModal.vue'
import { MovieSearchConditionType } from '@/movieSearchConditionType'
import { GET_MOVIE_SEARCH_CONDITIONS, GET_PROFILE } from '@/store/mutation-types'
import { FetchMovieUserLikes, PostMovieUserLike } from '@/apis/movie_user_likes'

const router = useRouter()
const store = useStore()
const movies = ref([])
const totalCount = ref(0)
const backgroundJobForFetchNewMovie = ref<BackgroundJob>(null)
const showMovieModal = ref(false)
const selectedMovieId = ref(null)

defineProps({
  movies: []
})
onMounted(async function () {
  const { page } = getCurrentQuery()
  RefreshMovies(page)
  await RefreshMovieUserLikes()
})
const updateMovies = async (searchConditions: MovieSearchConditionType) => {
  console.log('searchConditions', searchConditions)
  await RefreshMovies()
}
const changePage = (page: number) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      page: page
    }
  })
  RefreshMovies(page)
}
const RefreshMovies = async (page = 1) => {
  const searchConditions = store.getters[GET_MOVIE_SEARCH_CONDITIONS]
  console.log('searchConditions', searchConditions)
  const { movies: newMovies, totalCount: newTotalCount, backgroundJob: newBackgroundJob } = await FetchMovies(searchConditions, page)
  movies.value = newMovies
  totalCount.value = newTotalCount
  if (newBackgroundJob) {
    setBackgroundJobPolling(newBackgroundJob)
  }
}

const RefreshMovieUserLikes = async () => {
  const profile = store.getters[GET_PROFILE]
  const movieUserLikes = await FetchMovieUserLikes(profile.id)
  console.log(movieUserLikes)
}

const tatalPages = computed(() => {
  return Math.ceil(totalCount.value / 50)
})

const getCurrentQuery = () => {
  const query = router.currentRoute.value.query
  const page = query.page ? Number(query.page) : 1
  return { page }
}
watch(router.currentRoute.value.query, async (to, from) => {
  const { page } = getCurrentQuery()
  RefreshMovies(page)
  console.log('to.page', to.page)
  console.log('from.page', from.page)
  if (to.page !== from.page) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const setBackgroundJobPolling = (backgroundJob: BackgroundJobType) => {
  if (backgroundJobForFetchNewMovie.value) {
    backgroundJobForFetchNewMovie.value.stopPolling()
  }

  backgroundJobForFetchNewMovie.value = new BackgroundJob(backgroundJob)
  backgroundJobForFetchNewMovie.value.startPolling(async () => {
    const searchConditions = store.getters[GET_MOVIE_SEARCH_CONDITIONS]
    const { page } = getCurrentQuery()

    const { movies: newMovies, totalCount: newTotalCount } = await FetchMovies(searchConditions, page)

    const addedCount = newTotalCount - totalCount.value
    if (addedCount) {
      notify({
        text: `${addedCount}件の映画が追加されました`,
        type: 'success'
      })
      movies.value = newMovies
      totalCount.value = newTotalCount
    }
  })
}

const onLikeClick = async (movieId: string) => {
  const response = await PostMovieUserLike(movieId)
  console.log(response)
}
const onThumbnailClick = (movieId: string) => {
  selectedMovieId.value = movieId
  showMovieModal.value = true
}
const closeMovieModal = () => {
  showMovieModal.value = false
}
</script>

<style scoped>
.movie-page-container {
  margin: 0 auto;
  width: 90%;
  display: block;
  height: calc(100vh - 30px);
}

.movie-list-container {
  padding: 20px 0;
  height: calc(100% - 100px);
  overflow: scroll;
  display: block;
  text-align: left;
}

.movie-list-container .movie-thumbnail-wrap {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  @media screen and (min-width:420px) {
    width: calc((100% / 2) - 10px);
  };
  @media screen and (min-width:600px) {
    width: calc((100% / 3) - 10px);
  };
  @media screen and (min-width:800px) {
    width: calc((100% / 4) - 10px);
  };
  @media screen and (min-width:1280px) {
    width: calc((100% / 5) - 10px);
  };
  @media screen and (min-width:1800px) {
    width: calc((100% / 6) - 10px);
  };
  @media screen and (min-width:1900px) {
    width: 300px;
  };
}
.movie-thumbnail-wrap :hover {
  cursor: pointer;
}

.pagenation-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
}
</style>
