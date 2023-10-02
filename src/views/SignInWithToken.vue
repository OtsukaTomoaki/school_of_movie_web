<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { FetchAuthTokenWithRememberToken } from '@/apis/accounts'
import { UPDATE_AUTHORIZATION_TOKEN, UPDATE_REMEMBER_TOKEN } from '@/store/mutation-types'

const store = useStore()
const encodedState: string = useRoute().query.signin_state as string
const decodedData: string = decodeURIComponent(escape(window.atob(encodedState)))

const signInState = JSON.parse(decodedData)
const email = signInState.email
const rememberToken = signInState.remember_token

onMounted(async () => {
  const result = await FetchAuthTokenWithRememberToken(email, rememberToken)
  store.commit(UPDATE_AUTHORIZATION_TOKEN, result.authorizationToken)
  store.commit(UPDATE_REMEMBER_TOKEN, result.rememberToken)
  location.href = '/'
})
</script>
