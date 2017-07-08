import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const LOGIN = "LOGIN",
      LOGIN_SUCCESS = "LOGIN_SUCCESS",
      LOGOUT = "LOGOUT",
      AUTH = "AUTH",
      AUTH_SUCCESS = "AUTH_SUCCESS",
      ADDING_ITEM = "ADDING_ITEM",
      ADDED_ITEM = "ADDED_ITEM",
      REMOVING_ITEM = "REMOVING_ITEM",
      REMOVED_ITEM = "REMOVED_ITEM";

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
    },
    [ADDING_ITEM](state) {
      state.pending = true;
    },
    [ADDED_ITEM](state) {
      state.pending = false;
    },
    [REMOVING_ITEM](state) {
      state.pending = true;
    },
    [REMOVED_ITEM](state) {
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
          localStorage.setItem("id", vendor._id);
          localStorage.setItem("name", vendor.name);
          localStorage.setItem("creatorId", vendor._creatorId);
          commit(AUTH_SUCCESS);
          resolve();
        }, 1000);
      });
    },

    addCartItem({ commit }, item) {
      commit(ADDING_ITEM);
      return new Promise(resolve => {
        setTimeout(() => {

          var cart;
          if(JSON.parse(localStorage.getItem("cart")) !== null && typeof JSON.parse(localStorage.getItem("cart"))[0] !== 'undefined') {
            cart = JSON.parse(localStorage.getItem("cart"));
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
          else
            cart = [item];

          localStorage.setItem("cart", JSON.stringify(cart));
          
          commit(ADDED_ITEM);
          resolve();
        }, 50);
      });
    },

    removeFromCart({ commit }, item) {
      commit(REMOVING_ITEM);
      return new Promise(resolve => {
        setTimeout(() => {

          var myCart = JSON.parse(localStorage.getItem("cart")),
              location;

          myCart.forEach(function(obj, index) {

            if (obj._id === item._id) {
              location = index;
              myCart.splice(location, 1);
              localStorage.setItem("cart", JSON.stringify(myCart));
              commit(REMOVED_ITEM);
              resolve();
            }

          });
          
        }, 50);

      });
    }

  },

  getters: {

    isLoggedIn: state => {
      return state.isLoggedIn;
    },

    getCart: function() {
      if(JSON.parse(localStorage.getItem("cart")) !== null)
        return JSON.parse(localStorage.getItem("cart"));
      else
        return [];
    },

    getCartSize: function() {
      if(JSON.parse(localStorage.getItem("cart")) === null)
        return 0;
      else
        return JSON.parse(localStorage.getItem("cart")).length;
    },

    getToken: function() {
      return localStorage.getItem("token");
    },

    vendorName: function() {
      return localStorage.getItem("name");
    },

    vendorId: function() {
      return localStorage.getItem("id")
    },

    creatorId: function() {
      return localStorage.getItem("creatorId")
    }

  }

});

export default store;