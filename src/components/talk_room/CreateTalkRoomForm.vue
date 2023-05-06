<template>
  <v-sheet width="300" class="mx-auto">
    <v-form validate-on="submit" @submit.prevent="submit">
      <v-text-field v-model="name" label="トークルーム名"/>
      <v-text-field v-model="describe" label="概要"/>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CreateTalkRooms, TalkRoomBodyToCreate } from '@/apis/talk_rooms'

export default defineComponent({
  name: 'CreateTalkRoomForm'
})
</script>

<script setup lang="ts">
const name = ref('')
const describe = ref('')
const status = ref(1)

const submit = async function () {
  const body: TalkRoomBodyToCreate = {
    name: name.value,
    describe: describe.value,
    status: status.value
  }
  const createdTalkRoom = await CreateTalkRooms(body)
  console.log(createdTalkRoom)
}
</script>
