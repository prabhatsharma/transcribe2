import Vue from 'vue'

import moment from 'moment'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

Vue.filter('date', function(value) {
  // console.log(typeof(value))
  if (value) {
    // var sample = "Wed Oct 02 2019 06:11:16 GMT-0700 (Pacific Daylight Time)"
    var sample = String(value)
    sample = sample.substring(0, sample.length-23)
    return sample
    // return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})//.$mount('#app')
