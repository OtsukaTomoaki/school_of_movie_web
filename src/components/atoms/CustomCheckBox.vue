<template>
  <div class="custom-checkbox-container">
    <input type="checkbox" :id="id" :checked="checked" @change="emitChecked" :value="id">
    <label :for="id" class="checkbox-label">
      <div v-if="checked">
        <vue-feather type="check" class="check-icon"></vue-feather>
      </div>
    </label>
    <div v-if="text" class="checkbox-text">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  id: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: true
  },
  text : {
    type: String,
    required: false
  }
})

const emit = defineEmits(['change', 'input'])

const emitChecked = (e: Event) => {
  console.log('emitChecked', (e.target as HTMLInputElement).checked)
  emit('change', (e.target as HTMLInputElement).checked)
  emit('input', e)
}
</script>

<style scoped>
.custom-checkbox-container {
  display: flex;
  justify-content: left;
  align-items: left;
}
.custom-checkbox-container .checkbox-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border: 2px solid #2c3e50;
  border-radius: 3px;
  margin-top: 3px;
  margin-right: 5px;
}
.custom-checkbox-container .checkbox-label:hover {
  background-color: #F0F0F0;
  cursor: pointer;
}

.check-icon {
  margin-top: 3px;
  color: #2c3e50;
  animation-name: fadein;
  animation-duration: 0.3s;
}

.checkbox-text {
  margin-left: 1px;
  color: #2c3e50;
}
.custom-checkbox-container input[type="checkbox"] {
  display: none;
}

@keyframes fadein{
  from {
    opacity: 0;
    transform: translateX(-3px);
  }
  to {
    opacity: 1;
    transform: translateX(0px)
  }
}
</style>