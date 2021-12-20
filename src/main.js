import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import SectionTitle from './components/SectionTitle.vue'

Vue.prototype.$axios = axios
Vue.use(BootstrapVue)
Vue.component('SectionTitle', SectionTitle)

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
