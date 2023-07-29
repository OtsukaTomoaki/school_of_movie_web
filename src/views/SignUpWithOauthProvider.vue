<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <label>ユーザを作成する</label>
  <div>
    <Signup v-bind:email="email" v-bind:name="name" v-bind:onclick="onclick">
    </Signup>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
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
    const router = useRouter()
    const encodedState: string = useRoute().query.signup_state as string
    const decodedData: string = decodeURIComponent(escape(window.atob(encodedState)))

    const signUpState = JSON.parse(decodedData)
    const email = signUpState.email
    const name = signUpState.name
    const onetimeToken = signUpState.onetime_token

    const onclick:(payload: MouseEvent) => void = async (): Promise<void> => {
      const result = await SignUpWithSocialAccounts(email, onetimeToken)

      store.commit(UPDATE_AUTHORIZATION_TOKEN, result.authorizationToken)
      store.commit(UPDATE_REMEMBER_TOKEN, result.rememberToken)
      router.push('/')
    }

    return {
      email,
      name,
      onclick
    }
  }
}
</script>
