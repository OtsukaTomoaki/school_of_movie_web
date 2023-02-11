<template>
  <MessageList :talkRoomId="talkRoomId"></MessageList>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MessageList from '@/components/talk_room/MessageList.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MessageView',

  components: {
    MessageList
  },
  setup () {
    const talkRoomId = useRoute().query.id as string

    return {
      talkRoomId: talkRoomId
    }
  }
})
</script>

<style>
.cheetah-grid>canvas {
  position: relative !important;
}
</style>
