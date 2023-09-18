<template>
  <div class="message-content">
    <div class="balloon1-right" v-if="position === 'right'">
      <div>{{ message }}</div>
    </div>
    <div class="talker-avatar">
      <CustomAvatarImage
      :imageUri="userAvatarUrl"
        :size="50"
      />
    </div>
    <div class="balloon1-left" v-if="position === 'left'">
      <div>{{ message }}</div>
    </div>
  </div>
  <div :class="`message-meta ${position}`">
    <p>
      <strong>{{ userName }}</strong> @{{ createdAt }}
    </p>
  </div>
</template>

<script setup lang="ts">
import CustomAvatarImage from '@/components/atoms/CustomAvatarImage.vue'

const props = defineProps({
  message: String,
  userName: String,
  createdAt: String,
  userAvatarUrl: String,
  position: {
    type: String,
    default: 'right'
  }
})

</script>

<style scoped>
.message-content {
  display: flex;
  width: 100%;
}

.message-content .talker-avatar {
  display: inline-block;
  margin: 2px 0 15px 15px;
  padding: 7px 10px;
  width: 80px;
}

.balloon1-left {
  position: relative;
  display: inline-block;
  margin: 2px 0 15px 5px;
  padding: 7px 10px;
  width: calc(100% - 160px);
  min-height: 3em;
  color: #555;
  background: #e0edff;
}

.balloon1-left:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -30px;
  margin-top: -15px;
  border: 15px solid transparent;
  border-right: 15px solid #e0edff;
}

.balloon1-left p {
  margin: 0;
  padding: 0;
}

.balloon1-right {
  position: relative;
  display: inline-block;
  margin: 2px 0 15px 80px;
  padding: 7px 10px;
  width: calc(100% - 120px);
  min-height: 3em;
  color: #555;
  background: #e0edff;
}

.balloon1-right:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -15px;
  border: 15px solid transparent;
  border-left: 15px solid #e0edff;
}

.balloon1-right p {
  margin: 0;
  padding: 0;
}
.message-meta {
  width: 100%;
  display: flex;
  font-size: 12px;
  color: #e0edff;
  right: 0;
}
.message-meta.right p {
  margin: -10px 0 10px auto;
  padding: 0;
}

.message-meta.left p {
  margin: -10px auto 10px 0;
  padding: 0;
}
</style>