import BootstrapVue from 'bootstrap-vue'
import { createApp, h } from 'vue'
import axios from 'axios'
import router from './router'
import i18n from './i18n'
import App from './App.vue'

//Vue.prototype.$axios = axios
//Vue.use(BootstrapVue)

const app = createApp({
  i18n,
  render: () => h(App),
})
app.use(router)
app.use(BootstrapVue)
app.provide('$axios', axios)
app.mount('#app')
