<!-- todo: css全体的におかしいので後で修正 -->
<template>
  <div class="header-container">
    <div class="header-title">
      <!-- assets logo.pngを表示-->
      <div class="logo-title-content">
        <a @click="onTitleClicked" href="#">
          <div class="logo-title">
            <div class="logo-container">
              <img :src="logoUrl" width="50" height="50" alt="logo">
            </div>
            <p>
              School Of Movie
            </p>
          </div>
        </a>
      </div>

    </div>
    <div class="header-right-profile" v-if="profile">
      <div class="profile-wrapper">
        <a href="#" @click="() => showCardModal = true">
          <CustomAvatarImage
          :imageUri="`${MY_AVATAR_IMAGE_URL}/${store.getters[GET_PROFILE].id}`"
            :size="40"
          />
        </a>
      </div>
      <CardModal v-if="showCardModal" @update:show="(event) => showCardModal = event">
        <ProfileCard></ProfileCard>
      </CardModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

import logoUrl from '@/assets/logo.png'

import { MY_AVATAR_IMAGE_URL } from '@/apis/accounts'
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'
import {
  UPDATE_MOVIE_SEARCH_CONDITIONS,
  GET_AUTHORIZATION_TOKEN,
  GET_PROFILE
  
} from '@/store/mutation-types'
import CardModal from '@/components/organisms/CardModal.vue'
import { Profile } from '@/profileTypes'
import ProfileCard from '@/components/organisms/ProfileCard.vue'

const store = useStore()

const profile = ref<Profile>(null)
const showCardModal = ref(false)

onMounted(async function () {
  if (store.getters[GET_AUTHORIZATION_TOKEN] === '') {
    return
  }

  if (store.getters[GET_PROFILE] != null) {
    profile.value = store.getters[GET_PROFILE]
  }
})

const onTitleClicked = () => {
  store.commit(UPDATE_MOVIE_SEARCH_CONDITIONS, null)
  location.href = '/'
}

</script>

<style scoped>
.header-container {
  position: absolute;
  top: 0%;
  width: 100%;
  height: 50px;
}

.header-title {
  position: absolute;
  font-weight: 900;
  font-size: large;
  font-family: 'Caveat', cursive;
  font-size: 30px;
  color: #F9D949;
  -webkit-text-stroke: #F9D949 1px;
}

.logo-title-content {
  position: relative;
  display: inline-block;
}

.header-title a {
  text-decoration: none;
  color: #F9D949;
  -webkit-text-stroke: #F9D949 1px;
  margin-top: 0px;
  display: inline-block;
}
.logo-container {
  position: relative;
  display: inline-block;
  margin-left: auto;
}


.logo-title p {
  font-size: 40px;
  display: inline-block;
  transform: translateY(-10px);
}

.header-right-profile {
  position: absolute;
  right: 0%;
  width: 50px;
  height: 50px;
}

.profile-wrapper {
  margin-top: 3px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 1px outset #F0F0F0;
}
.profile-avatar-image {
  width: auto;
  height: 100%;
}

</style>
