<template>
  <div class="profile-container">
    <v-card dark>
      <v-card-title class="headline">title</v-card-title>
      <v-divider class="mx-3"></v-divider>
      <div v-if="profile">
        <v-card-text>
          <v-avatar size="80">
            <img class="profile-avatar-image" src="http://localhost:3000/api/v1/users/download_avatar_image" />
          </v-avatar>
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
import { FetchProfile, UpdateProfile } from '@/apis/accounts'
import { Profile } from '@/profileTypes'
import CustomButton from '@/components/atoms/CustomButton.vue'

const profile = ref<Profile>(null)
onMounted(async function () {
  profile.value = await FetchProfile()
})

const onSaveClicked = async () => {
  profile.value = await UpdateProfile(profile.value.id, profile.value)
  console.log('onSaveClicked')
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
