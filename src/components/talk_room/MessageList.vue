<!-- eslint-disable no-redeclare -->
<template>
  <div>
      <div>
        <div v-for="message in messages" v-bind:key="message.id">
          <v-card dark>
            <div class="font-weight-normal">
              <strong>{{ message.user.name }}</strong> @{{ message.createdAt }}
            </div>
            <div>{{ message.content }}</div>
          </v-card>
        </div>
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
const speak = ref('')

chatChannel.received = function (data) {
  const broadcastMessage = data.message
  console.log(broadcastMessage)
  const addingMessage: Message = {
    id: broadcastMessage.id,
    talkRoomId: broadcastMessage.talk_room_id,
    user: {
      id: broadcastMessage.user.id,
      name: broadcastMessage.user.name
    },
    content: broadcastMessage.content,
    createdAt: broadcastMessage.created_at,
    updatedAt: broadcastMessage.updated_at
  }
  messages.value.push(addingMessage)
  speak.value = ''
}

const messages = ref([])

onMounted(async () => {
  messages.value = await FetchMessages(props.talkRoomId)
})

const onclick = function () {
  chatChannel.perform('speak', {
    message: speak.value
  })
}
</script>
