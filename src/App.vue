<template>
  <HeaderItem @unauthorized="HandleUnauthorized"></HeaderItem>

  <div class="main-container">
    <router-view/>
  </div>
  <!-- <div class="footer-container">
    <FooterItem></FooterItem>
  </div> -->
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import HeaderItem from '@/globals/HeaderItem.vue' // @ is an alias to /src
import { getIdentity } from './apis/sessions';
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_IDENTITY,
  GET_IDENTITY
} from '@/store/mutation-types'
import { FetchProfile } from '@/apis/accounts'

const allowAnonymousPaths = [
  '/signin',
  '/signup',
  '/signup_google',
  '/signin_with_token',
  '/signup_with_oauth_provider'
]

const store = useStore()

const HandleUnauthorized = () => {
  if (allowAnonymousPaths.includes(location.pathname)) {
    return
  }
  location.href = '/signin'
}

const setIdentity = async () => {
  const identity = await getIdentity()
  store.commit(UPDATE_IDENTITY, identity)
}

const setProfile = async () => {
  const profile = await FetchProfile()
  store.commit(UPDATE_PROFILE, profile)
}

onMounted(async () => {
  if (!store.getters[GET_PROFILE] || !store.getters[GET_IDENTITY]) {
    try {
      await setProfile()
      await setIdentity()
    } catch (e) {
      console.warn(e)
      HandleUnauthorized()
    }
  }

  const session_expires_at = store.getters[GET_IDENTITY]?.expiresAt
  const now = new Date()
  if (!session_expires_at || session_expires_at > now) {
    store.commit(UPDATE_IDENTITY, null)
    store.commit(UPDATE_PROFILE, null)
    HandleUnauthorized()
  }
})
</script>

<style>
@import 'https://fonts.googleapis.com/css2?family=Caveat&display=swap';

body {
  background-color: #2c3e50;
}
a {
  color: #F0F0F0;
}
input {
  border-radius: 25px;
  padding: 10px 15px;
  border: 1px solid #F0F0F0;
  background-color: #F0F0F0;
  color: #3C486B;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F0F0F0;
  font-family: 'Caveat', cursive;
}

.main-container {
  margin-top: 50px;
}
.footer-container {
  position: absolute;
  top: calc(100% + 10px);
  text-align: center;
  width: 100%;
}
nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
