<template>
  <div class="register">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
      <main-head></main-head>
      <div class="w3-col l4 md2 s1 w3-center"></br></div>
      <div class="w3-col l4 md8 s10 w3-center">
        <div class="w3-card-4 w3-padding">
            <div class="w3-container w3-left-align "><div id="s-header">Create Account.</div></div>
            <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Email" style="margin-bottom:25px;">
            <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Password" style="margin-bottom:25px;">
            <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Confirm Password" style="margin-bottom:25px;">
            <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Address" style="margin-bottom:25px;">
            <div class="w3-bar w3-left">
                <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Zipcode" style="margin: 0px 15px 0px 0px">
                <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="State (AR, CA, etc)" style="margin: 0px 0px 0px 0px">
            </div>
            <div class="w3-container"><a href="#" class="w3-button w3-green" style="margin:25px;">Submit</a></div>
        </div>
      </div>
      <div class="w3-col l4 md2 s1 w3-center"></br></div>
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
      
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
</style>