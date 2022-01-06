import { createApp } from 'vue'
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
  Navbar,
  Container,
  StyledTable,
  Pagination,
} from '@namelivia/vue-components'

const app = createApp(App)
app.use(router)
app.use(i18n)

app.component('Loading', Loading)
app.component('SectionTitle', SectionTitle)
app.component('ResetButton', ResetButton)
app.component('SubmitButton', SubmitButton)
app.component('RegularButton', RegularButton)
app.component('DangerButton', DangerButton)
app.component('SecondaryButton', SecondaryButton)
app.component('Card', Card)
app.component('CardImage', CardImage)
app.component('CardBody', CardBody)
app.component('Selector', Selector)
app.component('TextInput', TextInput)
app.component('NumberInput', NumberInput)
app.component('ImageInput', ImageInput)
app.component('CardGrid', CardGrid)
app.component('Navbar', Navbar)
app.component('Container', Container)
app.component('StyledTable', StyledTable)
app.component('Pagination', Pagination)

app.mount('#app')
