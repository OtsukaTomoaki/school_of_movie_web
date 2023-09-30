<!-- eslint-disable no-redeclare -->
<template>
  <div class="message-wrapper">
      <div ref="messageList" class="message-list">
        <div v-for="message in messages" v-bind:key="message.id">
          <div class="message-contenteiner">
            <MessageWithAvator
              :message="message.content"
              :userName="message.user.name"
              :createdAt="message.createdAt"
              :userAvatarUrl="`${MY_AVATAR_IMAGE_URL}/${message.user.id}`"
              :position="signined_user_id == message.user.id ? 'right' : 'left'"
            />
          </div>
          <!-- <div class="message-contentainer" v-else>
            <div class="messag-content">
              <div class="talker-avatar">
                <CustomAvatarImage
                :imageUri="`${MY_AVATAR_IMAGE_URL}/${message.user.id}`"
                  :size="50"
                />
              </div>
              <div class="balloon1-left">
                <div>{{ message.content }}</div>
              </div>
            </div>
            <div class="message-meta left">
              <p>
                <strong>{{ message.user.name }}</strong> @{{ message.createdAt }}
              </p>
            </div>
          </div> -->
        </div>
      </div>
      <div class="send-message-form">
        <TextButtonForm :text="speak" @submit="onclick" :clearOnClick="true" buttonText="Comment">
        </TextButtonForm>
      </div>
  </div>
</template>

<script setup lang="ts">
import { FetchMessages, Message } from '@/apis/messages'
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import ActionCable from 'actioncable'
import TextButtonForm from '@/components/molecules/TextButtonForm.vue'
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'
import { MY_AVATAR_IMAGE_URL } from '@/apis/accounts'
import { GET_PROFILE } from '@/store/mutation-types'
import MessageWithAvator from '../molecules/ MessageWithAvator.vue'

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
const store = useStore()
const signined_user_id = ref('')

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
  signined_user_id.value = store.getters[GET_PROFILE].id
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
.message-wrapper {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

.message-list {
  overflow-y: scroll;
  height: calc(100% - 60px);
}

.message-contenteiner {
  height: auto;
  width: 100%;
}

.send-message-form {
  padding-bottom: 10px;
  height: 60px;
  bottom: 0;
  position: absolute;
  width: 100%;
}
</style>
