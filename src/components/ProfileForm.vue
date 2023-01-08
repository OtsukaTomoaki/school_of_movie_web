<template>
  <div class="profile">
    <v-card dark>
      <v-card-title class="headline">title</v-card-title>
      <v-divider class="mx-3"></v-divider>
      <v-card-text>
        <v-avatar size="80">
          <img class="profile-avatar-image" src="http://localhost:3000/api/v1/users/download_avatar_image" />
        </v-avatar>
        <div class="body-1 mb-1">
          {{email}}
        </div>
        <v-text-field
              v-model="name"
              :counter="200"
              label="name"
              required
            ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small>Edit</v-btn>
        <v-btn x-small>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UPDATE_AUTHORIZATION_TOKEN, UPDATE_REMEMBER_TOKEN } from '@/store/mutation-types'
import { FetchProfile } from '@/apis/accounts'

interface Profile {
  name: string;
  email: string;
}

export default {
  name: 'ProfileForm',
  data: function ():Profile {
    const res: Profile = {
      email: '',
      name: ''
    }
    return res
  },
  async mounted (this: Profile) {
    const store = useStore()
    const profile = await FetchProfile(store)
    console.log(profile)
    this.email = profile.email
    this.name = profile.name
  }
}
</script>

<style scoped>
.profile-avatar-image {
  width: 100%;
  height: auto;
}
</style>
