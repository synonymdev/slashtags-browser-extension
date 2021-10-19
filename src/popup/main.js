import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Argon from '@/plugins/argon-kit'
Vue.use(Argon);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
