import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {
  createProvider
} from './vue-apollo'
import i18n from './i18n'
import VueMeta from 'vue-meta'
import ga from './plugins/ga.js'

Vue.config.productionTip = false

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(ga)

new Vue({
  apolloProvider: createProvider(),
  i18n,
  render: h => h(App)
}).$mount('#app')