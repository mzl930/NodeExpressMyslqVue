import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login'
import Home from '@/pages/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/hello',
    component: HelloWorld
  },
  {
    path: '/home',
    component: Home
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})