<template>
  <div class="search-form-container">
    <div class="search-form">
      <SearchForm :text="searchText" @submit="onSubmit">
      </SearchForm>
    </div>
    <div class="custom-search-form">
      <CustomIconButton :type="'settings'" @click="openMovieDetailSearchModal"></CustomIconButton>
    </div>
    <FormModal v-bind:show=showMovieDetailSearchModal @close="closeMovieDetailSearchModal">
      <MovieDetailSearch @result="searchDetailResult" />
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

import SearchForm from '@/components/molecules/SearchForm.vue'
import { useRouter } from 'vue-router'
import CustomIconButton from '@/components/atoms/CustomIconButton.vue'
import MovieDetailSearch, { MovieDetailSearchType } from '@/components/organisms/MovieDetailSearch.vue'
import FormModal from '@/components/organisms/FormModal.vue'
import { MovieSearchConditionType } from '@/movieSearchConditionType'
import { UPDATE_MOVIE_SEARCH_CONDITIONS, GET_MOVIE_SEARCH_CONDITIONS } from '@/store/mutation-types'

const router = useRouter()
const store = useStore()
const showMovieDetailSearchModal = ref(false)

const currentQuery = router.currentRoute.value.query.q ? String(router.currentRoute.value.query.q) : ''
const searchText = ref(currentQuery)

const emits = defineEmits<{(e: 'result', movies: MovieSearchConditionType): void}>()

const onSubmit = (searchQuery: string) => {
  searchMovie(searchQuery, null, null)
}

const searchDetailResult = (searchDetail: MovieDetailSearchType) => {
  showMovieDetailSearchModal.value = false
  searchMovie(null, searchDetail.movieGenreIds, searchDetail.searchGenreAnd)
}

const searchMovie = (query: string, genreIds: string[], genreAnd: boolean) => {
  const alreadySettingMovieSearchConditions = store.getters[GET_MOVIE_SEARCH_CONDITIONS]
  const newSearchConditions: MovieSearchConditionType = {
    q: query ?? alreadySettingMovieSearchConditions?.q,
    movieGenreIds: genreIds ?? alreadySettingMovieSearchConditions?.movieGenreIds,
    searchGenreAnd: genreAnd ?? alreadySettingMovieSearchConditions?.searchGenreAnd
  }
  store.commit(UPDATE_MOVIE_SEARCH_CONDITIONS, newSearchConditions)
  emits('result', newSearchConditions)
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
  width: 95%;
}
.custom-search-form {
  width: 5%;
}
</style>
