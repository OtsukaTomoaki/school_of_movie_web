<template>
  <div class="profile-card">
    <div class="profile-wrapper">

      <div class="profile-card-avatar">
        <img class="profile-avatar-image" src="http://localhost:3000/api/v1/users/download_avatar_image" />
      </div>
      <div class="profile-content" v-if="profile">
        <div class="profile-card-email">
          {{ profile.email }}
        </div>
        <div class="profile-card-name">
          {{ profile.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { FetchProfile } from '@/apis/accounts'
import { Profile as ProfileType } from '@/profileTypes'

const profile = ref<ProfileType>(null)

onMounted(async function () {
  profile.value = await FetchProfile()
})

</script>