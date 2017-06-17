//Vue Engine
import Vue from 'vue'
import App from './App'

//Optional Vue Services
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

//Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/w3.css'

//App Components
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Browser from './components/Browser.vue'
import LoginSuccess from './components/LoginSuccess.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.http.options.crossOrigin = true

const routers = [
  { path: '/login', 
    component: Login },
  { path: '/',
    component: Home },
  { path: '/register', 
    component: Register },
  { path: '/browser', 
    component: Browser },
  { path: '/success',
    component: LoginSuccess }
]

const router = new VueRouter({
  routes: routers
});

Vue.component('main-head', {
  template: '<div class="w3-container w3-blue w3-border" style="margin-bottom: 85px"><h1 id="logo-text" style="padding: 10px;font-size: 35px;font-family: Verdana;">Indie Chef</h1></div>'
})

Vue.component('main-tail', {
  template: '<div class="w3-container w3-white w3-center"><h1 id="logo-text" style="padding: 15px;font-size: 15px;font-family: Verdana;">Copyright © 2017 by Indie Chef.</h1></div>'
})

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const store = new Vuex.Store({

  state: {
    isLoggedIn: !!localStorage.getItem("token")
  },

  mutations: {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    }
  },

  actions: {

    login({ commit }, newToken) {
      commit(LOGIN); // show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem("token", newToken);
          commit(LOGIN_SUCCESS);
          resolve();
        }, 1000);
      });
    },

    logout({ commit }) {
      localStorage.removeItem("token");
      commit(LOGOUT);
    }

  },

  getters: {

    isLoggedIn: state => {
      return state.isLoggedIn
    },

    getToken: function() {
      return localStorage.getItem("token");
    }

  }

});

const app = new Vue({
  el: '#app', 
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')


