<template>
  <MessageList :talkRoomId="talkRoomId"></MessageList>
</template>

<script setup lang="ts">
import MessageList from '@/components/talk_room/MessageList.vue'
import { useRoute } from 'vue-router'

const talkRoomId = useRoute().query.id as string
</script>

<style>
.cheetah-grid>canvas {
  position: relative !important;
}
</style>
