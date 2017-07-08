<template>
  <div class="head">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body>
      <div class="total-cont w3-row">
        <div class="w3-col l3 m3 w3-hide-small"></br></div>
        <div class="w3-col l2 m2 s4 w3-center">
          <div class="w3-dropdown-hover">
            <img src="../../assets/logo.png" class="small-icon">
            <div class="w3-dropdown-content">
              <a href="#browser" class="w3-button w3-xlarge"><span class="btn-txt">Browser</span></a>
              <a v-on:click="goToDash" class="w3-button w3-xlarge"><span class="btn-txt">Dashboard</span></a>
              <a href="#about" class="w3-button w3-xlarge"><span class="btn-txt">About</span></a>
            </div>
          </div>
        </div>
        <div class="w3-col l2 m2 s4 w3-center"><span class="large-ic w3-hide-small w3-hide-medium">Indie Chef</span><span class="small-ic w3-hide-large">| IC |</span></div>
        <div class="w3-col l2 m2 s4 w3-center">
          <button class="item-count-btn">{{cartSize}}</button>
          <img v-on:click="goToCart" class="cart-button" src="../../assets/cart.png">
        </div>
        <div class="w3-col l3 m3 w3-hide-small"></br></div>
      </div>
    </body>

  </div>
</template>

<script>

import store from '../../store';

import routing from '../../mixins/routingMixins';

export default {

  name: 'head',

  mixins: [routing],

  data () {

    return {

    }

  },

  computed: {
    cartSize: function() {
      return store.getters.getCartSize;
    }
  }

}

</script>

<style scoped>

</style>