<template>
  <HeaderItem></HeaderItem>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/movies">Movie</router-link> |
    <router-link to="/talk_rooms">Talk</router-link> |
    <router-link to="/signin">SignIn</router-link>
  </nav>
  <router-view/>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HeaderItem from '@/globals/HeaderItem.vue' // @ is an alias to /src

@Options({
  components: {
    HeaderItem
  }
})
export default class HomeView extends Vue {}
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

}

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
