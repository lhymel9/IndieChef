<template>
  <div class="home">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css">
    </head>

    <body>

      <div class="w3-bar w3-black">
        <span class="w3-bar-item w3-mobile" style="font: 20px Courier">Indie Chef</span>
        <span class="w3-right w3-mobile">
          <a href="#" class="w3-bar-item w3-button">Home</a>
          <a href="#login" class="w3-bar-item w3-button">Login</a>
          <a href="#about" class="w3-bar-item w3-button">About</a>
          <a href="#terms" class="w3-bar-item w3-button">Terms of Service</a>
        </span>
      </div>

      <div class="cooking-banner">
        <div class="w3-container w3-center w3-mobile">
          <h1>Welcome to Indie Chef</h1>
          <button class="first-button">Search Food</button>
          <br>
          <button class="first-button">Vendor Login</button>
        </div>
      </div>

      <div class="w3-panel w3-border w3-light-gray w3-xxxlarge w3-mobile">
        <img src="../assets/tos.png" class="tos-book">
        <a class="tip">Don't Forget to Read Our General Rules and Terms of Service.</a>
        <button class="ToS-Arrow-Button"><span>Read</span></button>
      </div> 

    </body>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
      
  }
}
</script>

<style scoped>

  a {
      font: 20px Courier;
  }

  a.tip {
      font: 25px Courier;
  }

  h1 {
      font: 50px Courier;
      margin: 62px 10px;
  }

  .tos-book {
      margin: 25px 55px 25px 185px;
      box-shadow: 0 6px 10px 0 #202020;
  }

  .cooking-banner {
      background: url('../assets/cooking.png') no-repeat;
      background-position: center;
      height: 800px;
      background-size: cover;
      color: #fff;
      box-shadow: 0 6px 10px 0 #202020;
  }

  .first-button {
      background-color: #4487b0;
      border: 4px solid #4487b0;
      color: white;
      border-radius: 8px;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      font: 30px Courier;
      margin: 55px 10px;
      cursor: pointer;
      width: 40%;
      box-shadow: 0 6px 10px 0 #202020;
  }

  .first-button:hover {
      background-color: #4468b0;
      border: 4px solid #1d3963;
  }

  .ToS-Arrow-Button {
      display: inline-block;
      border-radius: 4px;
      background-color: #4487b0;
      border: none;
      color: #FFFFFF;
      text-align: center;
      font-size: 28px;
      padding: 20px;
      width: 200px;
      height: 150px;
      transition: all 0.5s;
      cursor: pointer;
      margin: 0px 0px 0px 0px;
  }

  .ToS-Arrow-Button span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;
  }

  .ToS-Arrow-Button span:after {
      content: '\00bb';
      position: absolute;
      opacity: 0;
      top: 0;
      right: -20px;
      transition: 0.5s;
  }

  .ToS-Arrow-Button:hover span {
      padding-right: 25px;
  }

  .ToS-Arrow-Button:hover span:after {
      opacity: 1;
      right: 0;
  }

</style>