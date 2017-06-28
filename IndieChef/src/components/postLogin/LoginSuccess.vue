<template>
  <div class="success">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body>
      <main-head></main-head>
      <div id="banner" class="w3-container w3-center" style="background-color: #252839;">
        <span>Welcome</span>
      </div>
      <div class="w3-row" style="background-color:#D8D8D8; padding-top:90px">
        <div class="w3-col l3 md2 s1 w3-center"></br></div>
        <div class="w3-col l6 md8 s10 w3-center" style="margin-bottom:480px">
          <div class="w3-card-4 w3-padding w3-round" style="background-color:#e6e6e6; border: 2px solid #015249">
            <h1 id="hello-banner">Hello, {{firstName}}.</h1>
            <p id="proceed-parag">Thanks for logging in, please proceed to home or your vendor dashboard.</p>
            <div><a href="#" class="su-button w3-margin">Home</a><button v-on:click="goToDash" class="su-button w3-margin">Dashboard</button></div>
          </div>
        </div>
        <div class="w3-col l3 md2 s1 w3-center"></br></div>
      </div>
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>

import store from '../../store'

export default {
  name: 'success',

  data () {
    return {

    }
  },

  computed: {

    firstName: function() {
      return store.getters.vendorName.substr(0, store.getters.vendorName.indexOf(' '));
    }

  },

  methods: {
    goToDash: function() {
      var myToken = store.getters.getToken.toString(),
          myId = store.getters.vendorId.toString(),
          url = ["/dashboard/usr=", myId, "&tok=", myToken].join("");
      this.$router.push({path: url});
    }
  }

}

</script>

<style scoped>

  #banner {
    font-size: 18px;
    color: white;
    background-color: black;
  }

  #hello-banner {
    font-size: 55px;
    font-family: Verdana;
    color: #015249;
  }

  #proceed-parag {
    font-size: 40px;
    font-family: Verdana;
    color: #A5A5AF;
  }

  #banner-text {
    font-size: 18px;
    color: white;
  }

  .su-button {
    background-color: Transparent;
    border: 2px solid #57BC90;
    padding: 10px 10px;
    display: inline-block;
    font-size: 30px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    font-family: Verdana;
    color:#57BC90;
  }

  .su-button:hover {
    color: black;
    background-color: #57BC90;
  }

</style>