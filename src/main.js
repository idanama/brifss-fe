import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { createProvider } from './vue-apollo'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  i18n,
  render: h => h(App)
}).$mount('#app')