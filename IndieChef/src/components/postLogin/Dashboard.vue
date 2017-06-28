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

        <!-- Left-Hand Stuff -->
        <div class="item-col w3-col l6 m12 s12">

          <!-- Visible encapsulating element, overflow -->
          <div class="inner-item-list w3-container w3-round-large">

            <!-- Section header -->
            <span class="subbanner-text">Your Menu</span><hr>

            <!-- Unordered List Definition -->
            <ul class="w3-ul">

              <!-- All items, iterated as list elements -->
              <li v-for="item in myItems" class="indiv-item w3-padding-16 w3-border w3-round-xlarge">

                <!-- Item photo -->
                <div class="w3-container w3-cell">
                  <img :src="item.path" alt="Item Picture" class="item-img">
                </div>

                <!-- Item Information -->
                <div class="w3-container w3-cell w3-border">
                  <label class="i-text i-label">Name:</label> <span class="i-text w3-tooltip">{{shortenText(item.name, 16)}} <span class="tag-text w3-text w3-tag">{{item.name}}</span> </span></br>
                  <label class="i-text i-label">Cost:</label> <span class="i-text">{{item.cost}}</span></br>
                  <label class="i-text i-label">Description:</label> <span class="i-text w3-tooltip">{{shortenText(item.description, 18)}} <span class="tag-text w3-text w3-tag">{{item.description}}</span></span></br>
                  <label class="i-text i-label">Item Types:</label> <span class="i-text w3-tooltip">{{shortenText(item.itemTypes.toString(), 15)}}<span class="tag-text w3-text w3-tag">{{item.itemTypes.toString()}}</span></span>
                </div>

                <div class="sale-text w3-container w3-cell">
                  <div>Latest Sales:</div><hr id="a22">
                  <div v-for="sale in item.saleObjs.slice(-4)">
                    <span>{{sale.date}}</span></br>
                  </div>
                </div>

                <!-- Modal edit element and initiator -->
                <div class="w3-container w3-cell">
                  <a class="w3-tooltip" v-on:click="setupEdit(item)"><span class="tag-text w3-text w3-tag">Edit {{item.name}}</span><img src="../../assets/editpencil.png" alt="Vendor's Portrait" class="editpencil w3-image"></a>
                  
                  <!-- Modal Content -->                  
                  <div :id="item._saleId" class="w3-modal">
                    <div class="w3-modal-content w3-animate-zoom">
                      <header class="modal-back w3-container"> 
                        <span v-on:click="revertItem(item)" class="w3-button w3-display-topright">&times;</span>
                        <h3 class="edit-header">Edit Item.</h3><hr>
                        <input v-model="item.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.name">
                        <input v-model="item.cost" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.cost">
                        <input v-model="item.description" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="item.description">

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

                </div>

              </li>

              <!-- Add new item plus button (always present) -->
              <li class="indiv-item w3-padding-16 w3-border w3-round-xlarge">

                <!-- Modal add element and initiator -->
                <div class="w3-container w3-cell">
                  <div v-on:click="this.document.getElementById('01').style.display='block'" class="plus-img w3-border w3-tooltip"><span class="tag-text-3 w3-text w3-tag">Create New Item</span></div>
                  
                  <!-- Modal content -->
                  <div id="01" class="w3-modal">
                    <div class="w3-modal-content w3-animate-zoom">
                      <header class="modal-back w3-container"> 
                        <span v-on:click="this.document.getElementById('01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                        <h3 class="edit-header">Create Item</h3><hr>
                        <input v-model="newItem.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Item Name">
                        <input v-model="newItem.cost" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Item Cost">
                        <input v-model="newItem.description" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Item Description">

                        <!-- File upload zone -->
                        <img class="profile-pic" src="http://cdn.cutestpaw.com/wp-content/uploads/2012/07/l-Wittle-puppy-yawning.jpg" />
                        <div class="upload-button">Upload Image</div>
                        <input class="file-upload" type="file" accept="image/*"/>

                        <button v-if="showRemoveAllButton" class="btn btn-primary" @click="removeAll()">Remove all</button>

                      </header>
                    </div>
                  </div>
                </div>
                <div class="text-cont w3-container w3-cell">
                  <span class="plus-text">Create a new menu item.</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Active Orders -->
          <div class="active-cont w3-container w3-round-large">

            <!-- Section header -->
            <span class="subbanner-text">Active Orders</span><hr>

            <!-- Unordered List Definition -->
            <ul class="w3-ul">

              <!-- If there are active orders -->
              <template v-if="typeof activeOrders[0] !== 'undefined'">

                <!-- All active orders, iterated as list elements -->
                <li v-for="order in activeOrders" class="indiv-item w3-border w3-round-xlarge">

                  <!-- Order Information -->
                  <div class="w3-container w3-cell">
                    <label class="o-label">Item: </label><span class="o-text">{{order.item}}</span>
                    <label class="o-label">To: </label><span class="o-text">{{order.customer}} ({{order.customerEmail}})</span>
                    <label class="o-label">Total: </label><span class="important">${{order.cost}}</span></br>
                    <label class="o-label">Due: </label><span class="o-text">{{new Date(order.deliveryDate).toLocaleString()}}</span><span class="important">({{timeToDue(order.deliveryDate)}})</span>
                  </div>

                  <!-- Modal actions element and initiator -->
                  <div class="w3-container w3-cell">
                    <a v-on:click="this.document.getElementById(order._id).style.display='block'" class="mag-glas material-icons w3-xxlarge w3-text-white">arrow_forward</a>

                    <!-- Modal Content -->
                    <div :id="order._id" class="w3-modal">
                      <div class="w3-modal-content w3-animate-zoom">
                        <header class="modal-back w3-container">
                          <span v-on:click="this.document.getElementById(order._id).style.display='none'" class="w3-button w3-display-topright">&times;</span>
                          <h3 class="edit-header">Order Actions.</h3><hr>
                          <h6 class="edit-header">Order for --- {{order.customer}} ({{order.customerEmail}})</h6>
                          <button class="c-button">Delay Order</button>
                          <button class="c-button">Cancel Order</button>
                          <textarea type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Reason for action."></textarea>
                        </header>
                      </div>
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
          <div class="info-panel w3-container w3-cell w3-round-large">
            <span class="subbanner-text w3-margin">Vendor Profile</span><hr>
            <div class="w3-container w3-cell w3-padding-16">
              <div v-on:click="this.document.getElementById('02').style.display='block'" class="vendor-img w3-border w3-tooltip"><span class="tag-text-2 w3-text w3-tag">Edit Profile Picture</span></div>
              
              <!-- Modal Content for endor Image -->
              <div id="02" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="this.document.getElementById('02').style.display='none'" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Profile Picture.</h3><hr>
                    <input v-model="newVendor.name" type="text" class="edit-input w3-bar-item w3-input w3-border w3-round-xlarge" :placeholder="newVendor.name">
                  </header>
                </div>
              </div>

            </div>

            <!-- Vendor Information -->
            <div class="w3-container w3-cell w3-padding-16">

              <!-- Change Name Modal-->
              <button v-on:click="this.document.getElementById(loggedVendor.name).style.display='block'" class="info-button-head w3-tooltip">Display Name: <span class="tag-text w3-text w3-tag">Edit Display Name</span></button> <button class="info-button-cont"> {{loggedVendor.name}}</button>
              <div :id="loggedVendor.name" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom">
                  <header class="modal-back w3-container">
                    <span v-on:click="resetNewVendor(loggedVendor.name)" class="w3-button w3-display-topright">&times;</span>
                    <h3 class="edit-header">Change Display Name.</h3><hr>
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
                    <h3 class="edit-header">Change Email Address.</h3><hr>
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
                    <h3 class="edit-header">Change Address.</h3><hr>
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
                    <h3 class="edit-header">Change Phone Number.</h3><hr>
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
                    <h3 class="edit-header">Change Food Types.</h3><hr>
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
  import forItemEdits from '../../mixins/dashboard/editItemMixins';
  import forVendorEdits from '../../mixins/dashboard/editVendorMixins';
  import store from '../../store';

  import Droply from 'droply'

  export default {

    name: 'dashboard',

    mixins: [forItems, forOrders, forItemEdits, forVendorEdits],

    components: {
        Droply
    },

    data () {

      return {

          loggedVendor: {phone: '',
                         foodTypes: []},

          myItems: [],

          activeOrders: [],

          newItem: {
            name: '',
            cost: '',
            description: ''
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
          }

      }

    },

    methods: {
        onFileAdded() {
            this.showRemoveAllButton = true;
        },
        onFileRemoved() {
            this.showRemoveAllButton = false;
        },
        onSuccess(file) {
            console.log('A file was successfully uploaded');
        },
        removeAll() {
            this.$refs.droplyOne.removeAllFiles();
        }
    }

  }

</script>

<style scoped>

  .upload-button {
    padding: 4px;
    border: 1px solid black;
    border-radius: 5px;
    display: block;
    float: left;
  }

  .profile-pic {
      max-width: 200px;
      max-height: 200px;
      display: block;
  }

  .file-upload {
      display: none;
  }

  hr {
    display: block;
    margin-top: 0.3em;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
  }

  #a22 {
    margin-bottom: 0.5em;
  }

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

  #upload-button {
    float: left;
    margin-bottom:25px;
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
    background-color: #062F4F;
    border: 2px solid #f2b632;
    padding:25px;
    width: 100%;
  }

  .item-img, .item-img-edit {
    background-color: Transparent;
    width: 125px;
    height: 125px;
    border: 2px solid #b5b5b7;
  }

  .item-img-edit {
    margin-left: 30px;
  }

  .plus-img {
    background-image: url("../../assets/plus.png");
    background-size: 125px 125px;
    width: 125px;
    height: 125px;
  }

  .vendor-img {
    background-image: url("../../assets/logo.png");
    background-size: 165px 165px;
    width: 160px;
    height: 165px;
  }

  .i-text {
    font-family: Verdana;
    font-size: 14px;
    color:#b5b5b7;
  }

  .i-label {
    color: #f2b632;
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
    bottom:30px;
  }

  .tag-text-2 {
    position: absolute;
    font-size: 36px;
  }

  .tag-text-3 {
    position: absolute;
    font-size:27.5px;
  }

  .indiv-item {
    margin-bottom:10px;
  }

  .sale-text {
    color: white;
    padding-left:60px;
    padding-right:60px;
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

  .type-button, .type-button-head, .info-button-head, .info-button-cont, .red-button-head, .green-button-head {
    margin: 5px;
    border-radius: 3px;
	  font-family: 'Impact';
	  font-size: 18px;
    background-color: #00BFFF;
    border: none;
	  color: black;
  }

  .type-button-head, .red-button-head, .green-button-head {
    background-color: #7CFC00;
    margin-right: 10px;
    font-family: Verdana;
  }

  .info-button-head, .red-button-head, .green-button-head {
    margin-bottom: 8px;
    background-color: #2B8CA9;
    color: #DCDCDC;
    font-family: Verdana;
    font-weight: bold;
  }

  .info-button-cont {
    margin-bottom: 8px;
    background-color: #00CED1;
    color: black;
    font-family: Verdana;
    font-size: 16px;
  }

  .red-button-head {
    background-color: red;
    margin-top: 10px;
  }

  .green-button-head {
    background-color: green;
    margin-left: 5px;
    margin-top: 10px;
  }

  .info-button-head:hover, .green-button-head:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.35), 0 17px 50px 0 rgba(0,0,0,0.30);
    color: black;
  }

</style>