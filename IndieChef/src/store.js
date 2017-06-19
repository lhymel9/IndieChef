import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const AUTH = "AUTH";
const AUTH_SUCCESS = "AUTH_SUCCESS";

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
      state.authenticated = false;
    },
    [AUTH](state) {
      state.pending = true;
    },
    [AUTH_SUCCESS](state) {
      state.authenticated = true;
      state.pending = false;
    }
  },

  actions: {

    login({ commit }, newToken) {
      commit(LOGIN);
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
    },

    setVendor({ commit }, vendor) {
      commit(AUTH);
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem("name", vendor.name);
          commit(AUTH_SUCCESS);
          resolve();
        }, 1000);
      });
    }

  },

  getters: {

    isLoggedIn: state => {
      return state.isLoggedIn;
    },

    getToken: function() {
      return localStorage.getItem("token");
    },

    vendorName: function() {
      return localStorage.getItem("name");
    },

  }

});

export default store;