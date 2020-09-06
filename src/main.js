import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import {
  createProvider
} from './vue-apollo'
import i18n from './i18n'
import VueMeta from 'vue-meta'
import VueGtag from "vue-gtag";


Vue.config.productionTip = false

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(VueGtag, {
  config: {
    id: "G-00PD1SESM9"
  }
});

new Vue({
  apolloProvider: createProvider(),
  i18n,
  render: h => h(App)
}).$mount('#app')