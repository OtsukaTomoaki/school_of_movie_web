<template>
    <div class="signin">
        <IdPassForm />
    </div>
    <SigninGoogle />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import IdPassForm from '@/components/IdPassForm.vue'
import SigninGoogle from '@/components/SigninGoogle.vue'

@Options({
  components: {
    IdPassForm,
    SigninGoogle
  }
})
export default class SignIn extends Vue { }
</script>
