import Vue from 'vue'
import axios from 'axios'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import {
  SectionTitle,
  Loading,
  ResetButton,
  SubmitButton,
  RegularButton,
  DangerButton,
  SecondaryButton,
  Card,
  CardImage,
  CardBody,
  Selector,
  TextInput,
  NumberInput,
  ImageInput,
  CardGrid,
  Container,
  Navbar,
} from '@namelivia/vue-components'

Vue.component('Loading', Loading)
Vue.component('SectionTitle', SectionTitle)
Vue.component('ResetButton', ResetButton)
Vue.component('SubmitButton', SubmitButton)
Vue.component('RegularButton', RegularButton)
Vue.component('DangerButton', DangerButton)
Vue.component('SecondaryButton', SecondaryButton)
Vue.component('Card', Card)
Vue.component('CardImage', CardImage)
Vue.component('CardBody', CardBody)
Vue.component('Selector', Selector)
Vue.component('TextInput', TextInput)
Vue.component('NumberInput', NumberInput)
Vue.component('ImageInput', ImageInput)
Vue.component('CardGrid', CardGrid)
Vue.component('Container', Container)
Vue.component('Navbar', Navbar)
Vue.prototype.$axios = axios

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
