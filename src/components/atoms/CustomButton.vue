<template>
  <button class="search-button" @click="$emit('click')" v-bind:class="primary ? 'primary' : 'normal'">{{ text }}</button>
</template>

<script lang="ts">
import { defineProps } from 'vue'
export default {
  name: 'CustomButton'
}
</script>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  primary: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.search-button {
  /* ボタンのスタイルを定義します。 */
  background-color: #F9D949;
  border: 1px solid #F0F0F0;
  color: #3C486B;
  border-radius: 25px;
  padding: 10px 15px;
}
.primary {
  /* プライマリーボタンのスタイルを定義します。 */
  background-color: #F9D949;
  border: 1px solid #F0F0F0;
  color: #3C486B;
}

.normal {
  /* ノーマルボタンのスタイルを定義します。 */
  background-color: #F0F0F0;
  border: 1px solid #F0F0F0;
  color: #3C486B;
}
</style>
