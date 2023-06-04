<template>
  <div>
    <MovieSearchForm @result="updateMovies"></MovieSearchForm>
    <div v-for="movie in movies" :key="movie.id"  class="movie_thumbnail_wrap">
      <MovieThumbnail :movie="movie"></MovieThumbnail>
    </div>
    <CustomPagination :totalPages="10" @page-changed="changePage"></CustomPagination>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted } from 'vue'
import MovieThumbnail from '@/components/movie/MovieThumbnail.vue'
import { FetchMovies } from '@/apis/movies'
import { Movie } from '@/movieTypes'
import MovieSearchForm from '@/components/organisms/movie/MovieSearchForm.vue'
import CustomPagination from '../molecules/CustomPagination.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const movies = ref([])
const totalCount = ref(0)

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
  const { movies: newMovies, totalCount: newTotalCount } = await FetchMovies(q, page)
  movies.value = newMovies
  totalCount.value = newTotalCount
}
const getCurrentQuery = () => {
  const query = router.currentRoute.value.query
  const searchQuery = query.q ? String(query.q) : ''
  const page = query.page ? Number(query.page) : 1
  return { searchQuery, page }
}
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
