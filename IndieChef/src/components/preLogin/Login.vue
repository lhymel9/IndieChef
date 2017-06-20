<template>
  <div class="login">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
      <main-head></main-head>
      <div class="w3-col l4 md2 s1 w3-center"></br></div>
      <div class="w3-col l4 md8 s10 w3-center">
        <div class="w3-card-4 w3-padding">
          <div class="w3-container w3-left-align "><div id="s-header">Sign In.</div></div></br>
          <div id="error-message">{{failureMessage}}</div></br>
          <input v-model="entry[0]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Email" style="margin-bottom:25px;">
          <input v-model="entry[1]" type="password" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Password" style="margin-bottom:25px;">
          <template v-if="isFilled">
            <a v-on:click="verifyLogin" class="w3-bar-item w3-button w3-green" style="margin: 5px; margin-bottom: 15px;">Login</a>
          </template>
          <template v-else>
            <a class="w3-bar-item w3-button w3-green" style="margin: 5px; margin-bottom: 15px;" disabled>Login</a>
          </template>
          <a href="#register" class="w3-bar-item w3-button w3-green" style="margin: 5px; margin-bottom: 15px;">Register</a></br>
          <a class="w3-button w3-white w3-hover-white" href="#forgot"><div class="flink" >Forgot my Password</div></a>
        </div>
      </div>
      <div class="w3-col l4 md2 s1 w3-center"></br></div></br>
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

  #s-header {
    margin: 22px;
    color: #2196F3;
    font-size: 25px;
    font-family: Verdana;
  }

  #rmb {
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
  
</style>