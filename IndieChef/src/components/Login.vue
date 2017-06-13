<template>
  <div class="login">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
      <main-head></main-head>
      <div class="w3-col l4 md2 s1 w3-center"></br></div>
      <div class="w3-col l4 md8 s10 w3-center">
        <div class="w3-card-4 w3-padding">
            <div class="w3-container w3-left-align "><div id="s-header">Sign In.</div></div>
            <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Email" style="margin-bottom:25px;">
            <input type="text" class="w3-bar-item w3-input w3-border w3-round-xlarge" placeholder="Password" style="margin-bottom:25px;">
            <input class="w3-check" type="checkbox">
            <label id="rmb">Rembember Me</label>
            </br>
            <a href="#" class="w3-bar-item w3-button w3-green" style="margin: 5px; margin-bottom: 15px;">Login</a>
            <a href="#register" class="w3-bar-item w3-button w3-green" style="margin: 5px; margin-bottom: 15px;">Register</a>
            </br>
            <a class="w3-button w3-white w3-hover-white" href="#forgot"><div class="flink" >Forgot my Password</div></a>
        </div>
      </div>
      <div class="w3-col l4 md2 s1 w3-center"></br></div>
      </br>
      <main-tail></main-tail>
    </body>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {}
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

  #rmb {
    padding: 5px;
    margin-bottom: 25px;
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
</style>