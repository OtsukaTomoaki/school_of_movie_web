<template>
    <div class="signin">
        <IdPassForm />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import IdPassForm from '@/components/IdPassForm.vue'

@Options({
  components: {
    IdPassForm
  }
})
export default class SignIn extends Vue { }
</script>
