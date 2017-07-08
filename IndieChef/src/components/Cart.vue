<template>
  <div class="cart">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
    </head>

    <body>
      <main-head></main-head>
      <div class="background w3-row">
        <div class="w3-col l4 m2 w3-hide-small"></br></div>
        <div class="w3-col l4 m8 s12">
            <div class="outer-cont w3-card-4 w3-padding-24 w3-round">
                <h1>Cart</h1>
                <div class="cart-list w3-container w3-round">
                    <template v-if="typeof cart[0] !== 'undefined'">
                        <template v-for="item in cart">
                            <div class="ind-item w3-container w3-margin">
                                <span class="w3-col l4 m12 s12 w3-center">
                                    <img :src="item.path" class="item-img-4" :alt="item.name">
                                </span>
                                <span class="w3-col l4 m12 s12 w3-center">
                                    <h3 class="item-name">{{item.name}}</h3>
                                    <h5 class="item-cost-sub">${{item.cost}}</h5>
                                </span>
                                <div class="w3-col l4 m12 s12 w3-center">
                                    <button v-on:click="removeItem(item, this.localstorage)" class="x-btn">&times;</button>
                                </div>
                            </div></br>
                        </template>
                    </template>
                    <template v-else>
                        <span id="non-text">Your cart is empty.  Please visit the food browser to add items.</span>
                    </template>
                </div></br></br>
                <div class="w3-container">
                    <span class="bottom-text">Total: <span id="cash-amount">${{total.toFixed(2)}}</span></span></br></br>
                    <span class="bottom-text"># Items: <span id="numb-items">{{cart.length}}</span></span></br></br>
                    <span class="bottom-text"># Vendors: <span id="numb-vendors">{{vendorCount}}</span></span></br>
                    <button class="c-button w3-right">Checkout</button>
                </div>
            </div>
        </div>
        <div class="w3-col l4 m2 w3-hide-small"></br></div>
      </div>
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>

import routing from '../mixins/routingMixins';
import pageMixins from '../mixins/cart_page/cartPageMixins';

import store from '../store';

export default {

    name: 'cart',

    mixins:[routing, pageMixins],

    data () {

        return {

            cart: null,
            
            total: 0.00,

            vendorCount: 0
        }

    }

}

</script>

<style scoped>

</style>