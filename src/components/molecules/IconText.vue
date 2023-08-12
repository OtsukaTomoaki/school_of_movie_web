<template>
  <div class="icon-text-wrapper">
    <div class="icon-content">
      <vue-feather :type="type" class="check-icon"></vue-feather>
    </div>
    <div class="text-content">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.icon-text-wrapper {
  display: flex;
  justify-content: left;
  align-items: left;
}
.icon-content {

}
.text-content {
  padding-left: 10px;
}
</style>
