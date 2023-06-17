<template>
  <div>
    <CustomButton :text="'Googleアカウントでサインイン'" @click="redirectToSignInWithOaAuth"></CustomButton>
  </div>
</template>

<script setup lang="ts">
import CustomButton from '../atoms/CustomButton.vue'

const redirectToSignInWithOaAuth = () => {
  window.location.href = 'http://localhost:3000/auth/google_oauth2'
}
</script>

<style scoped>
div {
  display: inline-block;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 3px;
}

a {
  list-style: none;
  border: none;
  text-decoration: none;
}
a:visited {
  color: inherit;
}
</style>
