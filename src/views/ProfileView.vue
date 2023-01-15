<template>
  <ProfileForm />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProfileForm from '@/components/ProfileForm.vue'

@Options({
  components: {
    ProfileForm
  }
})
export default class SignIn extends Vue { }
</script>
