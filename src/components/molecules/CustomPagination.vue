<template>
  <div>
    <!-- <PreviousButton v-if="currentPage > 1" @click="changePage(currentPage - 1)" /> -->
    <PageButton
      v-for="page in totalPages"
      :key="page"
      :pageNumber="page"
      @click="changePage(page)"
    />
    <!-- <NextButton v-if="currentPage < totalPages" @click="changePage(currentPage + 1)" /> -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import PageButton from '@/components/atoms/CustomPageButton.vue'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-changed'])
const currentPage = ref(1)

const changePage = (page: number) => {
  currentPage.value = page
  emit('page-changed', page)
}
onMounted(() => {
  console.log('CustomPagination mounted', props.totalPages)
})
</script>
