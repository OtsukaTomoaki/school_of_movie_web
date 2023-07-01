<template>
  <div v-for="movieGenre in movieGenres" :key="movieGenre.id">
    <input type="checkbox" :id="movieGenre.id" :value="movieGenre.id" v-model="selectedMovieGenres" />
    {{ movieGenre.name }}
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

  <CustomButton text="Search" @click="onSubmit" v-bind:primary='true'/>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { FetchMovieGenres } from '@/apis/movie_genres'
import CustomButton from '@/components/atoms/CustomButton.vue'

export interface MovieDetailSearchType {
  movieGenreIds: string[]
  searchGenreAnd: boolean
}

const movieGenres = ref([])
const selectedMovieGenres = ref([])
const searchGenreAnd = ref(false)

const router = useRouter()
const emits = defineEmits<{(e: 'result', movieDetailSearch: MovieDetailSearchType): void}>()

onMounted(async () => {
  movieGenres.value = (await FetchMovieGenres()).map((movieGenre: any) => {
    return {
      id: movieGenre.id,
      name: movieGenre.name,
      selected: router.currentRoute.value.query.genre_ids?.includes(movieGenre.id)
    }
  })
  selectedMovieGenres.value = (router.currentRoute.value.query.genre_ids as string)?.split(',') || []
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
.search_by_movie_genre_optional_containar {
  display: block;
}
</style>
