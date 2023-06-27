<template>
  <div class="movie-page-container">
    <notifications />
    <MovieSearchForm @result="updateMovies"></MovieSearchForm>
    <div class="movie-list-container">
      <div v-for="movie in movies" :key="movie.id" class="movie-thumbnail-wrap" @click="onThumbnailClick(movie.id)">
        <MovieThumbnail :movie="movie"></MovieThumbnail>
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
import { ref, watch, defineProps, onMounted, computed } from 'vue'
import { notify } from '@kyvg/vue3-notification'

import MovieThumbnail from '@/components/organisms/MovieThumbnail.vue'
import { FetchMovies } from '@/apis/movies'
import { BackgroundJob as BackgroundJobType } from '@/backgroundJobs'
import { BackgroundJob } from '@/classes/BackgroundJob'
import MovieSearchForm from '@/components/organisms/movie/MovieSearchForm.vue'
import CustomPagination from '../molecules/CustomPagination.vue'
import { useRouter } from 'vue-router'
import MoviePreview from '@/components/organisms/MoviePreview.vue'
import FormModal from '@/components/organisms/FormModal.vue'

const router = useRouter()
const movies = ref([])
const totalCount = ref(0)
const backgroundJobForFetchNewMovie = ref<BackgroundJob>(null)
const showMovieModal = ref(false)
const selectedMovieId = ref(null)

const props = defineProps({
  movies: []
})
onMounted(async function () {
  const { searchQuery, page } = getCurrentQuery()
  RefreshMovies(searchQuery, page)
})
const updateMovies = async (newMovies: any[]) => {
  movies.value = newMovies
}
const changePage = (page: number) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      page: page
    }
  })
  const { searchQuery } = getCurrentQuery()
  RefreshMovies(searchQuery, page)
}
const RefreshMovies = async (q: string = null, page = 1) => {
  const { movies: newMovies, totalCount: newTotalCount, backgroundJob: newBackgroundJob } = await FetchMovies(q, page)
  movies.value = newMovies
  totalCount.value = newTotalCount
  if (newBackgroundJob) {
    setBackgroundJobPolling(newBackgroundJob)
  }
}

const tatalPages = computed(() => {
  return Math.ceil(totalCount.value / 50)
})

const getCurrentQuery = () => {
  const query = router.currentRoute.value.query
  const searchQuery = query.q ? String(query.q) : ''
  const page = query.page ? Number(query.page) : 1
  return { searchQuery, page }
}
watch(router.currentRoute, async (to, from) => {
  const { searchQuery, page } = getCurrentQuery()
  RefreshMovies(searchQuery, page)

  if (to.query.page !== from.query.page) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const setBackgroundJobPolling = (backgroundJob: BackgroundJobType) => {
  if (backgroundJobForFetchNewMovie.value) {
    backgroundJobForFetchNewMovie.value.stopPolling()
  }

  backgroundJobForFetchNewMovie.value = new BackgroundJob(backgroundJob)
  backgroundJobForFetchNewMovie.value.startPolling(async (compleatedJob) => {
    const { searchQuery: q, page } = getCurrentQuery()
    const { movies: newMovies, totalCount: newTotalCount } = await FetchMovies(q, page)

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

const onThumbnailClick = (movieId: string) => {
  selectedMovieId.value = movieId
  showMovieModal.value = true
}
const closeMovieModal = () => {
  console.log('closeMovieModal')
  selectedMovieId.value = null
  showMovieModal.value = false
}
</script>

<style scoped>
.movie-page-container {
  margin: 0 auto;
  width: 90%;
  display: block;
  height: calc(100vh - 90px);
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
