<template>
  <div>
    <input type="button" value="作成" v-on:click=onclick />
    <FormModal v-bind:show=show @close="onclose">
      <CreateTalkRoomForm></CreateTalkRoomForm>
    </FormModal>
    <Suspense>
      <TalkRoomList v-bind:talkRooms=state.talkRooms></TalkRoomList>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import TalkRoomList from '@/components/talk_room/TalkRoomList.vue'
import CreateTalkRoomForm from '@/components/talk_room/CreateTalkRoomForm.vue'
import FormModal from '@/components/FormModal.vue'
import { FetchTalkRooms, TalkRoom } from '@/apis/talk_rooms'

export default defineComponent({
  name: 'TalkRoomView',

  components: {
    TalkRoomList,
    CreateTalkRoomForm,
    FormModal
  },
  data: function () {
    return {
    }
  }
})
</script>

<script setup lang="ts">
const state = reactive({
  talkRooms: []
})
onMounted(async () => {
  state.talkRooms = await FetchTalkRooms()
  console.log(state.talkRooms)
})

const show = ref(false)

const onclick = function () {
  show.value = true
}
const onclose = function () {
  show.value = false
}
</script>
