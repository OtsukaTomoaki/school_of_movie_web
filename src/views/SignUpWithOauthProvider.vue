<template>
  <label>ユーザを作成する</label>
  <div>
    <Signup v-bind:email="email" v-bind:name="name">
    </Signup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Signup from '@/components/SignUpConfirm.vue'

type SignUpState = {
  name: string
  email: string
}
export default {
  components: {
    Signup
  },
  ctreated () {
    console.log('created!')
  },
  setup () {
    const encodedState: string = useRoute().query.signup_state as string
    const decodedData: string = decodeURIComponent(escape(window.atob(encodedState)))

    const signUpState: SignUpState = JSON.parse(decodedData) as SignUpState
    console.log(signUpState)
    const email = ref(signUpState.email)
    const name = ref(signUpState.name)

    return {
      email,
      name
    }
  }
}
</script>
