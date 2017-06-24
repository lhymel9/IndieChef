<template>
  <div class="dashboard">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable = yes">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body>
      <main-head></main-head>
      <div id="banner" class="w3-container w3-center">
        <span id="banner-text">Dashboard</span>
      </div>
      <div class="background w3-row">

        <!-- Menu Items -->
        <div class="item-col w3-col l6 m12 s12">
          <div class="inner-item-list w3-container">
            <span class="subbanner-text">Your Menu</span>
            <ul class="w3-ul">
              <li v-for="item in myItems" class="indiv-item w3-padding-16 w3-border w3-round-xlarge">
                <div class="img-cont w3-container w3-cell">
                  <img src="../../assets/logo.png" alt="Item Picture" class="item-img">
                </div>
                <div class="info-cont w3-container w3-cell">
                  <label class="i-text i-label">Name:</label> <span class="i-text">{{item.name}}</span></br>
                  <label class="i-text i-label">Cost:</label> <span class="i-text">{{item.cost}}</span></br>
                  <label class="i-text i-label">Description:</label> <span class="i-text w3-tooltip">{{shortenText(item.description)}} <span class="tag-text w3-text w3-tag">{{item.description}}</span></span></br>
                  <label class="i-text i-label">Item Types:</label> <span class="i-text">{{item.itemTypes.toString()}}</span>
                </div>
                <div class="sale-text w3-container w3-cell">
                  <div>Latest Sales:</div>
                  <div v-for="sale in item.saleObjs.slice(-4)">
                    <span>{{sale.date}}</span></br>
                  </div>
                </div>
                <div class="w3-container w3-cell">
                  <a v-on:click="this.document.getElementById(item.name).style.display='block'"><img src="../../assets/editpencil.png" alt="Vendor's Portrait" class="editpencil w3-image"></a>
                  <div :id="item.name" class="w3-modal">
                    <div class="w3-modal-content w3-animate-zoom">
                      <header class="modal-back w3-container"> 
                        <span v-on:click="this.document.getElementById(item.name).style.display='none'" class="w3-button w3-display-topright">&times;</span>
                        <h3 class="edit-header">Edit Item.</h3>
                        <input v-model="item.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.name">
                        <input v-model="item.cost" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.cost">
                        <input v-model="item.description" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.description">
                        <button v-on:click="submitItemChanges(item)" class="c-button">Submit Changes</button>
                      </header>
                    </div>
                  </div>
                </div>
              </li>
              <li class="indiv-item w3-padding-16 w3-border w3-round-xlarge">
                <div class="img-cont w3-container w3-cell">
                  <img src="../../assets/plus.png" alt="Plus Picture" class="item-img">
                </div>
                <div class="text-cont w3-container w3-cell">
                  <span class="plus-text">Create a new menu item.</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Active Orders -->
          <div class="active-cont w3-container">
            <span class="subbanner-text">Active Orders</span>
            <ul class="inner-order-list w3-ul">
              <template v-if="typeof activeOrders[0] !== 'undefined'">
                <li v-for="order in activeOrders" class="indiv-item w3-border w3-round-xlarge">
                  <div class="w3-container w3-cell">
                    <label class="o-label">Item: </label><span class="o-text">{{order.item}}</span>
                    <label class="o-label">To: </label><span class="o-text">{{order.customer}} ({{order.customerEmail}})</span>
                    <label class="o-label">Total: </label><span class="important">${{order.cost}}</span></br>
                    <label class="o-label">Due: </label><span class="o-text">{{new Date(order.deliveryDate).toLocaleString()}}</span><span class="important">({{timeToDue(order.deliveryDate)}})</span>
                  </div>
                  <div class="w3-container w3-cell">
                    <a class="mag-glas material-icons w3-xxlarge w3-text-white">search</a>
                  </div>
                </li>
              </template>
              <template v-else>
                <p id="no-orders">You have no active orders at this time.</p>
              </template>
            </ul>
          </div>
        </div>

        <!-- Right-Hand Stuff -->
        <div class="w3-col l5 m12 s12">

          <!-- Vendor Information -->
          <div class="info-panel w3-container">
            <div class="w3-container">
              <img src="../../assets/logo.png" alt="Vendor's Portrait" class="w3-border">
              <div class="w3-panel">
                <!-- vendor content here -->
              </div>
            </div>
          </div>

          <!-- Recent Sales Log -->
          <div class="inner-cont w3-container">
            <ul class="sale-list w3-ul">
              <!-- v-for sale log -->
            </ul>
          </div>
        </div>
      </div> 
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>

import forItems from '../../mixins/dashboard/dashMenuQueriesMixin';
import forOrders from '../../mixins/dashboard/dashOrderQueriesMixin';
import forEdits from '../../mixins/dashboard/editMixins';
import store from '../../store'

export default {

  name: 'dashboard',

  mixins: [forItems, forOrders, forEdits],

  data () {

    return {
        myItems: [],

        activeOrders: []
    }

  }

}

</script>

<style scoped>

  .c-button {
    background-color: Transparent;
    border: 2px solid #f2b632;
    color: #f2b632;
    padding: 5px 10px;
    margin: 15px;
    display: inline-block;
    font-size: 18px;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    font-family: Verdana;
    float: right;
  }

  .c-button:hover {
    background-color: #f2b632;
    color: black;
  }

  #banner-text {
    font-size: 18px;
    color: white;
  }

  .subbanner-text {
    font-size: 25px;
    color: white;
  }

  .background {
    background-color:#DCDCDC;
    padding-top:50px;
  }

  #banner {
    background-color: #252839;
  }

  

  .inner-item-list{
    padding:35px;
    background-color: #062F4F;
    overflow: auto;
    width:100%;
    height:550px;
    border: 2px solid #f2b632;
  }

  .info-panel {
    margin-bottom: 20px;
    background-color: #062F4F;
  }

  .item-img {
    background-color: Transparent;
    width: 125px;
    height: 125px;
    border: 2px solid #b5b5b7;
  }

  .i-text {
    font-family: Verdana;
    font-size: 14px;
    color:#b5b5b7;
  }

  .i-label {
    background-color: #f2b632;
    color: #062F4F;
    padding:1px;
  }

  .editpencil {
    color: #f2b632;
    width: 50px;
    height: 50px;
    margin-left: 55px;
  }

  .item-col {
    padding:25px;
  }

  .tag-text {
    position: absolute;
    left:0px;
    bottom:18px;
  }

  .indiv-item {
    margin-bottom:10px;
  }

  .sale-text {
    color: white;
    padding-left:60px;
    padding-right:65px;
    font-family: Verdana;
  }

  .active-cont {
    margin-top: 10px;
    padding:35px;
    background-color: #062F4F;
    overflow: auto;
    width:100%;
    height:170px;
    border: 2px solid #f2b632;
  }

  #no-orders, .plus-text {
    font-family: Verdana;
    color:#b5b5b7;
    font-size: 25px;
    text-align: center;
  }

  .o-text, .o-label {
    font-family: Verdana;
    font-size: 14px;
    margin-right: 15px;
    color:#b5b5b7;
  }

  .o-label {
    color: white;
    margin-right: 5px;
    margin-left:10px;
  }

  .important {
    background-color:#f2b632;
    color: black;
    font-weight: bold;
  }

  .mag-glas {
    margin-left:130px;
  }

  .modal-back {
    background-color:#252839;
  }

  .edit-header {
    color: white;
    padding-bottom:10px;
  }

  .edit-input {
    margin-bottom:25px; 
    background-color: #D3D3D3;
  }
</style>