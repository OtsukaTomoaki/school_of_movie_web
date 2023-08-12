<template>
  <div class="card-modal-container">
    <slot></slot>
  </div>
  <div class="card-modal-shadow" @click="onclickBackGround"></div>

</template>

<script setup lang="ts">
const emits = defineEmits(['update:show'])

const onclickBackGround = function () {
  emits('update:show', false)
}

</script>

<style scoped>
.card-modal-container {
  --element-width: 400px;

  position: absolute;
  display: block;
  width: var(--element-width);
  margin-left: calc(100% - var(--element-width));
  height: auto;
  background-color: white;
  z-index: 100;
  border-radius: 1%;

  color: #2c3e50;
}
.card-modal-shadow {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
}
</style>
