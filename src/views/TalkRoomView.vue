<template>
  <div>
    <TalkRoomList></TalkRoomList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TalkRoomList from '@/components/talk_room/TalkRoomList.vue'

export default defineComponent({
  name: 'TalkRoomView',

  components: {
    TalkRoomList
  },
  data: function () {
    return {
      connection: null,
      messages: [],
      chatChannel: null
    }
  }
})
</script>
