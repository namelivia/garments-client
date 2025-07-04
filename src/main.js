import { createApp } from 'vue'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import Toast from 'vue-toastification'
import * as components from '@namelivia/vue-components'
const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(Toast)

// Register all the components from @namelivia/vue-components
Object.entries(components).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')
