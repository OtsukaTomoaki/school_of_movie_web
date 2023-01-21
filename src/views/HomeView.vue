<template>
  <div id="app">
    <h2>Vue.js WebSocket Tutorial</h2>
    <SpeakForm></SpeakForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SpeakForm from '@/components/SpeakForm.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    SpeakForm
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
