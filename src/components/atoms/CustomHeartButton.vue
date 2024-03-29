<template>
  <div class="heart-button-container">
    <input type="checkbox" class="checkbox" :id="id" v-model="isLiked" @change="toggleLike"/>
    <label :for="id">
      <svg class="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
        <g class="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
          <path class="heart"
            d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
            fill="#AAB8C2" />
          <circle class="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />

          <g class="grp7" opacity="0" transform="translate(7 6)">
            <circle class="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
            <circle class="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
          </g>

          <g class="grp6" opacity="0" transform="translate(0 28)">
            <circle class="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
            <circle class="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
          </g>

          <g class="grp3" opacity="0" transform="translate(52 28)">
            <circle class="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
            <circle class="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
          </g>

          <g class="grp2" opacity="0" transform="translate(44 6)">
            <circle class="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
            <circle class="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
          </g>

          <g class="grp5" opacity="0" transform="translate(14 50)">
            <circle class="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
            <circle class="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
          </g>

          <g class="grp4" opacity="0" transform="translate(35 50)">
            <circle class="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
            <circle class="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
          </g>

          <g class="grp1" opacity="0" transform="translate(24)">
            <circle class="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
            <circle class="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
          </g>
        </g>
      </svg>
    </label>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  isLiked: {
    type: Boolean,
    required: false,
    default: false
  },
  id: {
    type: String,
    required: false,
    default: Math.random().toString(36).slice(-8)
  }
})
const emit = defineEmits(['click', 'change', 'input'])

const isLiked = ref(props.isLiked) // いいねの状態を保持

const toggleLike = (event: Event) => {
  emit('click', event, isLiked.value)
  emit('change', event, isLiked.value)
  emit('input', event, isLiked.value)
}

watch(() => props.isLiked, (newVal) => {
  isLiked.value = newVal;
});

</script>

<style scoped>
.heart-button-container {
  display: inline-block;
  overflow: hidden;
}
.heart-svg {
  cursor: pointer;
  overflow: visible;
  width: 40px;
  margin-top: 22px;
  margin-left: 22px;
}

svg .heart {
  transform-origin: center;
  animation: animateHeartOut .3s linear forwards;
}

svg .main-circ {
  transform-origin: 29.5px 29.5px;
}

.checkbox {
  display: none;
}

.checkbox:checked+label svg .heart {
  transform: scale(0.2);
  fill: #E2264D;
  animation: animateHeart .3s linear forwards .25s;
}

.checkbox:checked+label svg .main-circ {
  transition: all 2s;
  animation: animateCircle .3s linear forwards;
  opacity: 1;
}

.checkbox:checked+label svg .grp1 {
  opacity: 1;
  transition: .1s all .3s;
}

.checkbox:checked+label svg .grp1 .oval1 {
  transform: scale(0) translate(0, -30px);
  transform-origin: 0 0 0;
  transition: .5s transform .3s;
}

.checkbox:checked+label svg .grp1 .oval2 {
  transform: scale(0) translate(10px, -50px);
  transform-origin: 0 0 0;
  transition: 1.5s transform .3s;
}

.checkbox:checked+label svg .grp2 {
  opacity: 1;
  transition: .1s all .3s;
}

.checkbox:checked+label svg .grp2 .oval1 {
  transform: scale(0) translate(30px, -15px);
  transform-origin: 0 0 0;
  transition: .5s transform .3s;
}

.checkbox:checked+label svg .grp2 .oval2 {
  transform: scale(0) translate(60px, -15px);
  transform-origin: 0 0 0;
  transition: 1.5s transform .3s;
}

.checkbox:checked+label svg .grp3 {
  opacity: 1;
  transition: .1s all .3s;
}

.checkbox:checked+label svg .grp3 .oval1 {
  transform: scale(0) translate(30px, 0px);
  transform-origin: 0 0 0;
  transition: .5s transform .3s;
}

.checkbox:checked+label svg .grp3 .oval2 {
  transform: scale(0) translate(60px, 10px);
  transform-origin: 0 0 0;
  transition: 1.5s transform .3s;
}

.checkbox:checked+label svg .grp4 {
  opacity: 1;
  transition: .1s all .3s;
}

.checkbox:checked+label svg .grp4 .oval1 {
  transform: scale(0) translate(30px, 15px);
  transform-origin: 0 0 0;
  transition: .5s transform .3s;
}

.checkbox:checked+label svg .grp4 .oval2 {
  transform: scale(0) translate(40px, 50px);
  transform-origin: 0 0 0;
  transition: 1.5s transform .3s;
}

.checkbox:checked+label svg .grp5 {
  opacity: 1;
  transition: .1s all .3s;
}

.checkbox:checked+label svg .grp5 .oval1 {
  transform: scale(0) translate(-10px, 20px);
  transform-origin: 0 0 0;
  transition: .5s transform .3s;
}

.checkbox:checked+label svg .grp5 .oval2 {
  transform: scale(0) translate(-60px, 30px);
  transform-origin: 0 0 0;
  transition: 1.5s transform .3s;
}

.checkbox:checked+label svg .grp6 {
  opacity: 1;
  transition: .1s all .3s;
}

.checkbox:checked+label svg .grp6 .oval1 {
  transform: scale(0) translate(-30px, 0px);
  transform-origin: 0 0 0;
  transition: .5s transform .3s;
}

.checkbox:checked+label svg .grp6 .oval2 {
  transform: scale(0) translate(-60px, -5px);
  transform-origin: 0 0 0;
  transition: 1.5s transform .3s;
}

.checkbox:checked+label svg .grp7 {
  opacity: 1;
  transition: .1s all .3s;
}

.checkbox:checked+label svg .grp7 .oval1 {
  transform: scale(0) translate(-30px, -15px);
  transform-origin: 0 0 0;
  transition: .5s transform .3s;
}

.checkbox:checked+label svg .grp7 .oval2 {
  transform: scale(0) translate(-55px, -30px);
  transform-origin: 0 0 0;
  transition: 1.5s transform .3s;
}

.checkbox:checked+label svg .grp2 {
  opacity: 1;
  transition: .1s opacity .3s;
}

.checkbox:checked+label svg .grp3 {
  opacity: 1;
  transition: .1s opacity .3s;
}

.checkbox:checked+label svg .grp4 {
  opacity: 1;
  transition: .1s opacity .3s;
}

.checkbox:checked+label svg .grp5 {
  opacity: 1;
  transition: .1s opacity .3s;
}

.checkbox:checked+label svg .grp6 {
  opacity: 1;
  transition: .1s opacity .3s;
}

.checkbox:checked+label svg .grp7 {
  opacity: 1;
  transition: .1s opacity .3s;
}

@keyframes animateCircle {
  40% {
    transform: scale(10);
    opacity: 1;
    fill: #DD4688;
  }

  55% {
    transform: scale(11);
    opacity: 1;
    fill: #D46ABF;
  }

  65% {
    transform: scale(12);
    opacity: 1;
    fill: #CC8EF5;
  }

  75% {
    transform: scale(13);
    opacity: 1;
    fill: transparent;
    stroke: #CC8EF5;
    stroke-width: .5;
  }

  85% {
    transform: scale(17);
    opacity: 1;
    fill: transparent;
    stroke: #CC8EF5;
    stroke-width: .2;
  }

  95% {
    transform: scale(18);
    opacity: 1;
    fill: transparent;
    stroke: #CC8EF5;
    stroke-width: .1;
  }

  100% {
    transform: scale(19);
    opacity: 1;
    fill: transparent;
    stroke: #CC8EF5;
    stroke-width: 0;
  }
}

@keyframes animateHeart {
  0% {
    transform: scale(0.2);
  }

  40% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes animateHeartOut {
  0% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
}</style>
