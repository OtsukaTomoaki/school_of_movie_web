<template>
  <div class="search-form">
    <SearchForm :text="searchText" @submit="search">
    </SearchForm>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import SearchForm from '@/components/molecules/SearchForm.vue'
import { FetchMovies } from '@/apis/movies'

export default {
  name: 'MovieSearchForm',
  components: {
    SearchForm
  }
}
</script>

<script setup lang="ts">
console.log('MovieSearchForm setup')
const searchText = ref('a')

const search = async (searchQuery: string) => {
  console.log(searchQuery)
  const movies = await FetchMovies(searchQuery)
  console.log(searchQuery, movies)
}

onMounted(async function () {
  console.log('MovieSearchForm mounted')
})
</script>
