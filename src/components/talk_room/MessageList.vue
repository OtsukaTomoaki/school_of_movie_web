<!-- eslint-disable no-redeclare -->
<template>
  <div>
      <div>
        <li v-for="message in messages" v-bind:key="message.id">
          message:{{ message.content }}
        </li>
      </div>
      <label>Speak:</label>
      <input v-model="speak" type="text" />
      <button v-on:click=onclick>Send Message</button>
  </div>
</template>

<script setup lang="ts">
import { FetchMessages, Message } from '@/apis/messages'
import { ref, defineProps, onMounted } from 'vue'
import ActionCable from 'actioncable'

const props = defineProps<{talkRoomId: string}>()
const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
const chatChannel = cable.subscriptions.create(
  {
    channel: 'RoomChannel',
    room: 'チャットルーム',
    id: props.talkRoomId
  }
)
interface Talk {
  message: string;
}
const speak = ref('')

chatChannel.received = function (data: Talk) {
  messages.value.push(data.message)
  speak.value = ''
}

const messages = ref([])

onMounted(async () => {
  console.log(props.talkRoomId)
  console.log(messages.value)
  messages.value = await FetchMessages(props.talkRoomId)
})

const onclick = function () {
  console.log(speak.value)
  chatChannel.perform('speak', {
    message: speak.value
  })
}
</script>
