<template>
  <div class="browser">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
      <main-head></main-head>
      <div class="w3-container w3-border" style="margin-top: -85px; margin-bottom: 35px; 	background-color: #DCDCDC;"><h1 id="logo-text">The Browser</h1></div>
      <div class="w3-row">
        <div class="w3-col l3 m3 s1 w3-center"></br></div>
        <div class="w3-col l6 m6 s10 w3-center" style="margin-bottom: 40px;">
          <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Search...">
          </br>
          <a class="w3-button w3-green w3-round-xlarge" style="width:30%">Go</a>
        </div>
        <div class="w3-col l3 m3 s1 w3-center"></br></div>
      </div>

      <div class="w3-row">
        <div class="w3-col l1 m1 s1"></br></div>
        <div class="w3-col l2 m3 s12">
          <div class="w3-card-4 w3-padding">
            <label class="box-label w3-center" style="margin-bottom: 25px">Filter:</label></br>
            <label class="box-label" style="margin-bottom: 15px">Search Type:</label></br>
            <template v-if="searchType === 'byFood'">
              <button class="w3-button w3-green">By Chef</button>
            </template>
            <template v-else>
              <button class="w3-button w3-green">By Food</button>
            </template></br></br>
            <label class="box-label" style="margin-bottom: 15px">Distance:</label></br>
            <input type="text" class="w3-input w3-border" placeholder="Enter Address"></br>
            <a class="w3-button w3-green" style="margin-top: -8px; margin-bottom: 15px;">Submit</a>
            <a class="w3-button w3-green" style="margin-top: -8px; margin-bottom: 15px;">Find Me</a>
            <div v-for="distance in distances">
              <input class="w3-radio" type="radio" name="distance" checked>
              <label>{{distance.miles}}</label>
            </div></br>
            <label class="box-label">Rating:</label></br>
            <div v-for="rating in ratings">
              <input class="w3-check" type="checkbox">
              <label class="check-word">{{rating.number}}</label>
            </div></br>
            <label class="box-label">Food:</label></br>
            <div v-for="food in foods">
              <input class="w3-check" type="checkbox">
              <label class="check-word">{{food.type}}</label>
            </div></br>
          </div>
        </div>
        <div class="w3-col l1 m1 s1"></br></div>
        <div class="w3-col l7 m6 s12">
          <ul class="w3-ul w3-card-4">
            <li v-for="item in vendors.content" class="w3-padding-16">
              <div class="w3-row">
                <div class="w3-col l3 m12 s12 w3-center">
                  <img src="../assets/logo.png" class="vendor-image w3-border">
                </div>
                <div class="w3-col l1 m12 s12 w3-center w3-hide-small w3-hide-medium"></br></div>
                <div class="w3-col l8 m12 s12" style="padding-left:20px;">
                  <h3 class="vendor-header">{{item.nameV}} - {{item.rating}}/5</h3><hr>
                  <p><label class="vendor-subtext-label w3-round w3-blue">Email:</label> <span class="vendor-subtext">{{item.emailV}}</span></br> <label class="w3-round w3-blue">Phone:</label> <span class="vendor-subtext">{{item.phone}}</span></br> <label class="w3-round w3-blue">Food Type:</label> <span class="vendor-subtext">Chicken, Beef, Salad</span>
                          <button class="w3-button w3-green w3-large w3-hide-medium w3-hide-small w3-right" style="margin-right:50px;">See Menu</button></p>
                </div>
                <div class="w3-col l3 m12 s12 w3-center">
                  <button class="w3-button w3-green w3-large w3-round-large w3-hide-large">See Menu</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="w3-col l1 m1 s1"></br></div>
      </div>
      <main-tail></main-tail>
    </body>
    
  </div>
</template>

<script>
export default {
  name: 'browser',

  data () {
      return { 
        vendors:  {},

        distances: [{miles: '<15 Miles'},
                   {miles: '<10 Miles'},
                   {miles: '<7 Miles'},
                   {miles: '<5 Miles'}],

        ratings: [{number: '>4.5'},
                  {number: '>3.5'},
                  {number: '>2.5'},
                  {number: '>2.0'} ],

        foods: [{type: 'Chicken', checked: false},
                {type: 'Beef', checked: false},
                {type: 'Seafood', checked: false},
                {type: 'Sandwich', checked: false},
                {type: 'Dessert', checked: false},
                {type: 'Healthy', checked: false},
                {type: 'Vegan', checked: false},
                {type: 'Snacks', checked: false} ]
      }
  },

  created: function () {

    this.$http.get('http://env2.zs6znymmyc.us-east-1.elasticbeanstalk.com/api/vendors/')
      .then(response => {
        this.vendors.content = response.data;
      }, response => {

      });

  }

}
</script>

<style scoped>

  .box-label {
    border-bottom: thin solid #000;
  }

  #logo-text {
    padding: 10px;
    font-size: 15px;
    font-family: Verdana;
  }

  .vendor-image {
    width: 200px;
    height: 220px;
  }

  hr {
    width: 80%;
    border: none;
    height: 1px;
    color: #333; 
    background-color: #333; 
  }

  .vendor-header {
    font-family: Verdana;
  }

  .vendor-subtext {
    font-family: Verdana;
    font-size: 12px;
  }

  .vendor-subtext:hover {
    color: #A9A9A9;
  }
</style>