<template>
  <div class="profile-card">
    <div class="profile-wrapper">

      <div class="profile-card-avatar">
        <CustomAvatarImage
          :imageUri="`${MY_AVATAR_IMAGE_URL}/${store.getters[GET_PROFILE].id}`"
          :size="70"
        />
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
        <a href="/profile">
          <IconText type="edit" text="edit" />
        </a>
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
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'
import { MY_AVATAR_IMAGE_URL } from '@/apis/accounts'
import { GET_PROFILE } from '@/store/mutation-types'

const profile = ref<ProfileType>(null)
const store = useStore()

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

.profile-button-content a {
  text-decoration: none;
  color: #2c3e50;
}
</style>
