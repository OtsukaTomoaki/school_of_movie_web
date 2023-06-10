<template>
  <button @click="emitPageNumber" :class="{'is-selected': isSelected}">
    {{ pageNumber }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  pageNumber: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['click'])

const emitPageNumber = () => {
  emit('click', props.pageNumber)
}

const isSelected = ref(false)
// const isSelected = router.currentRoute.value.query.page && Number(router.currentRoute.value.query.page) === props.pageNumber

watchEffect(() => {
  isSelected.value = router.currentRoute.value.query.page && Number(router.currentRoute.value.query.page) === props.pageNumber
})

</script>

<style scoped>
button {
  background-color: aqua;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 5px 10px;
}
.is-selected {
  background-color: #ccc;
}
</style>
