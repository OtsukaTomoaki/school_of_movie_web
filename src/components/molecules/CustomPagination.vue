<template>
  <div>
    <!-- <PreviousButton v-if="currentPage > 1" @click="changePage(currentPage - 1)" /> -->
      <Paginate
      :page-count="totalPages"
      :prev-text="'<'"
      :next-text="'>'"
      :click-handler="changePage"
      :container-class="'pagination justify-content-center'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-class="'page-item'"
      :next-link-class="'page-link'"
      :first-last-button="true"
      :first-button-text="'<<'"
      :last-button-text="'>>'"
    ></Paginate>
    <!-- <NextButton v-if="currentPage < totalPages" @click="changePage(currentPage + 1)" /> -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import PageButton from '@/components/atoms/CustomPageButton.vue'
import Paginate from 'vuejs-paginate-next'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-changed'])
const currentPage = ref(1)

const changePage = (page: number) => {
  console.log('changePage', page)
  if (page < 1 || page !== props.totalPages) {
    currentPage.value = page
    emit('page-changed', page)
  }
}
onMounted(() => {
  console.log('CustomPagination mounted', props.totalPages)
})
</script>

<style>
.page-item {
  cursor: pointer;
  display: inline-block;
  width: auto;
  padding: 5px 10px;
  margin: 0 5px;
}

.page-item.active {
  background-color: #ccc;
}

.page-item:hover {
  background-color: #ccc;
}
</style>
