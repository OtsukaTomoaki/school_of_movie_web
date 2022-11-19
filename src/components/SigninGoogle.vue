<template>
  <div>
    <!-- <form method="post" name="form1" action="http://localhost:3000/auth/google_oauth2">
      <input type="submit" value="Googleボタンでサインイン" />
    </form> -->
    <a href="http://localhost:3000/auth/google_oauth2">Googleボタンでサインイン</a>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SigninGoogle',
  setup () {
    const onclick = async () => {
      console.log('clicked!!')
    }
    return {
      onclick
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  width: 100%;
  background-color: red;
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
