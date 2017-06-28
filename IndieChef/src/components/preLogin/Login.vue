<template>
  <div class="login">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
    </head>

    <body>
      <main-head></main-head>
      <div id="banner" class="w3-container w3-center">
        <span id="banner-text">Login</span>
      </div>
      <div class="w3-row" style="background-color:#D8D8D8; height:1000px; padding-top:125px">
        <div class="w3-col l4 md2 s1 w3-center"></br></div>
        <div class="w3-col l4 md8 s10 w3-center">
          <div class="w3-card-4 w3-padding w3-round" style="background-color:#e6e6e6">
            <div class="w3-container w3-left-align"><div id="s-header">Sign In.</div></div><hr>
            <div id="error-message">{{failureMessage}}</div></br>
            <input v-model="entry[0]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Email" style="margin-bottom:25px; background-color: #F8F8FF">
            <input v-model="entry[1]" type="password" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Password" style="margin-bottom:25px; background-color: #F8F8FF">
            <button v-on:click="verifyLogin" class="c-button" style="margin: 5px; margin-bottom: 15px;">Login</button>
            <a href="#register" class="c-button" style="margin: 5px; margin-bottom: 15px;">Register</a></br>
            <a id="h-button" class="c-button" href="#forgot"><div class="flink">Forgot my Password</div></a>
          </div>
        </div>
        <div class="w3-col l4 md2 s1 w3-center"></br></div></br>
      </div>
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>

import auth from '../../mixins/getAuthDataMixin';

export default {

  name: 'login',

  mixins:[auth],

  data () {

    return {

      entry: ['', ''],

      failureMessage: ''

    }

  },

  computed: {

    isFilled: function() {
      return this.entry[0] != '' && this.entry[1] != '' && this.entry[0] != ' ' && this.entry[1] != ' ';
    }

  },

  methods: {
    verifyLogin: function() {

      var credentials = {
        email: this.entry[0],
        password: this.entry[1]
      }

      this.$http.post('http://localhost:4000/api/login', credentials)
        .then(response => {
          if(response.data.token === 'null')
            this.failureMessage = "Login Failed: Please enter a valid username and password.";
          else {
            this.$store.dispatch("login", response.data.token)
              .then(() => {
                this.authenticateVendor();
              });
          }

        }, response => {

          failureMessage = "Login Failed: Error with login servers."
          console.log("Login Server Failure: \n" + response.data);

        });

    }
  }

}
</script>

<style scoped>

  hr {
    display: block;
    margin-top: 0.3em;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
  }

  #s-header {
    margin: 22px;
    color: #FF3B3F;
    font-size: 25px;
    font-family: Verdana;
  }

  #rmb {
    background-color: Transparent;
    padding: 5px;
    margin-bottom: 25px;
    font-size: 15px;
    font-family: Verdana;
  }

  .flink {
    font-size: 13px;
    text-align: center;
    font-family: Verdana;
  }

  .flink:hover {
    color: #D9D9D9;
  }

  #error-message {
    font-size: 15px;
    font-family: Verdana;
    color: red;
  }
  
  .c-button {
    background-color: Transparent;
    border: 2px solid #FF3B3F;
    color: #FF3B3F;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    font-family: Verdana;
  }

  .c-button:hover {
    background-color: #FF3B3F;
    color: black;
  }

  #h-button {
    border: none;
    color: black;
  }

  #h-button:hover {
    background-color: Transparent;
    color: white;
  }

  #banner {
    font-size: 18px;
    color: white;
    background-color: black;
  }
</style>