<template>
  <div id="app">
    <h2>Vue.js WebSocket Tutorial</h2>
    <button v-on:click="sendMessage('hello')">Send Message</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Components
import ActionCable from 'actioncable'

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
const chatChannel = cable.subscriptions.create(
  {
    channel: 'RoomChannel',
    room: 'チャットルーム'
  },
  {
    received (data) {
      console.log(data.message)
    }
  }
)
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
  },
  methods: {
    sendMessage: function (message: string) {
      chatChannel.perform('speak', {
        message: message
      })
    },
    received: function (message: string) {
      console.log(message)
    }
  },
  created: function () {
    this.chatChannel = chatChannel
  }
})
</script>
