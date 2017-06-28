//Vue Engine
import Vue from 'vue';
import App from './App';
import store from './store';

//Optional Vue Services
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

//Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/w3.css'

//App Components
import Login from './components/preLogin/Login.vue';
import Home from './components/preLogin/Home.vue';
import Register from './components/preLogin/Register.vue';
import Browser from './components/Browser.vue';
import LoginSuccess from './components/postLogin/LoginSuccess.vue';
import Dashboard from './components/postLogin/Dashboard.vue';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.http.options.crossOrigin = true;

const routers = [
  { path: '/login', 
    component: Login },
  { path: '/',
    component: Home },
  { path: '/register', 
    component: Register },
  { path: '/browser', 
    component: Browser },
  { path: '/success/:id',
    component: LoginSuccess },
  { path: '/dashboard/usr=:id&tok=:token',
    component: Dashboard }
];

const router = new VueRouter({
  routes: routers
});

Vue.component('main-head', {
  template: "<div class='w3-container' style='background-color: #cccccc'>" +
              "<span style='font-size: 35px;font-family: Verdana;color: #FF3B3F; font-weight: bold'><a href='#' class='w3-button' style='color:#FF3B3F; background-color:Transparent'><i class='material-icons w3-jumbo' style='margin-top:8px;'>home</i></a><span style='margin-left:20px'>Indie Chef</span></span>" +
            "</div>"
});

Vue.component('main-tail', {
  template: '<div class="w3-container w3-white w3-center"><h1 id="logo-text" style="padding: 15px;font-size: 15px;font-family: Verdana;">Copyright © 2017 by Indie Chef.</h1></div>'
});

const app = new Vue({
  el: '#app', 
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app');


