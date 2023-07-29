<template>
  <div class="header-container">
    <div class="background-image-container">
      <img class="background-image" :src="path" v-for="path in backgroundImagePaths" :key="path" />
    </div>

    <div class="header-title">
      <a href="/" @click="onTitleClicked">SCHOOL OF MOVIE</a>
    </div>

    <router-link to="/profile" class="profile">
      <v-avatar size="20">
        <img class="avatar-image" src="http://localhost:3000/api/v1/users/download_avatar_image" />
      </v-avatar>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { FetchProfile } from '@/apis/accounts'
import { FetchMovies } from '@/apis/movies'

import { UPDATE_MOVIE_SEARCH_CONDITIONS } from '@/store/mutation-types'

const backgroundImagePaths = ref([])
const store = useStore()

interface Profile {
  name: string;
  email: string;
}

onMounted(async function () {
  const store = useStore()
  const profile = await FetchProfile(store)
  console.log(profile)
  const { movies } = await FetchMovies(null)
  const images = movies.map((movie: any) => {
    return 'https://image.tmdb.org/t/p/w200/' + movie.posterPath
  })
  backgroundImagePaths.value = images
})

const onTitleClicked = () => {
  console.log('title clicked')
  store.commit(UPDATE_MOVIE_SEARCH_CONDITIONS, null )
}
</script>

<style scoped>
.header-container {
  position: absolute;
  top: 0%;
  width: 100%;
  height: 80px;
}

.header-title {
  position: absolute;
  font-weight: 900;
  font-size: large;
  font-family: 'Caveat', cursive;
  font-size: 50px;
  color: #F9D949;
  -webkit-text-stroke: #2c3e50 1px;
}

.header-title a {
  text-decoration: none;
  color: #F9D949;
  -webkit-text-stroke: #2c3e50 1px;
}

.avatar-image {
  width: 20px;
  height: auto;
}

.background-image-container {
  position: absolute;
  width: 100%;
  height: calc(100% - 15px);
  overflow: hidden;
}
.background-image-container img {
  left: 0;
  right: 0;
  transform: translateY(-10%);
  width: calc(100% / 10);
  filter: sepia(100%);
}
.profile {
  position: absolute;
  right: 0%;
  top: 0%;
  margin: 10px;
}
</style>
