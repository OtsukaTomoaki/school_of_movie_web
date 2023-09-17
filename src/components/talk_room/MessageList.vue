<!-- eslint-disable no-redeclare -->
<template>
  <div class="message-wrapper">
      <div ref="messageList" class="message-list">
        <div v-for="message in messages" v-bind:key="message.id">
          <div class="message-contenteiner" v-if="signined_user_id == message.user.id">
            <div class="messag-content">
              <div class="balloon1-right">
                <div>{{ message.content }}</div>
              </div>
              <div class="talker-avatar">
                <CustomAvatarImage
                :imageUri="`${MY_AVATAR_IMAGE_URL}/${message.user.id}`"
                  :size="50"
                />
              </div>
            </div>
            <div class="message-meta right">
              <p>
                <strong>{{ message.user.name }}</strong> @{{ message.createdAt }}
              </p>
            </div>
          </div>
          <div class="message-contentainer" v-else>
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
import { useStore } from 'vuex'
import ActionCable from 'actioncable'
import TextButtonForm from '@/components/molecules/TextButtonForm.vue'
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'
import { MY_AVATAR_IMAGE_URL } from '@/apis/accounts'
import { GET_PROFILE } from '@/store/mutation-types'

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
const signined_user_id = store.getters[GET_PROFILE].id

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

.messag-content {
  display: flex;
  width: 100%;
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
  width: calc(100% - 120px);
  min-height: 3em;
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

.balloon1-right {
  position: relative;
  display: inline-block;
  margin: 2px 20px 15px 60px;
  padding: 7px 10px;
  width: calc(100% - 120px);
  min-height: 3em;
  color: #555;
  font-size: 16px;
  background: #e0edff;
}

.balloon1-right:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -15px;
  border: 15px solid transparent;
  border-left: 15px solid #e0edff;
}

.balloon1-right p {
  margin: 0;
  padding: 0;
}
.message-meta {
  width: 100%;
  display: flex;
  font-size: 12px;
  color: #e0edff;
  right: 0;
}
.message-meta.right p {
  margin: -10px 0 10px auto;
  padding: 0;
}

.message-meta.left p {
  margin: -10px auto 10px 0;
  padding: 0;
}
</style>
