<template>
  <div class="login">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>

      <div class="w3-container w3-blue w3-border">
        <h1 id="logo-text">Indie Chef</h1>
      </div>

      <div class="pusher"></div>

      <div class="w3-col l4 md3 w3-center"></br></div>

      <div class="w3-col l4 md6 s12 w3-center">
        <div class="w3-card-4 w3-padding">
            <div class="w3-container w3-left-align "><div id="s-header">Sign In.</div></div>
            </br>
            <input type="text" class="w3-bar-item w3-input w3-border" placeholder="Email">
            </br>
            <input type="text" class="w3-bar-item w3-input w3-border" placeholder="Password">
            </br>
            <input class="w3-check" type="checkbox">
            <label id="rmb">Rembember Me</label>
            </br>
            </br>
            </br>
            <a href="#" class="w3-bar-item w3-button w3-green">Login</a>
            <a href="#register" class="w3-bar-item w3-button w3-green">Register</a>
            </br>
            </br>
            <div class="w3-contain w3-center">
              <button class="w3-button w3-white w3-hover-white" href="#forgot"><div class="flink">Forgot my Password</div></button>
            </div>
        </div>
      </div>

      <div class="w3-col l4 md3 w3-center"></br></div>

    </body>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
      
  }
}
</script>

<style scoped>
  #logo-text {
    padding: 10px;
    font-size: 35px;
    font-family: Verdana;
  }

  .pusher {
    padding:65px;
  }

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