<template>
  <div class="text-button-component">
    <CustomSearchText v-model="searchQuery"></CustomSearchText>
    <CustomButton :text="buttonText" @click="submitSearch" v-bind:primary='true'/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import CustomSearchText from '@/components/atoms/CustomSearchText.vue'
import CustomButton from '@/components/atoms/CustomButton.vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: false,
    default: 'Search'
  },
  clearOnClick: {
    type: Boolean,
    required: false,
    default: false
  }
})
onMounted(() => {
  console.log('SearchForm mounted', props.text)
})

const searchQuery = ref(props.text)
const emits = defineEmits<{(e: 'submit', text: string): void}>()

const submitSearch = () => {
  console.log('submitSearch', searchQuery.value)
  emits('submit', searchQuery.value)
  if (props.clearOnClick) {
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.text-button-component {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 0;
  background-color: #F0F0F0;
  font-family: 'Caveat', cursive;
}
</style>
