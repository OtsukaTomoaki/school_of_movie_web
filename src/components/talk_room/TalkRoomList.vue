<template>
  <div style="height: 500px; solid 1px #ddd;">
    <c-grid :data="records"
    :frozen-col-count="1"
    position="position: absolute">
      <c-grid-column field="id"
      width="auto">
      id
      </c-grid-column>
      <c-grid-column field="name"
      width="auto">
      name
      </c-grid-column>
      <c-grid-column field="describe"
      width="auto">
      describe
      </c-grid-column>
      <c-grid-button-column
      caption="SHOW REC"
      width="120"
      @click="(event: TalkRoom) => onClickRecord(event)"
    />
    </c-grid>
  </div>
  <div class="grid-sample"></div>
</template>

<script lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import * as cGridAll from 'vue-cheetah-grid'
import { FetchTalkRooms, TalkRoom } from '@/apis/talk_rooms'
import { useRouter } from 'vue-router'

interface Grid {
  records: TalkRoom[];
}

export default {
  name: 'TalkRoomList',
  components: {
    ...cGridAll
  }
}
</script>

<script setup lang="ts">
const router = useRouter()
const props = defineProps({
  talkRooms: []
})
const records = ref(props.talkRooms)

onMounted(async function (this: Grid) {
  // console.log('mounted!!Q!')
  // console.log(props.talkRooms)
  setTimeout(() => { records.value = props.talkRooms }, 1000)
})
const onClickRecord = function (event: TalkRoom) {
  router.push(`/talk_rooms/message?id=${event.id}`)
}
</script>

<style>
.cheetah-grid>canvas {
  position: relative !important;
}
</style>
