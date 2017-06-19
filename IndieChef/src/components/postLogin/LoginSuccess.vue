<template>
  <div class="success">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
      <main-head></main-head>
      <div class="w3-col l3 md2 s1 w3-center"></br></div>
      <div class="w3-col l6 md8 s10 w3-center">
        <div class="w3-card-4 w3-padding">
          <h1 id="hello-banner">Hello, {{firstName}}.</h1>
          <p id="proceed-parag">Thanks for logging in, please proceed to home or your vendor dashboard.</p>
          <div><a class="w3-button w3-green w3-margin w3-xlarge">Home</a><a class="w3-button w3-green w3-margin w3-xlarge">Dashboard</a></div>
        </div>
      </div>
      <div class="w3-col l3 md2 s1 w3-center"></br></div>

      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>

import auth from '../../mixins/getAuthDataMixin'
import store from '../../store'

export default {
  name: 'success',

  mixins: [auth],

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

#hello-banner {
  font-size: 55px;
  font-family: Verdana;
}

#proceed-parag {
  font-size: 40px;
  font-family: Verdana;
}

</style>