<template>
  <div class="search-form-container">
    <div class="search-form">
      <SearchForm :text="searchText" @submit="onSubmit">
      </SearchForm>
    </div>
    <div class="custom-search-form">
      <CustomButton :text="'genre'" @click="openMovieDetailSearchModal"></CustomButton>
    </div>
    <FormModal v-bind:show=showMovieDetailSearchModal @close="closeMovieDetailSearchModal">
      <MovieDetailSearch @result="searchDetailResult" />
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import SearchForm from '@/components/molecules/SearchForm.vue'
import { FetchMovies } from '@/apis/movies'
import { useRouter } from 'vue-router'
import CustomButton from '@/components/atoms/CustomButton.vue'
import MovieDetailSearch, { MovieDetailSearchType } from '@/components/organisms/MovieDetailSearch.vue'
import FormModal from '@/components/organisms/FormModal.vue'

const router = useRouter()
const showMovieDetailSearchModal = ref(false)

// const props = defineProps({
//   movies: []
// })
const currentQuery = router.currentRoute.value.query.q ? String(router.currentRoute.value.query.q) : ''
const searchText = ref(currentQuery)

const emits = defineEmits<{(e: 'result', movies: any[]): void}>()

const onSubmit = async (searchQuery: string) => {
  router.push({ query: { q: searchQuery } })
  await searchMovie()
}

const searchDetailResult = async (searchDetail: MovieDetailSearchType) => {
  console.log(searchDetail)
  showMovieDetailSearchModal.value = false
  if (searchDetail.movieGenreIds.length > 0) {
    console.log(searchDetail.movieGenreIds.join(','))
    router.push({
      query: {
        genre_ids: searchDetail.movieGenreIds.join(','),
        genre_and: searchDetail.searchGenreAnd ? 'true' : 'false'
      }
    })
  }
  setTimeout(() => {
    searchMovie()
  }, 100)
}

const searchMovie = async () => {
  const query = router.currentRoute.value.query.q as string
  const genreIds = (router.currentRoute.value.query.genre_ids as string)?.split(',')
  const genreAnd = router.currentRoute.value.query.genre_and as string === 'true'
  const { movies } = await FetchMovies(query, genreIds, genreAnd)
  emits('result', movies)
}

const openMovieDetailSearchModal = () => {
  showMovieDetailSearchModal.value = true
}

const closeMovieDetailSearchModal = () => {
  showMovieDetailSearchModal.value = false
}
</script>

<style scoped>
.search-form-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}
.search-form {
  width: 90%;
}
.custom-search-form {
  width: 10%;
}
</style>
