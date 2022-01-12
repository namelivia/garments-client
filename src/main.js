import { createApp } from 'vue'
import router from './router'
import { setupI18n, loadLocaleMessages, setI18nLanguage } from './i18n'
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
const i18n = setupI18n()
app.use(router)
await loadLocaleMessages(i18n, import.meta.env.VITE_APP_I18N_LOCALE)
setI18nLanguage(i18n, import.meta.env.VITE_APP_I18N_LOCALE)
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
