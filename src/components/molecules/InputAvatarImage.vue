<template>
  <div class="avatar-image-content" @click="onClickImage">
    <CustomAvatarImage
      :imageUri="currentImageUri"
      :size="size"
    />
    <input
      type="file"
      class="avatar-input"
      @change="onChangeFile"
      ref="fileInput"
    />
    <div class="avatar-input-message">
      <!-- todo: あとでデザインを考える -->
      click to change image
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'

const props = defineProps({
  imageUri: {
    type: String,
    required: true,
    default: ''
  },
  size: {
    type: Number,
    required: false,
    default: 80
  },
  returnUriFormat: {
    type: String,
    required: false,
    default: 'base64'
  }
})

const currentImageUri = ref(props.imageUri)
const fileInput = ref(null);
const emit = defineEmits(['change'])

const onClickImage = () => {
  fileInput.value.click()
}

const onChangeFile = async (event: any) => {
  const file = event.target.files[0]
  await convertBase64(file)
}

const convertBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      updateAvaterImage(fileReader.result as string)
      emitUpdateImage(file, fileReader.result as string)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const updateAvaterImage = async (base64: string) => {
  currentImageUri.value = base64
}

const emitUpdateImage = (file: File, base64: string) => {
  if (props.returnUriFormat === 'base64') {
    emit('change', base64)
  } else {
    emit('change', file)
  }
}
</script>

<style scoped>
.avatar-image-content {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  background-color: #2c3e50;
}
.avatar-image-content :hover {
  cursor: pointer;
}

.avatar-image-content:hover .avatar-input-message {
  opacity: .8;
  margin-bottom: 0px;
}

.avatar-input {
  display: none;
}

.avatar-input-message {
  position: absolute;
  display: inline-block;
  font-size: 12px;
  color: #2c3e50;
  text-align: center;
  background-color: #2c3e50;
  color: white;
  opacity: 0;
  width: 100%;
  margin-left: -50%;
  transform: translateX(-50%);
  bottom: 0;
  transition: 0.5s;
  margin-bottom: -10px;
}

</style>