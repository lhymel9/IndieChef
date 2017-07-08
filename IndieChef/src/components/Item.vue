<template>
  <div class="item">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body>
      <main-head></main-head>

      <div class="background w3-row">

        <div class="w3-col l3 m1 s1"></br></div>

        <div class="w3-col l6 m10 s10">
          <div class="w3-row">
            <template v-if="!nonItem">
              <div class="content-container w3-card-4 w3-padding-48 w3-round">

                <div class="w3-container">

                  <div class="w3-col l1 m1 s12"></br></div>

                  <div class="w3-col l3 m3 s12 w3-center">
                    <img id="big-item-image" :src="currItem.path">
                  </div>

                  <div class="w3-col l2 m2 s12"></br></div>

                  <div class="w3-col l5 m5 s12">
                    <span class="text-large">{{currItem.name}}</span><span class="text-large-2"> &nbsp; &nbsp; ${{currItem.cost}}</span><hr id="small-hr">
                    <a><img id="stars-img" :src="stars"></br></br></a>
                    <span class="text-medium-2">By {{owner}}</span></br></br>
                    <span class="text-medium-2">Food Type:</span>
                      <template v-if="typeof currItem.itemTypes !== 'undefined'">
                        <span class="text-medium w3-tooltip"> {{shortenText(currItem.itemTypes.toString().replace(',',', '),20)}} <span class="tag-text w3-text w3-tag">{{currItem.itemTypes.toString().replace(',',', ')}}</span></span>
                      </template>
                    </span>
                  </div></br>

                  <div class="w3-col l1 m1 s12"></br></div>

                </div></br></br><hr>
                <div class="w3-container w3-margin">
                  <div id="description-border" class="w3-col">
                    <div class="w3-container">
                      <h2>Description</h2><hr id="med-hr">
                      <p class="text-medium">{{currItem.description}}</p>
                    </div>
                  </div>
                </div>
                <hr></br>

                <div class="w3-container w3-margin">
                  <div class="w3-col w3-margin">
                    <div class="w3-container">
                      <template v-if="!wasAdded">
                        <span class="text-span-cont"><span class="text-large">${{currItem.cost}} —</span><button v-on:click="addToCart(currItem)" class="i-button">Add To Cart</button></span>
                      </template>
                      <template v-else>
                        <span class="text-span-cont"><span class="text-large">${{currItem.cost}} —</span><button v-on:click="goToCart()" class="i-button">Go To Cart</button></span>
                      </template>
                    </div>
                  </div>
                </div><hr>

                <div class="w3-container w3-center">
                    <div class="w3-col">
                      <h2 class="text-medium-3">Also from this Vendor</h2>
                      <span>
                        <template v-for="item in relatedItems">
                          <template v-if="count < 5">
                            <img class="related-i-image" alt="Related Image" :src="item.src" v-on:click="goToItem(item.item)">
                          </template>
                        </template>
                      </span>
                    </div>
                </div>

              </div>
            </template>
            <template v-else>
              <h1 id="huge-404-text">404 - Item Page Not Found</h1>
              <p id="huge-404-parag">The item you are trying to reach does not exist in our records.</p>
            </template>
          </div>
        </div>

        <div class="w3-col l3 m1 s1"></br></div>

      </div>
      <main-tail></main-tail>
    </body>
  </div>
</template>

<script>

import forItems from '../mixins/item_page/itemPageMixins';
import routing from '../mixins/routingMixins';

import store from '../store';

export default {

  name: 'item',

  mixins:[forItems, routing],

  data () {

    return {

      currItem: {},

      relatedItems: [],

      nonItem: false,

      stars: '../../static/',

      maker: "Loading...",

      count: 0,

      wasAdded: false

    }

  },

  computed: {

    owner: function() {
      return this.maker;
    }

  }

}

</script>

<style scoped>

</style>