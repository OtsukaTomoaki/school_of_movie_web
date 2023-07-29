<template>
  <div class="header-container">
    <div class="header-title">
      <a href="/" @click="onTitleClicked">SCHOOL OF MOVIE</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

import { FetchProfile } from '@/apis/accounts'

import { UPDATE_MOVIE_SEARCH_CONDITIONS } from '@/store/mutation-types'

const store = useStore()

interface Profile {
  name: string;
  email: string;
}

onMounted(async function () {
  const store = useStore()
  const profile = await FetchProfile(store)
})

const onTitleClicked = () => {
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
  font-size: 25px;
  color: #F9D949;
  -webkit-text-stroke: #F9D949 1px;
}

.header-title a {
  text-decoration: none;
  color: #F9D949;
  -webkit-text-stroke: #F9D949 1px;
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
