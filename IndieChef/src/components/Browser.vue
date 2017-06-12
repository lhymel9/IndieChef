<template>
  <div class="browser">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    
    <!-- Header zone -->
    <body>
      <main-head></main-head>
      <div class="w3-container w3-border" style="margin-top: -85px; margin-bottom: 35px; 	background-color: #DCDCDC;"><h1 id="logo-text">The Browser</h1></div>
      <div class="w3-row">
        <div class="w3-col l3 m3 s1 w3-center"></br></div>
        <div class="w3-col l6 m6 s10 w3-center" style="margin-bottom: 40px;">
          <div id="search-header">Search:</div>
          </br>
          <input v-model="options.searchCriteria" type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Enter a vendor or item name...">
        </div>
        <div class="w3-col l3 m3 s1 w3-center"></br></div>
      </div>

      <!-- Filter Sidebar -->
      <div class="w3-row">
        <div class="w3-col l1 m1 s1"></br></div>
        <div class="w3-col l2 m3 s12">
          <div class="w3-card-4 w3-padding">
            <label class="box-label w3-center" style="margin-bottom: 25px">Filter:</label></br>

            <!-- Search type button -->
            <label class="box-label" style="margin-bottom: 15px">Search Type:</label></br>
            <template v-if="searchType == true">
              <a v-on:click="changeSearchType" class="w3-button w3-green">By Food</a>
            </template>
            <template v-else>
              <a v-on:click="changeSearchType" class="w3-button w3-green">By Chef</a>
            </template></br></br>

            <!-- Price search filter -->
            <label class="box-label" style="margin-bottom: 15px">Price:</label></br>
            <div v-for="price in prices">
              <input class="w3-radio" :id="price" :value="price" v-model="options.highestPrice" type="radio" name="price" checked>
              <label :for="price">{{price}}</label>
            </div></br>

            <!-- Distance search filter -->
            <label class="box-label" style="margin-bottom: 15px">Distance:</label></br>
            <div v-for="distance in distances">
              <input class="w3-radio" :id="distance" :value="distance" v-model="options.maxDistance" type="radio" name="distance" checked>
              <label :for="distance">{{distance}}</label>
            </div></br>

            <!-- Rating search filter -->
            <label class="box-label">Rating:</label></br>
            <div v-for="rating in ratings">
              <input class="w3-radio" :id="rating" :value="rating" v-model="options.leastRating" type="radio" name="rating" checked>
              <label :for="rating">{{rating}}</label>
            </div></br>
            <label class="box-label">Food:</label></br>

            <!-- Food search filter -->
            <div v-for="food in foods">
              <input :value=food v-model="options.checkedFoods" :id="food" class="w3-check" type="checkbox">
              <label :for="food" class="check-word">{{food}}</label>
            </div></br>
          </div>
        </div>
        <div class="w3-col l1 m1 s1"></br></div>

        <!-- Browser search results -->
        <div class="w3-col l7 m6 s12">
          <ul class="w3-ul w3-card-4">

          <!-- If vendors were found -->
            <template v-if="vendors[0] !== undefined">

            <!-- If searching by chef -->
              <template v-if="searchType == true">
                <li v-for="item in filteredVendors" class="w3-padding-16">
                  <div class="w3-row">
                    <div class="w3-col l3 m12 s12 w3-center">
                      <img src="../assets/logo.png" class="vendor-image w3-border">
                    </div>
                    <div class="w3-col l1 m12 s12 w3-center w3-hide-small w3-hide-medium"></br></div>
                    <div class="w3-col l8 m12 s12" style="padding-left:20px;">
                      <h3 class="vendor-header">{{item.obj.name}} - {{item.obj.rating}}/5</h3><hr>
                      <p><label class="vendor-subtext-label w3-round w3-blue">Email:</label> <span class="vendor-subtext">{{item.obj.email}}</span></br> <label class="w3-round w3-blue">Phone:</label> <span class="vendor-subtext">{{item.obj.phone}}</span></br> <label class="w3-round w3-blue">Food Type:</label> <span class="vendor-subtext">{{item.obj.foodTypes.toString()}}</span></br>
                              <label class="w3-round w3-blue">Distance:</label> <span class="vendor-subtext">{{(item.dis*0.000621371).toFixed(2)}} miles</span><button class="w3-button w3-green w3-large w3-hide-medium w3-hide-small w3-right" style="margin-right:50px;">See Menu</button></p>
                    </div>
                    <div class="w3-col l3 m12 s12 w3-center">
                      <button class="w3-button w3-green w3-large w3-round-large w3-hide-large">See Menu</button>
                    </div>
                  </div>
                </li>
              </template>

              <!-- If searching by food item -->
              <template v-else>
                <li v-for="item in filteredItems" class="w3-padding-16">
                  <div class="w3-row">
                    <div class="w3-col l3 m12 s12 w3-center">
                      <img src="../assets/logo.png" class="vendor-image w3-border">
                    </div>
                    <div class="w3-col l1 m12 s12 w3-center w3-hide-small w3-hide-medium"></br></div>
                    <div class="w3-col l8 m12 s12" style="padding-left:20px;">
                      <h3 class="vendor-header">{{item.name}} by {{item.creatorName}}</h3><hr>
                      <p><label class="vendor-subtext-label w3-round w3-blue">Cost:</label> <span class="vendor-subtext">{{item.cost}}</span></br> <label class="w3-round w3-blue">Tags:</label> <span class="vendor-subtext">{{item.itemTypes.toString()}}</span></br> <label class="w3-round w3-blue">Description:</label> <span class="vendor-subtext">{{item.description}}</span></br>
                              <label class="w3-round w3-blue">Distance:</label> <span class="vendor-subtext">{{(item.distance*0.000621371).toFixed(2)}} miles</span><button class="w3-button w3-green w3-large w3-hide-medium w3-hide-small w3-right" style="margin-right:50px;">Purchase</button></p>
                    </div>
                    <div class="w3-col l3 m12 s12 w3-center">
                      <button class="w3-button w3-green w3-large w3-round-large w3-hide-large">Purchase</button>
                    </div>
                  </div>
                </li>
              </template>
            </template>

            <!-- No results/no search made -->
            <template v-else>
              <p id="enter-address-banner">Indie Chef needs your location to get the list of vendors in your area, please allow geolocating in your browser and press "Find Me"...</p>
              <div v-on:click="getVendors(options.url)" class="w3-button w3-green w3-round-xlarge w3-xlarge" style="margin: 30px; padding:30px;">Find Me</div>
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

  #enter-address-banner {
    padding: 10px;
    font-size: 25px;
    font-family: Verdana;
  }

  #search-header {
    font-size: 25px;
    font-family: Verdana;
  }

</style>