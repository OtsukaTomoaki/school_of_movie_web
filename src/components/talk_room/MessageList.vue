<!-- eslint-disable no-redeclare -->
<template>
  <div class="message-container">
      <div ref="messageList" class="message-list">
        <div v-for="message in messages" v-bind:key="message.id">
          <div class="message-content">
            <v-card dark>
              <div class="font-weight-normal">
                <strong>{{ message.user.name }}</strong> @{{ message.createdAt }}
              </div>
              <div>{{ message.content }}</div>
            </v-card>
          </div>
        </div>
      </div>
      <div class="send-message-form">
        <SearchForm :text="speak" @submit="onclick">
        </SearchForm>
      </div>
  </div>
</template>

<script setup lang="ts">
import { FetchMessages, Message } from '@/apis/messages'
import { ref, watch, onMounted } from 'vue'
import ActionCable from 'actioncable'
import SearchForm from '@/components/molecules/SearchForm.vue'

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
const messageList = ref()

onMounted(async function () {
  messages.value = await FetchMessages(props.talkRoomId)

  watch(messages.value, () => {
    setTimeout(() => {
      messageList.value.scrollTop = messageList.value.scrollHeight
    })
  }, {
    immediate: true
  })
})

const onclick = function (newMessage: string) {
  chatChannel.perform('speak', {
    message: newMessage
  })
  speak.value = ''
}

</script>

<style scoped>
.message-container {
  display: block;
}

.message-list {
  overflow-y: scroll;
  height: 400px;
}

.message-content {
  padding: 5px;
}

.send-message-form {
  padding-bottom: 10px;
  height: 60px;
  bottom: 0;
  position: absolute;
}
</style>
