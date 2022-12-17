<template>
  <div class="header-container">
    <span class="header-title">Funny Cats</span>
    <span>{{email}}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref } from 'vue'

import { FetchProfile } from '@/apis/accounts'
import { useStore } from 'vuex'
// import useCounter from '../composables/useProfile'

export default {
  components: {
  },
  data: function () {
    return {
      email: ''
    }
  },
  props: {
  },
  setup () {
    const store = useStore()
    setTimeout(async function ():Promise<void> {
      const profile = await FetchProfile(store)
      console.log(profile)
      // this.email = profile.email
    }, 0)
  }
}
</script>

<style scoped>
.header-container {
  position: absolute;
  top: 0%;
  background-color: aqua;
  width: 100%;
}
.header-title {
  position: absolute;
  left: 0%;
  font-weight: 800;
  font-size: large;
}
</style>
