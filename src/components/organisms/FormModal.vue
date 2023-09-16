<template>
  <teleport to="body">
    <div class="modal" v-show="props.show" @click="onclick"></div>
    <div class="modal-content" v-show="props.show">
      <slot></slot>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  show: Boolean
})
const show = ref(props.show)
const emits = defineEmits(['close'])

const onclick = function () {
  show.value = false
  emits('close')
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: white;
  width: 90%;
  max-width: 1400px;
  height: auto;
  max-height: 100%;
  border-radius: 20px;
  padding: 20px;
  z-index: 100;
  overflow: scroll;
}
</style>
