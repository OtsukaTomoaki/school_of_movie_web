<template>
  <div id="app">
    Home
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',

  components: {
  },
  data: function () {
    return {
      connection: null,
      messages: [],
      chatChannel: null
    }
  }
})
</script>
