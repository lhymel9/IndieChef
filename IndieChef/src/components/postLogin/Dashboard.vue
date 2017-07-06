<template>
  <div class="dashboard">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable = yes">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>

    <body>
      <main-head></main-head>
      <div class="background w3-row">

        <!-- Left-Hand Stuff -->
        <div class="item-col w3-col l6 m12 s12">

          <!-- Visible encapsulating element, overflow -->
          <div class="inner-item-list w3-container w3-round-large">

            <!-- Section header -->
            <span class="subbanner-text">Your Menu</span><hr class="dashhr">

            <!-- Unordered List Definition -->
            <ul class="w3-ul">

              <!-- All items, iterated as list elements -->
              <li v-for="item in myItems" class="indiv-item w3-padding-16 w3-round-xlarge">

                <span class="subbanner-text-2">{{item.name}}</span><hr class="dashhr">

                <!-- Item photo -->
                <div class="w3-container w3-cell">
                  <img class="item-img" :src="item.img" alt="Item Image">
                </div>

                <!-- Item Information -->
                <div id="grey-back-cont" class="w3-container w3-cell w3-round-large">
                  <label class="type-button-small">Cost:</label> <span class="i-text">${{item.cost}}</span></br>
                  <label class="type-button-small">Description:</label> <span class="i-text w3-tooltip">{{shortenText(item.description, 15)}} <span class="tag-text w3-text w3-tag">{{item.description}}</span></span></br>
                  <label class="type-button-small">Item Types:</label> <span class="i-text w3-tooltip">{{shortenText(item.itemTypes.toString(), 15)}}<span class="tag-text w3-text w3-tag">{{item.itemTypes.toString()}}</span></span>
                </div>

                <div class="sale-text w3-container w3-cell w3-round-large">
                  <div>Latest Sales:</div><hr id="a22" class="dashhr">
                  <div v-for="sale in item.saleObjs.slice(-4)">
                    <span class=" w3-text w3-round-large">{{sale.date}}</span></br>
                  </div>
                </div>

                <!-- Modal edit element and initiator -->
                <div class="w3-container w3-cell">

                  <button class="c-button-2" v-on:click="setupEdit(item)">Edit Item</button>
                  
                  <!-- Modal Content -->                  
                  <div :id="item._saleId" class="w3-modal">
                    <div class="w3-modal-content w3-animate-zoom">
                      <header class="modal-back w3-container"> 
                        <span v-on:click="revertItem(item)" class="w3-button w3-display-topright">&times;</span>
                        <h3 class="edit-header">Edit Item.</h3><hr class="dashhr">
                        <input v-model="item.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.name">
                        <input v-model="item.cost" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.cost">
                        <textarea v-model="item.description" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.description"></textarea>

                        <div class="w3-container w3-border w3-margin w3-padding">
                          <button class="type-button-head">Item Types >></button>
                          <template v-for="foodType in item.itemTypes">
                            <button v-on:click="changeTypes(foodType, item.itemTypes, allTypes)" class="type-button">{{foodType}}</button>
                          </template>
                        </div>

                        <div class="w3-container w3-border w3-margin w3-padding">
                          <button class="type-button-head">Available Types >></button>
                          <template v-for="foodType in allTypes">
                            <button v-on:click="changeTypes(foodType, allTypes, item.itemTypes)" class="type-button">{{foodType}}</button>
                          </template>
                        </div>

                        <!-- File upload zone -->

                        
                        <button v-on:click="submitItemChanges(item)" class="c-button">Submit Changes</button>
                      </header>
                    </div>
                  </div>

                </div></br><hr class="dashhr">

              </li>

              <!-- Add new item plus button (always present) -->
              <li class="indiv-item-plus w3-padding-16 w3-round-xlarge">

                <!-- Modal add element and initiator -->
                <div class="w3-container w3-cell">
                  <div v-on:click="this.document.getElementById('01').style.display='block'" class="plus-img w3-tooltip"><span class="tag-text-3 w3-text w3-tag">Create New Item</span></div>
                  
                  <!-- Modal content -->
                  <div id="01" class="w3-modal">
                    <div class="w3-modal-content w3-animate-zoom">
                      <header class="modal-back w3-container"> 
                        <template v-if="!isNext">
                          <span v-on:click="resetNew" class="w3-button w3-display-topright">&times;</span>
                          <h3 class="edit-header">Create Item</h3><hr class="dashhr">
                          <input v-model="newItem.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Item Name">
                          <input v-model="newItem.cost" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Item Cost">
                          <textarea v-model="newItem.description" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Item Description"></textarea>

                          <div class="w3-container w3-border w3-margin w3-padding">
                            <button class="type-button-head">Item Types >></button>
                            <template v-for="foodType in newItem.itemTypes">
                              <button v-on:click="changeTypes(foodType, newItem.itemTypes, allTypes)" class="type-button">{{foodType}}</button>
                            </template>
                          </div>

                          <div class="w3-container w3-border w3-margin w3-padding">
                            <button class="type-button-head">Available Types >></button>
                            <template v-for="foodType in allTypes">
                              <button v-on:click="changeTypes(foodType, allTypes, newItem.itemTypes)" class="type-button">{{foodType}}</button>
                            </template>
                          </div></br>

                          <button class="c-button" v-on:click="submitNewItem(newItem)">Next</button>


                        </template>
                        <template v-else>
                          <span v-on:click="resetNew" class="w3-button w3-display-topright">&times;</span>
                          <h3 class="edit-header">Image Upload</h3><hr class="dashhr">
                          <dropzone id="myVueDropzone" :url="'http://localhost:4000/api/images/' + imgItemId" v-on:vdropzone-success="resetNew">
                            <input type="hidden" name="media" value="xxx">
                          </dropzone>
                        </template>

                      </header>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Active Orders -->
          <div class="active-cont w3-container w3-round-large">

            <!-- Section header -->
            <span class="subbanner-text">Active Orders</span><hr class="dashhr">

            <!-- Unordered List Definition -->
            <ul class="w3-ul">

              <!-- If there are active orders -->
              <template v-if="typeof activeOrders[0] !== 'undefined'">

                <!-- All active orders, iterated as list elements -->
                <li v-for="order in activeOrders" class="indiv-item">

                  <!-- Order Information -->
                  <div class="w3-container w3-cell">
                    <label class="type-button-small">Item: </label><span class="o-text">{{order.item}}</span>
                    <label class="type-button-small" style="margin-left: 90px;">Total: </label><span class="important w3-round-large">${{order.cost}}</span></br>
                    <label class="type-button-small">To: </label><span class="o-text">{{order.customer}} ({{order.customerEmail}})</span>
                    <label class="type-button-small">Due: </label><span class="o-text">{{new Date(order.deliveryDate).toLocaleString()}}</span><span class="important w3-round-large">({{timeToDue(order.deliveryDate)}})</span>
                    <hr class="dashhr">
                    <button v-on:click="this.document.getElementById(order._id).style.display='block'" class="c-button-3">Actions</button>
                  </div>

                    <!-- Modal Content -->
                  <div :id="order._id" class="w3-modal">
                    <div class="w3-modal-content w3-animate-zoom">
                      <header class="modal-back w3-container">
                        <span v-on:click="this.document.getElementById(order._id).style.display='none'" class="w3-button w3-display-topright">&times;</span>
                        <h3 class="edit-header">Order Actions.</h3><hr class="dashhr">
                        <h6 class="edit-header">Order for --- {{order.customer}} ({{order.customerEmail}})</h6>
                        <button class="c-button">Delay Order</button>
                        <button class="c-button">Cancel Order</button>
                        <textarea type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Reason for action."></textarea>
                      </header>
                    </div>
                  </div>
                </li>
              </template>

              <!-- If there are no active orders -->
              <template v-else>
                <p id="no-orders">You have no active orders at this time.</p>
              </template>

            </ul>
          </div>
        </div>

        <!-- Right-Hand Stuff -->
        <div class="item-col w3-col l6 m12 s12">

          <!-- Vendor Information -->
          <div class="info-panel w3-container w3-round-large">
            <span class="subbanner-text w3-margin">Vendor Profile</span><hr class="dashhr">
            <div class="w3-container w3-cell w3-padding-16">
              <div v-on:click="this.document.getElementById('02').style.display='block'" class="vendor-img w3-tooltip"><span class="tag-text-2 w3-text w3-tag">Edit Profile Picture</span></div>
              
              <!-- Modal Content for endor Image -->
              <div id="02" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="this.document.getElementById('02').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Profile Picture.</h3><hr class="dashhr">
                    <input v-model="newVendor.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="newVendor.name">
                  </header>
                </div>
              </div>

            </div>

            <!-- Vendor Information -->
            <div class="cont-border w3-container w3-cell w3-padding-16 w3-round-large">

              <!-- Change Name Modal-->
              <button v-on:click="this.document.getElementById(loggedVendor.name).style.display='block'" class="info-button-head w3-tooltip">Display Name: <span class="tag-text w3-text w3-tag">Edit Display Name</span></button> <button class="info-button-cont"> {{loggedVendor.name}}</button>
              <div :id="loggedVendor.name" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="resetNewVendor(loggedVendor.name)" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Change Display Name.</h3><hr class="dashhr">
                    <button class="type-button-head">Current Display Name >></button>
                    <input type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="loggedVendor.name" disabled>
                    <button class="type-button-head">New Display Name >></button>
                    <input v-model="newVendor.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="newVendor.name">
                    <button v-on:click="applyNameChanges(loggedVendor, newVendor.name)" class="c-button">Submit Changes</button>
                  </header>
                </div>
              </div>

              <!-- Change Email Modal-->
              <button v-on:click="this.document.getElementById(loggedVendor.email).style.display='block'" class="info-button-head w3-tooltip">Email: <span class="tag-text w3-text w3-tag">Edit Email Address</span></button> <button class="info-button-cont"> {{loggedVendor.email}} </button></br>
              <div :id="loggedVendor.email" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="resetNewVendor(loggedVendor.email)" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Change Email Address.</h3><hr class="dashhr">
                    <button class="type-button-head">Current Email Address >></button>
                    <input type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="loggedVendor.email" disabled>
                    <button class="type-button-head">New Email Address >></button>
                    <input v-model="newVendor.email" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="newVendor.email">
                    <button v-on:click="applyEmailChanges(loggedVendor, newVendor.email)" class="c-button">Submit Changes</button>
                  </header>
                </div>
              </div>

              <!-- Change Address Modal -->
              <button v-on:click="this.document.getElementById(loggedVendor.address).style.display='block'" class="info-button-head w3-tooltip">Address: <span class="tag-text w3-text w3-tag">Edit Address</span></button> <button class="info-button-cont"> {{loggedVendor.address}} </button></br>
              <div :id="loggedVendor.address" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="resetNewVendor(loggedVendor.address)" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Change Address.</h3><hr class="dashhr">
                    <button class="type-button-head">Current Address >></button>
                    <input type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="loggedVendor.address" disabled>
                    <button class="type-button-head">New Address >></button>
                    <input v-model="newVendor.address" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="newVendor.address">
                    <button v-on:click="applyAddressChanges(loggedVendor, newVendor.address)" class="c-button">Submit Changes</button>
                  </header>
                </div>
              </div>

              <!-- Change Phone Modal -->
              <button v-on:click="this.document.getElementById(loggedVendor.phone).style.display='block'" class="info-button-head w3-tooltip">Phone #: <span class="tag-text w3-text w3-tag">Edit Phone Number</span></button> <button class="info-button-cont"> {{formatPhone(loggedVendor.phone)}}</button>
              <div :id="loggedVendor.phone" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="resetNewVendor(loggedVendor.phone)" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Change Phone Number.</h3><hr class="dashhr">
                    <button class="type-button-head">Current Phone Number >></button>
                    <input type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="formatPhone(loggedVendor.phone)" disabled>
                    <button class="type-button-head">New Phone Number >></button>
                    <input v-model="newVendor.phone" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="newVendor.phone">
                    <button v-on:click="applyPhoneChanges(loggedVendor, newVendor.phone)" class="c-button">Submit Changes</button>
                  </header>
                </div>
              </div>
              
              <!-- Change Food Types -->
              <button v-on:click="setupFoodsEdit(loggedVendor)" class="info-button-head w3-tooltip" style="margin-left:45px;">Foods: <span class="tag-text w3-text w3-tag">Edit Food Types</span></button> 
              <button class="info-button-cont w3-tooltip"> {{shortenText(loggedVendor.foodTypes.toString().replace(',',', '), 18)}} <span class="tag-text w3-text w3-tag">{{loggedVendor.foodTypes.toString().replace(',',', ')}}</span></button></br>
              <div id="03" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="resetNewVendor('03')" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Change Food Types.</h3><hr class="dashhr">
                    <button class="type-button-head">Current Food Types >></button>

                    <div class="w3-container w3-border w3-margin w3-padding">
                      <template v-for="foodType in newVendor.foods">
                        <button v-on:click="changeTypes(foodType, newVendor.foods, allTypes)" class="type-button">{{foodType}}</button>
                      </template>
                    </div>

                    <button class="type-button-head">Available Food Types >></button>
                    <div class="w3-container w3-border w3-margin w3-padding">
                      <template v-for="foodType in allTypes">
                        <button v-on:click="changeTypes(foodType, allTypes, newVendor.foods)" class="type-button">{{foodType}}</button>
                      </template>
                    </div>

                    <button v-on:click="applyFoodChanges(loggedVendor, newVendor.foods)" class="c-button">Submit Changes</button>
                  </header>
                </div>
              </div>
              
              <template v-if="loggedVendor.approved">
                <button class="green-button-head w3-tooltip">Approved<span class="tag-text w3-text w3-tag">You Are Approved For Commerce.</span></button>
              </template>
              <template v-else>
                <button class="red-button-head w3-tooltip">Not Approved<span class="tag-text w3-text w3-tag">You Are Not Approved For Commerce.</span></button>
              </template>
              <button class="green-button-head">Change Password</button>
              <button class="green-button-head w3-tooltip">{{loggedVendor._creatorId}}<span class="tag-text w3-text w3-tag">Your Creator ID is...</span></button>
            </div>
            
          </div>


          <!-- Recent Sales Log -->
          <div class="sale-list w3-container w3-round-large">

            <!-- Section header -->
            <span class="subbanner-text">Sale Log</span><hr class="dashhr">


              <span class="subbanner-text-2">Total Sales: <span id="green-text">${{totalSales.toFixed(2)}}</span></span>

              <!-- Unordered List Definition -->
              <ul class="w3-ul">
                </br>
                <template v-if="typeof sortedSales[0] !== 'undefined'">
                  <template v-for="sale in sortedSales">
                    <li v-on:click="expandSale(sale._id)" class="indiv-item w3-center">
                      <button class="type-button-head">{{sale.date}}</button>
                    </li>
                    <div :id="sale._id" class="hidden-sale w3-hide w3-container">
                      <ul class="w3-ul">
                        <li><button class="type-button-small">Customer</button><span class="important">{{sale.customer}}</span></li>
                        <li><button class="type-button-small">Item</button><span class="important">{{sale.itemName}}</span></li>
                        <li><button class="type-button-small">Date</button><span class="important">{{sale.date}}</span></li>
                        <li><button class="type-button-small">Total</button><span class="important">${{sale.total}}</span></li>
                      </ul> 
                    </div>
                  </template>
                </template>
                <template v-else>
                  <p id="no-orders">You have no recorded sales.</p>
                </template>
              </ul>

            </span>

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
  import forMenuEdits from '../../mixins/dashboard/editMenuMixins';
  import forVendorEdits from '../../mixins/dashboard/editVendorMixins';
  import forCalculations from '../../mixins/dashboard/calculateMixins';
  import store from '../../store';

  export default {

    name: 'dashboard',

    mixins: [forItems, forOrders, forMenuEdits, forVendorEdits, forCalculations],

    data () {

      return {

          loggedVendor: {phone: '',
                         foodTypes: []},

          myItems: [],

          activeOrders: [],

          newItem: {
            name: '',
            cost: '',
            description: '',
            itemTypes: [],
            
          },

          processQueue: false,

          showRemoveAllButton: false,

          allTypes: ['Chicken','Beef','Seafood','Sandwich','Dessert','Healthy','Vegan','Snacks'],

          oldItem: {
            name: '',
            cost: '',
            description: '',
            itemTypes: []
          },

          newVendor: {
            name: '',
            email: '',
            address: '',
            phone: '',
            foods: []
          },

          sortedSales: [],

          totalSales: 0.00,

          imgSrc: '../../static/blankimg.png',

          myFile: null,

          isNext: false,

          imgItemId: ''
      }

    }


  }

</script>

<style scoped>

</style>