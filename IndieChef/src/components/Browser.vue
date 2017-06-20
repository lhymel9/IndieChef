<template>
  <div class="browser">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>
    
    <!-- Header zone -->
    <body>
      <main-head></main-head>
      <div class="w3-row" style="background-color:#b5b5b7">
        <div class="w3-container w3-center" style="background-color: #252839; margin-bottom:50px">
          <span id="banner-text">The Browser</span>
        </div>
        <div class="w3-col l3 m3 s1 w3-center"></br></div>
        <div class="w3-col l6 m6 s10 w3-center" style="margin-bottom: 40px;">
          <div id="search-header">Search:</div>
          </br>
          <input v-model="options.searchCriteria" type="text" class="w3-bar-item w3-input w3-border-black w3-round-xlarge" placeholder="Enter a vendor or item name..." style="background-color: #D3D3D3">
        </div>
        <div class="w3-col l3 m3 s1 w3-center"></br></div>
      </div>

      <!-- Filter Sidebar -->
      <div class="w3-row" style="background-color:#b5b5b7">
        <div class="w3-col l1 m1 s1"></br></div>
        <div class="w3-col l2 m3 s12">
          <div class="w3-card-4 w3-padding" style="background-color:#062F4F; border: 2px solid #f2b632">
            <label class="box-label w3-center" style="margin-bottom: 25px">Filter:</label></br>

            <!-- Search type button -->
            <label class="box-label" style="margin-bottom: 15px">Search Type:</label></br>
            <template v-if="searchType == true">
              <button v-on:click="changeSearchType" class="c-button">By Food</button>
            </template>
            <template v-else>
              <button v-on:click="changeSearchType" class="c-button">By Chef</button>
            </template></br></br>

            <!-- Price search filter -->
            <label class="box-label" style="margin-bottom: 15px">Price:</label></br>
            <div v-for="price in prices">
              <input class="w3-radio" :id="price" :value="price" v-model="options.highestPrice" type="radio" name="price" checked>
              <label :for="price" class="f-label">{{price}}</label>
            </div></br>

            <!-- Distance search filter -->
            <label class="box-label" style="margin-bottom: 15px">Distance:</label></br>
            <div v-for="distance in distances">
              <input class="w3-radio" :id="distance" :value="distance" v-model="options.maxDistance" type="radio" name="distance" checked>
              <label :for="distance" class="f-label">{{distance}}</label>
            </div></br>

            <!-- Rating search filter -->
            <label class="box-label">Rating:</label></br>
            <div v-for="rating in ratings">
              <input class="w3-radio" :id="rating" :value="rating" v-model="options.leastRating" type="radio" name="rating" checked>
              <label :for="rating" class="f-label">{{rating}}</label>
            </div></br>
            <label class="box-label">Food:</label></br>

            <!-- Food search filter -->
            <div v-for="food in foods">
              <input :value=food v-model="options.checkedFoods" :id="food" class="w3-check" type="checkbox">
              <label :for="food" class="f-label">{{food}}</label>
            </div></br>
          </div>
        </div>
        <div class="w3-col l1 m1 s1"></br></div>

        <!-- Browser search results -->
        <div class="w3-col l7 m6 s12">
          <ul class="w3-ul w3-card-4" style="background-color:#062F4F; border: 2px solid #f2b632">

          <!-- If vendors were found -->
            <template v-if="vendors[0] !== undefined">

            <!-- If searching by chef -->
              <template v-if="searchType == true">
                <li v-for="item in filteredVendors" class="w3-padding-16" style="margin: 20px">
                  <div class="w3-row">
                    <div class="w3-col l3 m12 s12 w3-center">
                      <img src="../assets/logo.png" class="vendor-image w3-border w3-round">
                    </div>
                    <div class="w3-col l1 m12 s12 w3-center w3-hide-small w3-hide-medium"></br></div>
                    <div class="w3-col l8 m12 s12" style="padding-left:50px;">
                      <h3 class="vendor-header">{{item.obj.name}} - {{item.obj.rating}}/5</h3><hr>
                      <p><label class="vendor-subtext-label w3-round">Email:</label> <span class="vendor-subtext">{{item.obj.email}}</span></br> <label class="vendor-subtext-label w3-round ">Phone:</label> <span class="vendor-subtext">{{item.obj.phone}}</span></br> <label class="vendor-subtext-label w3-round ">Food Type:</label> <span class="vendor-subtext">{{item.obj.foodTypes.toString()}}</span></br>
                              <label class="vendor-subtext-label w3-round ">Distance:</label> <span class="vendor-subtext">{{(item.dis*0.000621371).toFixed(2)}} miles</span><button class="c-button w3-hide-medium w3-hide-small w3-right" style="margin-right:30px;">See Menu</button></p>
                    </div>
                    <div class="w3-col l3 m12 s12 w3-center">
                      <button class="c-button w3-hide-large">See Menu</button>
                    </div>
                  </div>
                </li>
              </template>

              <!-- If searching by food item -->
              <template v-else>
                <li v-for="item in filteredItems" class="w3-padding-16" style="margin: 20px">
                  <div class="w3-row">
                    <div class="w3-col l3 m12 s12 w3-center">
                      <img src="../assets/logo.png" class="vendor-image w3-border">
                    </div>
                    <div class="w3-col l1 m12 s12 w3-center w3-hide-small w3-hide-medium"></br></div>
                    <div class="w3-col l8 m12 s12" style="padding-left:20px;">
                      <h3 class="vendor-header">{{item.name}} by {{item.creatorName}}</h3><hr>
                      <p><label class="vendor-subtext-label w3-round ">Cost:</label> <span class="vendor-subtext">{{item.cost}}</span></br> <label class="vendor-subtext-label w3-round ">Tags:</label> <span class="vendor-subtext">{{item.itemTypes.toString()}}</span></br> <label class="vendor-subtext-label w3-round ">Description:</label> <span class="vendor-subtext">{{item.description}}</span></br>
                              <label class="vendor-subtext-label w3-round ">Distance:</label> <span class="vendor-subtext">{{(item.distance*0.000621371).toFixed(2)}} miles</span><button class="c-button w3-hide-medium w3-hide-small w3-right" style="margin-right:50px;">Purchase</button></p>
                    </div>
                    <div class="w3-col l3 m12 s12 w3-center">
                      <button class="c-button w3-hide-large">Purchase</button>
                    </div>
                  </div>
                </li>
              </template>
            </template>

            <!-- No results/no search made -->
            <template v-else>
              <p id="enter-address-banner">Indie Chef needs your location to get the list of vendors in your area, please allow geolocating in your browser and press "Find Me"...</p>
              <button v-on:click="getVendors(options.url)" class="c-button" id="f-me">Find Me</button>
            </template>
            
          </ul>
        </div>
        <div class="w3-col l1 m1 s1"></br></div>
      </div>
      <main-tail></main-tail>
    </body>
    
  </div>
</template>

<script>

import getVendors from '../mixins/getVendorsMixin'
import getItems from '../mixins/getItemsMixin'

export default {
  name: 'browser',
  
  data () {

      return { 

       vendors: [],

       items: [],

       searchType: true,

       options: {
         searchCriteria: '',
         url: '',
         maxDistance: 'Any',
         checkedFoods: ['Chicken', 'Beef', 'Seafood'],
         leastRating: '>2.0',
         highestPrice: "<$20.00"
       },
       
        prices: ["<$20.00",
                 "<$15.00",
                 "<$10.00",
                 "<$5.00"],

        distances: ["Any",
                   "<15 Miles",
                   "<10 Miles",
                   "<7 Miles",
                   "<5 Miles"],

        ratings: [">4.5",
                  ">3.5",
                  ">2.5",
                  ">2.0"],

        foods: ['Chicken',
                'Beef',
                'Seafood',
                'Sandwich',
                'Dessert',
                'Healthy',
                'Vegan',
                'Snacks']

      }

  },

  methods: {
    changeSearchType: function(event) {
      if(this.searchType)
        this.searchType = false;
      else
        this.searchType = true;
    },
  },

  mixins: [getVendors, getItems]

}
</script>

<style scoped>

  .box-label {
    border-bottom: thin solid #f2b632;
    color: #f2b632;
    font-size: 20px;
  }

  #banner-text {
    font-size: 18px;
    color: white;
  }

  .vendor-image {
    width: 180px;
    height: 200px;
  }

  hr {
    width: 80%;
    border: none;
    height: 1px;
    color:#b5b5b7;
    background-color: #b5b5b7; 
  }

  .vendor-header {
    font-family: Verdana;
    color:#b5b5b7;
  }

  .vendor-subtext {
    font-family: Verdana;
    font-size: 12px;
    color:#b5b5b7;
  }

  .vendor-subtext:hover {
    color: #A9A9A9;
  }

  #enter-address-banner {
    padding: 10px;
    font-size: 25px;
    font-family: Verdana;
    color:#b5b5b7;
  }

  #search-header {
    font-size: 25px;
    font-family: Verdana;
    color:black;
  }

  .c-button {
    background-color: Transparent;
    border: 2px solid #f2b632;
    padding: 10px 10px;
    display: inline-block;
    font-size: 18px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    font-family: Verdana;
    color:#f2b632;
  }

  .c-button:hover {
    color: black;
    background-color: #f2b632;
  }

  .f-label {
    font-size: 20px; 
    margin-left:10px;
    font-family: Verdana; 
    color:#b5b5b7;
  }

  #f-me {
    margin: 30px;
    padding: 20px;
    font-size: 27px;
  }

  .vendor-subtext-label {
    font-family: Verdana;
    background-color: #f2b632;
    color: black;
  }
</style>