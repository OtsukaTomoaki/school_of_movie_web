<template>
  <HeaderItem></HeaderItem>

  <div class="main-container">
    <router-view/>
  </div>
  <!-- <div class="footer-container">
    <FooterItem></FooterItem>
  </div> -->
</template>

<script setup lang="ts">
import HeaderItem from '@/globals/HeaderItem.vue' // @ is an alias to /src
// import FooterItem from '@/globals/FooterItem.vue' // @ is an alias to /src
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
