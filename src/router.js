import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Status from './views/Status.vue'
import Transcription from './views/Transcription.vue'

import { Auth } from "aws-amplify";

Vue.use(Router)

var router =  new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/demo', name: 'demo',
      // route level code-splitting
      // this generates a separate chunk (demo.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "demo" */ './views/Demo.vue')
    },
    { path: '/login', name: 'login', component: Login },
    { path: '/status', name: 'status', component: Status },
    { path: '/transcription/:jobId', name: 'transcription', component: Transcription },
  ]
})

router.beforeEach((to, from, next) => {
  
  // to prevent infinite loop of login redirection
  if(to.path === '/login')  next()

  Auth.currentAuthenticatedUser().then((user) => {
    if(to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }).catch(error => {
    next('/login')
  })
})

export default router