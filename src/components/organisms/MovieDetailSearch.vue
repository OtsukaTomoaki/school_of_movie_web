<template>
  <div v-for="movieGenre in movieGenres" :key="movieGenre.id">
    <input type="checkbox" :id="movieGenre.id" :value="movieGenre.selected" v-on:click='() => onclick(movieGenre.id)' />
    {{ movieGenre.name }}
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { FetchMovieGenres } from '@/apis/movie_genres'

const movieGenres = ref([])
const router = useRouter()

onMounted(async () => {
  movieGenres.value = (await FetchMovieGenres()).map((movieGenre: any) => {
    return {
      id: movieGenre.id,
      name: movieGenre.name,
      selected: router.currentRoute.value.query.genre_ids?.includes(movieGenre.id)
    }
  })
})

watch(() => router.currentRoute.value.query.genre_ids, (newVal, oldVal) => {
  if (!newVal || newVal === oldVal) {
    return
  }
  movieGenres.value = movieGenres.value.map((movieGenre: any) => {
    return {
      ...movieGenre,
      selected: router.currentRoute.value.query.genre_ids?.includes(movieGenre.id)
    }
  })
})

const onclick = (id: string) => {
  const genreIdsQuery = router.currentRoute.value.query.genre_ids as string
  if (genreIdsQuery === undefined || !genreIdsQuery) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        genre_ids: id
      }
    })
    return
  }

  const genreIds = genreIdsQuery?.split(',').map((genreId: string) => genreId)

  if (genreIds?.includes(id)) {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        genre_ids: genreIds.filter((genreId: string) => genreId !== id).join(',')
      }
    })
  } else {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        genre_ids: [...genreIds, id].join(',')
      }
    })
  }
}

</script>
