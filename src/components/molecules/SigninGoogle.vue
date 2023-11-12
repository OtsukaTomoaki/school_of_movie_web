<template>
  <div class="profile-container">

    <v-card dark class="profile-content">
      <p class="menu-title">
        Select the service you use to sign in
      </p>

      <div class="signin-service-list-content">
        <img :src="googleImage" alt="" @click="redirectToSignInWithOaAuth">
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import googleImage from '@/assets/external_service/google/signin-assets/iOS/png@4x/light/ios_light_rd_SI@4x.png'

const redirectToSignInWithOaAuth = () => {
  window.location.href = `${process.env.VUE_APP_ROOT_API}/auth/google_oauth2`
}
</script>

<style scoped>
.profile-container {
  display: block;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
}

.profile-content {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  min-height: 300px;
}

.signin-service-list-content {
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.signin-service-list-content img {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.signin-service-list-content img:hover {
  cursor: pointer;
}

.menu-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
