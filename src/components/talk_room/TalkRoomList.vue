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
      @click="(event: Event) => onClickRecord(event, $router)"
    />
    </c-grid>
  </div>
  <div class="grid-sample"></div>
</template>

<script lang="ts">
import * as cGridAll from 'vue-cheetah-grid'
import { FetchTalkRooms, TalkRoom } from '@/apis/talk_rooms'
import { Router, useRouter } from 'vue-router'

interface Grid {
  records: TalkRoom[];
}

export default {
  name: 'TalkRoomList',
  components: {
    ...cGridAll
  },
  setup () {
    const router = useRouter()
    return router
  },
  data: function () {
    const record : Grid = {
      records: []
    }
    return record
  },
  async mounted (this: Grid) {
    const talkRooms = await FetchTalkRooms()
    this.records = talkRooms
  },
  methods: {
    onClickRecord: function (event: any, router: Router) {
      router.push(`/talk_rooms/message?id=${event.id}`)
    }
  }
}
</script>

<style>
.cheetah-grid>canvas {
  position: relative !important;
}
</style>
