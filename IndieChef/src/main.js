//Vue Engine
import Vue from 'vue'
import App from './App'

//Optional Vue Services
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/w3.css';

//App Components
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

const routers = [
  { path: '/login', 
    component: Login },
  { path: '/',
    component: Home },
  { path: '/register', 
    component: Register }
]

const router = new VueRouter({
  routes: routers
});

Vue.component('main-head', {
  template: '<div class="w3-container w3-blue w3-border" style="margin-bottom: 85px"><h1 id="logo-text" style="padding: 10px;font-size: 35px;font-family: Verdana;">Indie Chef</h1></div>'
})

Vue.component('main-tail', {
  template: '<div class="w3-container w3-white w3-center"><h1 id="logo-text" style="padding: 15px;font-size: 15px;font-family: Verdana;">Copyright © 2017 by Indie Chef.</h1></div>"'
})

new Vue({
  el: '#app', 
  router: router,
  render: h => h(App)
})


