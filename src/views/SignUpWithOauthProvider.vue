<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div>
    <Signup v-bind:email="email" v-bind:name="name" v-bind:image="image" v-bind:onclick="onclick">
    </Signup>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Signup from '@/components/SignUpConfirm.vue'
import { SignUpWithSocialAccounts } from '@/apis/accounts'
import { UPDATE_AUTHORIZATION_TOKEN, UPDATE_REMEMBER_TOKEN } from '@/store/mutation-types'

export default {
  components: {
    Signup
  },
  ctreated () {
    console.log('created!')
  },
  setup () {
    const store = useStore()
    const encodedState: string = useRoute().query.signup_state as string
    const decodedData: string = decodeURIComponent(escape(window.atob(encodedState)))

    const signUpState = JSON.parse(decodedData)
    const email = signUpState.email
    const name = signUpState.name
    const onetimeToken = signUpState.onetime_token
    const image = signUpState.image

    const onclick:(payload: MouseEvent) => void = async (): Promise<void> => {
      await SignUpWithSocialAccounts(email, onetimeToken)
      window.location.href = `${process.env.VUE_APP_ROOT_API}/auth/google_oauth2`
    }

    return {
      email,
      name,
      onclick,
      image
    }
  }
}
</script>
<style scoped>
</style>
