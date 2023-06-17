<template>
  <div class="movie-page-container">
    <notifications />
    <MovieSearchForm @result="updateMovies"></MovieSearchForm>
    <div v-for="movie in movies" :key="movie.id"  class="movie_thumbnail_wrap">
      <MovieThumbnail :movie="movie"></MovieThumbnail>
    </div>
    <CustomPagination :totalPages="tatalPages" @page-changed="changePage"></CustomPagination>
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

const router = useRouter()
const movies = ref([])
const totalCount = ref(0)
const backgroundJobForFetchNewMovie = ref<BackgroundJob>(null)

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
  return Math.ceil(totalCount.value / 10)
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
</script>

<style scoped>
.movie-page-container {
  margin: 0 auto;
  width: 90%;
}
.movie_thumbnail_wrap {
  display: inline-block;
  margin: 10px;
  overflow: hidden;
}
</style>
