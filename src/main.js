import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import SectionTitle from './components/SectionTitle.vue'
import Loading from './components/Loading.vue'

Vue.prototype.$axios = axios
Vue.use(BootstrapVue)
Vue.component('SectionTitle', SectionTitle)
Vue.component('Loading', Loading)

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
