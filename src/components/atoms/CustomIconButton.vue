<template>
  <div class="custom-icon-button-container">
    <button>
      <vue-feather :type="type"></vue-feather>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CustomButton'
}
</script>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.custom-icon-button-container :hover {
  opacity: 0.8;
}
</style>
