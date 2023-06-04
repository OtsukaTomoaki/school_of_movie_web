<template>
  <div class="search-form">
    <SearchForm :text="searchText" @submit="search">
    </SearchForm>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import SearchForm from '@/components/molecules/SearchForm.vue'
import { FetchMovies } from '@/apis/movies'

const props = defineProps({
  movies: []
})

console.log('MovieSearchForm setup')
const searchText = ref('a')

const emits = defineEmits<{(e: 'result', movies: any[]): void}>()

const search = async (searchQuery: string) => {
  console.log(searchQuery)
  const movies = await FetchMovies(searchQuery)
  emits('result', movies)
}

onMounted(async function () {
  console.log('MovieSearchForm mounted')
})
</script>
