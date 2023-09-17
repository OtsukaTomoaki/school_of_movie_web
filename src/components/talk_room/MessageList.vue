<!-- eslint-disable no-redeclare -->
<template>
  <div class="message-container">
      <div ref="messageList" class="message-list">
        <div v-for="message in messages" v-bind:key="message.id">
          <div class="message-content">
            <div class="talker-avatar">
              <!-- todo: 喋った人のアバターが表示されるようにする -->
              <CustomAvatarImage
              :imageUri="`${MY_AVATAR_IMAGE_URL}/${message.user.id}`"
                :size="50"
              />
            </div>
            <div class="balloon1-left">
              <div class="font-weight-normal">
                <strong>{{ message.user.name }}</strong> @{{ message.createdAt }}
              </div>
              <div>{{ message.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- todo: ボタンテキストが「Search」になっているので、汎用的なボタンコンポーネントを作成する -->
      <div class="send-message-form">
        <TextButtonForm :text="speak" @submit="onclick" :clearOnClick="true" buttonText="Comment">
        </TextButtonForm>
      </div>
  </div>
</template>

<script setup lang="ts">
import { FetchMessages, Message } from '@/apis/messages'
import { ref, watch, onMounted } from 'vue'
import ActionCable from 'actioncable'
import TextButtonForm from '@/components/molecules/TextButtonForm.vue'
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'
import { MY_AVATAR_IMAGE_URL } from '@/apis/accounts'

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
  width: 100%;
  height: 100%;
  position: relative;
}

.message-list {
  overflow-y: scroll;
  height: calc(100% - 60px);
}

.message-content {
  display: flex;
  height: auto;
}

.send-message-form {
  padding-bottom: 10px;
  height: 60px;
  bottom: 0;
  position: absolute;
  width: 100%;
}
.message-content .talker-avatar {
  display: inline-block;
  margin: 2px 0 15px 15px;
  padding: 7px 10px;
  width: 80px;
}

.balloon1-left {
  position: relative;
  display: inline-block;
  margin: 2px 0 15px 15px;
  padding: 7px 10px;
  width: calc(100% - 60px);
  color: #555;
  background: #e0edff;
}

.balloon1-left:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -30px;
  margin-top: -15px;
  border: 15px solid transparent;
  border-right: 15px solid #e0edff;
}

.balloon1-left p {
  margin: 0;
  padding: 0;
}
</style>
