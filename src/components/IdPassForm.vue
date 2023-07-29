<template>
    <div class="signin">
        <form action="post">
            <div>
                <label>ID:</label>
                <input v-model="email" type="text" />
            </div>
            <div>
                <label>Password:</label>
                <input v-model="password" type="password" />
            </div>
            <input type="button" value="サインイン" @click="onclick"/>
        </form>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UPDATE_AUTHORIZATION_TOKEN, UPDATE_REMEMBER_TOKEN } from '@/store/mutation-types'
import { FetchAuthToken } from '@/apis/accounts'

export default {
  name: 'IdPassForm',
  setup () {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const onclick = async () => {
      console.warn(password.value)
      const result = await FetchAuthToken(email.value, password.value)

      store.commit(UPDATE_AUTHORIZATION_TOKEN, result.authorizationToken)
      store.commit(UPDATE_REMEMBER_TOKEN, result.rememberToken)
      router.push('/form')
    }
    return {
      email,
      password,
      onclick
    }
  }
}
</script>
