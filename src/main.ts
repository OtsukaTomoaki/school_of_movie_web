import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import ActionCableVue from 'actioncable-vue'
import Notifications from '@kyvg/vue3-notification'

const actionCableVueOptions = {
  debug: true,
  debugLevel: 'error',
  connectionUrl: 'ws://localhost:3000/cable',
  connectImmediately: true
}

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(ActionCableVue, actionCableVueOptions)
  .use(Notifications)
  .mount('#app')
