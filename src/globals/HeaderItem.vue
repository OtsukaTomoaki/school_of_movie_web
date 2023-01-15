<template>
  <div class="header-container">
    <span class="header-title">Funny Cats</span>

    <router-link to="/profile">
      <v-avatar size="20">
        <img class="avatar-image" src="http://localhost:3000/api/v1/users/download_avatar_image" />
      </v-avatar>
      <span>{{ name }}</span>
    </router-link>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref } from 'vue'

import { FetchProfile } from '@/apis/accounts'
import { useStore } from 'vuex'
// import useCounter from '../composables/useProfile'

interface Profile {
  name: string;
  email: string;
}

export default {
  components: {
  },
  data: function ():Profile {
    const res: Profile = {
      email: '',
      name: ''
    }
    return res
  },
  props: {
  },
  async mounted (this: Profile) {
    const store = useStore()
    const profile = await FetchProfile(store)
    console.log(profile)
    this.name = profile.name
  }
}
</script>

<style scoped>
.header-container {
  position: absolute;
  top: 0%;
  width: 100%;
}
.header-title {
  position: absolute;
  left: 0%;
  font-weight: 800;
  font-size: large;
}
.avatar-image {
  width: 20px;
  height: auto;
}
</style>
