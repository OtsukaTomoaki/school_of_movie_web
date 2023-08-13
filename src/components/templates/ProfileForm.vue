<template>
  <div class="profile-container">
    <v-card dark>
      <v-divider class="mx-3"></v-divider>
      <div v-if="profile">
        <v-card-text>
          <InputAvatarImage
            :imageUri="avaterImageUri ? avaterImageUri : 'http://localhost:3000/api/v1/users/download_avatar_image'"
            :size="150"
            @change="updateAvaterImage"
            />
          <div class="body-1 mb-1">
            {{profile.email}}
          </div>
          <v-text-field
                v-model="profile.name"
                :counter="200"
                label="name"
                required
              ></v-text-field>
        </v-card-text>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <CustomButton small text="Save" @click="onSaveClicked"/>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { UPDATE_PROFILE } from '@/store/mutation-types'
import { FetchProfile, UpdateProfile } from '@/apis/accounts'
import { Profile } from '@/profileTypes'
import CustomButton from '@/components/atoms/CustomButton.vue'
import InputAvatarImage from '@/components/molecules/InputAvatarImage.vue'

const store = useStore()
const avaterImageUri = ref('')
const profile = ref<Profile>(null)

onMounted(async function () {
  profile.value = await FetchProfile()
})

const onSaveClicked = async () => {
  const newAvaterImageUri = avaterImageUri ? avaterImageUri.value.split(',')[1] : null
  profile.value = await UpdateProfile(profile.value.id, profile.value, newAvaterImageUri)
  store.commit(UPDATE_PROFILE, profile.value)
  window.location.reload()
}

const updateAvaterImage = async (base64: string) => {
  avaterImageUri.value = base64
}
</script>

<style scoped>
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
}
.profile-avatar-image {
  width: 100%;
  height: auto;
}
</style>
