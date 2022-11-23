<template>
  <div class="signin">
    Googleアカウントでサインアップ
    <div>
        <label>email:</label>
        {{email}}
    </div>
    <div>
        <label>name:</label>
        {{name}}
    </div>
    <input type="button" value="サインアップ" v-on:click="onclick"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ref, defineComponent } from 'vue'

export default {
  name: 'SignUpConfirm',
  props: {
    email: String,
    name: String,
    onclick: Object
  },
  setup (this: any, props: any) {
    console.log(props.email)
  }
}
</script>
