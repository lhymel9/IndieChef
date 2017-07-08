//Vue Engine
import Vue from 'vue';
import App from './App';
import store from './store';

//Optional Vue Services
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import Dropzone from 'vue2-dropzone';

//Styles
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/w3.css';
import './assets/css/dashboard.css';
import './assets/css/homepage.css';
import './assets/css/item.css';
import './assets/css/head.css';
import './assets/css/success.css';
import './assets/css/cart.css';

//App Components
import Login from './components/preLogin/Login.vue';
import Home from './components/preLogin/Home.vue';
import Register from './components/preLogin/Register.vue';
import Browser from './components/Browser.vue';
import LoginSuccess from './components/postLogin/LoginSuccess.vue';
import Dashboard from './components/postLogin/Dashboard.vue';
import Item from './components/Item.vue';
import Cart from './components/Cart.vue';
import Head from './components/reuseables/Head.vue';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Dropzone);

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
    component: Dashboard },
  { path: '/cart',
    component: Cart},
  { path: '/item/id=:id',
    component: Item}
];

const router = new VueRouter({
  routes: routers
});

Vue.component('main-tail', {
  template: '<div class="w3-container w3-white w3-center"><h1 id="logo-text" style="padding: 15px;font-size: 15px;font-family: Verdana;">Copyright © 2017 by Indie Chef.</h1></div>'
});

Vue.component('dropzone', Dropzone);

Vue.component('main-head', Head)

const app = new Vue({
  el: '#app', 
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app');


