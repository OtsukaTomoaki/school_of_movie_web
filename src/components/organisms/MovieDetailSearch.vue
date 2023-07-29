<template>
  <fieldset class="detail-search-content">
    <legend>ジャンル</legend>
    <div class="genre-checkbox-list-wrapper">
      <div v-for="movieGenre in movieGenres" :key="movieGenre.id" class="genre-content">
        <input type="checkbox" :id="movieGenre.id" :value="movieGenre.id" v-model="selectedMovieGenres" />
        {{ movieGenre.name }}
      </div>
    </div>

    <div class="search_by_movie_genre_optional_containar">
      <input type="radio" :value="false" v-model="searchGenreAnd" />
      <label>いづれかのジャンルに一致したもの全てを結果に含める</label>
    </div>
    <div class="search_by_movie_genre_optional_containar">
      <!-- <input type="checkbox" :value="searchGenreAnd" v-model="searchGenreAnd" />
      <label>全てのジャンルに一致したもののみ結果に含める</label> -->
      <input type="radio" :value="true" v-model="searchGenreAnd" />
      <label>全てのジャンルに一致したもののみ結果に含める</label>
    </div>
  </fieldset>

  <CustomButton text="Search" @click="onSubmit" v-bind:primary='true'/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { FetchMovieGenres } from '@/apis/movie_genres'
import CustomButton from '@/components/atoms/CustomButton.vue'
import { GET_MOVIE_SEARCH_CONDITIONS } from '@/store/mutation-types'

export interface MovieDetailSearchType {
  movieGenreIds: string[]
  searchGenreAnd: boolean
}

const movieGenres = ref([])
const selectedMovieGenres = ref([])
const searchGenreAnd = ref(false)

const store = useStore()
const emits = defineEmits<{(e: 'result', movieDetailSearch: MovieDetailSearchType): void}>()

onMounted(async () => {
  const alreadySettingMovieSearchConditions = store.getters[GET_MOVIE_SEARCH_CONDITIONS]
  movieGenres.value = (await FetchMovieGenres()).map((movieGenre: any) => {
    return {
      id: movieGenre.id,
      name: movieGenre.name,
      selected: alreadySettingMovieSearchConditions?.movieGenreIds ?? alreadySettingMovieSearchConditions.movieGenreIds.includes(movieGenre?.id)
    }
  })
  if (alreadySettingMovieSearchConditions.value?.movieGenreIds?.length > 0) {
    selectedMovieGenres.value = alreadySettingMovieSearchConditions?.movieGenreIds
    searchGenreAnd.value = alreadySettingMovieSearchConditions?.searchGenreAnd
  } else {
    searchGenreAnd.value = false
  }
})

const onSubmit = () => {
  const result: MovieDetailSearchType = {
    movieGenreIds: selectedMovieGenres.value,
    searchGenreAnd: searchGenreAnd.value
  }
  emits('result', result)
}

</script>

<style scoped>
.detail-search-content {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.genre-content {
  display: inline-block;
  width: 50%;
}

.genre-checkbox-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 10px;
}
.search_by_movie_genre_optional_containar {
  display: block;
}
</style>
