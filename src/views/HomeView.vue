<template>
  <div id="app">
    Home
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/movies')

</script>
