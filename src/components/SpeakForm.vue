<template>
    <div>
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
  },
  {
    received (data) {
      console.log('recived:' + data.message)
    }
  }
)

export default defineComponent({
  name: 'SpeakForm',
  data: function () {
    return {
      chatChannel: null
    }
  },
  setup () {
    const speak = ref('')

    const onclick = async () => {
      chatChannel.perform('speak', {
        message: speak.value
      })
    }
    return {
      speak,
      onclick
    }
  },
  created: function () {
    this.chatChannel = chatChannel
  }
})
</script>
