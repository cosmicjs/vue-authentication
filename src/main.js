import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store'

Vue.config.productionTip = false

// SET AXIOS AUTH HEADER
// const token = localStorage.getItem('user-token')
// if (token) {
//   axios.defaults.headers.common['Authorization'] = token
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
