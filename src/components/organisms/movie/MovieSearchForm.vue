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
import { useRouter } from 'vue-router'

const router = useRouter()
// const props = defineProps({
//   movies: []
// })
const currentQuery = router.currentRoute.value.query.q ? String(router.currentRoute.value.query.q) : ''
const searchText = ref(currentQuery)

const emits = defineEmits<{(e: 'result', movies: any[]): void}>()

const search = async (searchQuery: string) => {
  console.log(searchQuery)
  router.push({ query: { q: searchQuery } })
  const { movies, totalCount } = await FetchMovies(searchQuery)
  emits('result', movies)
}

onMounted(async function () {
  console.log('MovieSearchForm mounted')
})
</script>
