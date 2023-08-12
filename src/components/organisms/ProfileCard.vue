<template>
  <div class="profile-card">
    <div class="profile-wrapper">

      <div class="profile-card-avatar">
        <img class="profile-avatar-image" src="http://localhost:3000/api/v1/users/download_avatar_image" />
      </div>
      <Transition>
        <div class="profile-container" v-if="profile">
          <div class="profile-content">
            <div class="profile-card-name">
              {{ profile.name }}
            </div>
            <div class="profile-card-email">
              {{ profile.email }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div class="profile-buttons-wrapper">
      <div class="profile-button-content">
        <IconText type="edit" text="edit" />
      </div>
      <div class="profile-button-content">
        <IconText type="log-out" text="signout" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { FetchProfile } from '@/apis/accounts'
import { Profile as ProfileType } from '@/profileTypes'
import IconText from '@/components/molecules/IconText.vue'

const profile = ref<ProfileType>(null)

onMounted(async function () {
  profile.value = await FetchProfile()
})

</script>

<style scoped>
.profile-wrapper {
  display: flex;
  padding: 15px;
}
.profile-card-avatar {
  display: flex;
  width: 20%;
  height: auto;
}

.profile-card-avatar img {
  display: flex;
  max-width: 100%;
  height: auto;
  border-radius: 75%;

}

.profile-container {
  display: inline-block;
  width: 80%;
  text-align: left;
  padding-top: 10px;
}

.profile-container .profile-content {
  padding-left: 5px;
}

.v-enter-active, .v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.profile-buttons-wrapper {
  text-align: left;
  padding: 15px;
  margin-left: 15px;
}

.profile-button-content {
  padding: 5px;
}
</style>
