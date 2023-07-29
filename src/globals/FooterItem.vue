<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/movies">Movie</router-link> |
    <router-link to="/talk_rooms">Talk</router-link> |
    <router-link to="/signin">SignIn</router-link>
  </nav>
</template>

<script setup lang="ts">
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
