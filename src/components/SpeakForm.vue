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
// import { Options, Vue } from 'vue-class-component'
import { ref, defineComponent } from 'vue'
import ActionCable from 'actioncable'

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
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
    received: function (data:any) {
      this.messages.push(data.message)
      console.log('recived:' + data.message)
    }
  }
})
</script>
