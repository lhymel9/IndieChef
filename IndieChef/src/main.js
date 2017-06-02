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


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
