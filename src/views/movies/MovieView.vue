<template>
  <MovieThumbnail></MovieThumbnail>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import MovieThumbnail from '@/components/templates/MovieList.vue'

export default defineComponent({
  name: 'MovieView',

  components: {
    MovieThumbnail
  }
})
</script>

<script setup lang="ts">

onMounted(async function () {
  console.log('mounted')
})
</script>

<!-- <script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MovieView',

  components: {

  }
})
</script> -->

<style>

</style>
