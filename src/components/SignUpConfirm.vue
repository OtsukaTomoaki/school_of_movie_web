<template>
  <div class="profile-container">
    <v-card dark class="profile-content">
      <label class="menu-title">signup</label>

      <v-divider class="mx-3"></v-divider>

      <div class="profile-form">
        <div class="profile-avatar-image">
          <CustomAvatarImage
          :imageUri="image"
          :size="120"
          />
        </div>

        <div class="body-1 mb-1">
          {{email}}
        </div>
        <v-divider class="mx-3"></v-divider>
        <v-text-field>
          {{name}}
        </v-text-field>
      </div>

      <CustomButton text="Submit!" @click="onclick" v-bind:primary='true'/>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import CustomButton from '@/components/atoms/CustomButton.vue'
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'

defineProps({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  onclick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  }
})
</script>

<style scoped>
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
}

.profile-content {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
}

.profile-form {
  margin-top: 15px;
}
.profile-avatar-image {
  width: 100%;
  height: auto;
}

.menu-title {
  font-size: 30px;
  font-weight: bold;
}
</style>
