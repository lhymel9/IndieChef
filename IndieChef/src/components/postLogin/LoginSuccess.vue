<template>
  <div class="success">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body>
      <main-head></main-head>
      <div class="w3-row" style="background-color:#D8D8D8; padding-top:90px">
        <div class="w3-col l3 md2 s1 w3-center"></br></div>
        <div class="w3-col l6 md8 s10 w3-center" style="margin-bottom:480px">
          <div class="w3-card-4 w3-padding w3-round" style="background-color:#e6e6e6; border: 2px solid #015249">
            <h1 id="hello-banner">Hello, {{firstName}}.</h1>
            <p id="proceed-parag">Thanks for logging in, please proceed to home or your vendor dashboard.</p>
            <div><button v-on:click="gotToHome" class="su-button w3-margin">Home</button><button v-on:click="goToDash" class="su-button w3-margin">Dashboard</button></div>
          </div>
        </div>
        <div class="w3-col l3 md2 s1 w3-center"></br></div>
      </div>
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>

import routing from '../../mixins/routingMixins';

import store from '../../store';

export default {
  name: 'success',

  mixins: [routing],

  data () {
    return {

    }
  },

  computed: {

    firstName: function() {
      return store.getters.vendorName.substr(0, store.getters.vendorName.indexOf(' '));
    }

  }

}

</script>

<style scoped>

</style>