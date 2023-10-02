<template>
    <div>
        <div>
          <li v-for="message in messages" v-bind:key="message.id">
            {{ message }}
          </li>
        </div>
        <label>Speak:</label>
        <input v-model="speak" type="text" />
        <button v-on:click=onclick>Send Message</button>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import ActionCable from 'actioncable'
import { WEB_SOCKET_BASE_URL } from '@/apis/base';

interface Talk {
  message: string;
}

const cable = ActionCable.createConsumer(WEB_SOCKET_BASE_URL)
const chatChannel = cable.subscriptions.create(
  {
    channel: 'RoomChannel',
    room: 'チャットルーム'
  }
)

export default defineComponent({
  name: 'SpeakForm',
  data: function () {
    return {
      messages: [],
      chatChannel: null
    }
  },
  setup () {
    const speak = ref('')
    return {
      speak
    }
  },
  created: function () {
    this.chatChannel = chatChannel
    this.chatChannel.received = this.received
  },
  methods: {
    onclick: async function () {
      chatChannel.perform('speak', {
        message: this.speak
      })
    },
    received: function (data: Talk) {
      this.messages.push(data.message)
      this.speak = ''
    }
  }
})
</script>
