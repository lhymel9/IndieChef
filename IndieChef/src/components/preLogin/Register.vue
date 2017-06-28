<template>
  <div class="register">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body>
      <main-head></main-head>
      <div id="banner" class="w3-container w3-center" style="background-color: #252839">
        <span>Registration</span>
      </div>
      <div class="w3-row" style="background-color: #D8D8D8; padding-top:30px">
        <div class="w3-col l4 md2 s1 w3-center"></br></div>
        <div class="w3-col l4 md8 s10 w3-center" style="margin-bottom:90px;">
          <div class="w3-card-4 w3-padding w3-round" style="background-color:#e6e6e6">
            <div class="w3-container w3-left-align "><div id="s-header">Create Account.</div></div><hr>

            <!-- Form error generation -->
            <div v-for="error in errorArr">
              <div class="error-message">{{error}}</div>
            </div></br>

            <!-- Personal information inputs -->
            <input v-model="account[0]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Name" style="margin-bottom:25px; background-color: #F8F8FF">
            <input v-model="account[1]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Email" style="margin-bottom:25px; background-color: #F8F8FF">
            <input v-model="account[2]" type="password" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Password" style="margin-bottom:25px; background-color: #F8F8FF">
            <input v-model="account[3]" type="password" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Confirm Password" style="margin-bottom:25px; background-color: #F8F8FF">
            <input v-model="account[4]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Address" style="margin-bottom:25px; background-color: #F8F8FF">
            <div class="w3-bar w3-left" style="margin-bottom: 25px;">
              <input v-model="account[5]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Zipcode" style="margin:5px;background-color:#F8F8FF">
              <input v-model="account[6]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="City" style="margin:5px;background-color:#F8F8FF">
              <input v-model="account[7]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="State (AR, CA, etc)" style="margin:5px;background-color:#F8F8FF">
            </div>
            <input v-model="account[8]" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Phone" style="margin-bottom:25px; background-color: #F8F8FF">

            <!-- Submit Button -->
            <div class="w3-container">
              <input :value=vendorReg v-model="vendorReg" :id="vendorReg" class="w3-check w3-left" style="margin:25px" type="checkbox">
              <label :for="vendorReg" id="checker-text" class="w3-left w3-padding">Vendor Account</label>
              <template v-if="readyForGeneration == true">
                <a v-on:click="postAccount" href="#login" class="c-button w3-right" style="margin:25px;">Submit</a>
              </template>
              <template v-else>
                <a href="#login" class="c-button w3-right" style="margin:25px;" disabled>Submit</a>
              </template>
            </div>
          </div>
        </div>
        <div class="w3-col l4 md2 s1 w3-center"></br></div>
      </div>
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>

import getGeo from '../../mixins/getGeoMixin'
import regTools from '../../mixins/registrationToolsMixin'

export default {
  name: 'register',

  data () {

    return {

      vendorReg: false,
      
      account: ['', '', '', '', '', '', '', ''],

      errorArr: []

    }

  },

  computed: {

    readyForGeneration: function() {

      for(var i = 0; i < this.account.length; i++) {
        if(this.account[i] == '' || this.account[i] == ' ') 
          return false;
      }

      this.generateErrorList(this.formErrorChecks.array);
      return this.errorArr[0] == null;

    }

  },

  methods: {

    postAccount: function() {

      this.trimInputs(this.account);
      var joinedAddress = this.account[4].replace(/ /g,'+') + ',' + '+' + this.account[6].replace(/ /g,'+') + ',' + '+' + this.account[7];
      var apiKey = 'AIzaSyD7bfC_a_1IZa-ujwvD6mxJT6TSR4Fsxe8';

      this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + joinedAddress +'&key=' + apiKey)
        .then(response => {

          var lat = response.data.results[0].geometry.location.lat;
          var lng = response.data.results[0].geometry.location.lng;
          var geo = {"type": "point", "coordinates": [lng, lat]};

          if(this.vendorReg) 
            this.generateVendor(this.account, geo)
          else
            this.generateCustomer(this.account, geo)

          }, response => {

            console.log("Error accessing Google geolocation.")

          });

    }

  },

  mixins: [getGeo, regTools]
  
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

  #banner {
    font-size: 18px;
    color: white;
    background-color: black;
  }

  #logo-text {
    padding: 10px;
    font-size: 15px;
    font-family: Verdana;
  }

  #s-header {
    margin: 22px;
    color: #FF3B3F;
    font-size: 25px;
    font-family: Verdana;
  }

  .rmb {
    padding: 5px;
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

  #pipe {
    font-size: 18px;
    font-family: Verdana;
  }

  #checker-text {
    margin:25px;
    margin-left:-20px;
    color: black;
  }

  .error-message {
    font-size: 15px;
    font-family: Verdana;
    color: red;
  }

  .c-button {
    background-color: Transparent;
    border: 2px solid #FF3B3F;
    padding: 10px 10px;
    display: inline-block;
    font-size: 18px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    font-family: Verdana;
    color:#FF3B3F;
  }

  .c-button:hover {
    color: black;
    background-color: #FF3B3F;
  }

</style>