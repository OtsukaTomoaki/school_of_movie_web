<template>
  <label>ログインしていまーす</label>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { FetchAuthTokenWithRememberToken } from '@/apis/accounts'
import { UPDATE_AUTHORIZATION_TOKEN, UPDATE_REMEMBER_TOKEN } from '@/store/mutation-types'

export default {
  components: {
  },
  ctreated () {
    console.log('created!')
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const encodedState: string = useRoute().query.signin_state as string
    const decodedData: string = decodeURIComponent(escape(window.atob(encodedState)))

    const signInState = JSON.parse(decodedData)
    const email = signInState.email
    const rememberToken = signInState.remember_token

    setTimeout(async () => {
      const result = await FetchAuthTokenWithRememberToken(email, rememberToken)
      store.commit(UPDATE_AUTHORIZATION_TOKEN, result.authorizationToken)
      store.commit(UPDATE_REMEMBER_TOKEN, result.rememberToken)
      router.push('/')
    }, 100)

    return {
    }
  }
}
</script>
