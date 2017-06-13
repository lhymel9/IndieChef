<template>
    <div class="home">

        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body>
            <section id="cooking-banner">
                <section class="banner-subsect">
                    <div class="w3-row">
                        <div class="w3-col m3 w3-center ">
                            <div id="logo-text">Indie Chef</div>
                        </div>
                        <div class="w3-col m6  w3-center ">
                            <button id="home-button" href="#">
                                <img src="../assets/logo.png" id="logo-img">
                            </button>
                        </div>
                        <div class="w3-col m3  w3-center">
                            <div id="overlay">
                                <a href="#login" id="overlay-button1">Login</a>
                                <a class="div-pipe">|</a>
                                <a href="#about" id="overlay-button2">About</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="banner-subsect">
                    <div class="w3-row w3-mobile">
                        <div class="w3-col l1 m1 s1 w3-center w3-mobile"></br></div>
                        <div class="w3-col l10 m10 s10 w3-center w3-mobile">
                            <div class="w3-bar w3-light-grey w3-large">
                                <input type="text" class="w3-bar-item w3-input w3-mobile" placeholder="Enter Zipcode..">
                                <a href="#login" class="w3-bar-item w3-button w3-blue w3-border w3-mobile"><a class="button-text">Search</a></a>
                                <div class="w3-dropdown-hover w3-mobile">
                                    <button class="w3-button w3-green w3-border w3-mobile"><a class="button-text">Food Type</a></button>
                                    <div class="w3-dropdown-content w3-bar-block w3-card-4">
                                        <a href="#" class="w3-bar-item w3-button">Link 1</a>
                                        <a href="#" class="w3-bar-item w3-button">Link 2</a>
                                        <a href="#" class="w3-bar-item w3-button">Link 3</a>
                                    </div>
                                </div>
                                <template v-if="searchType === 'byFood'">
                                    <button class="w3-button w3-green w3-border w3-mobile"><a class="button-text">By Chef</a></button>
                                </template>
                                <template v-else>
                                    <button class="w3-button w3-green w3-border w3-mobile"><a class="button-text">By Food</a></button>
                                </template>
                            </div>
                        </div>
                        <div class="w3-col l1 m1 s1 w3-center"></br></div>
                    </div>
                </section>
                <section class="banner-subsect">
                    <div class="w3-row w3-mobile">
                        <div class="w3-col l1 m1 s1 w3-center w3-mobile"></br></div>
                        <div class="w3-col l10 m10 s10 w3-center w3-mobile">
                            <div class="w3-bar w3-center w3-large w3-mobile">
                                <a href="#login" class="w3-bar-item w3-button w3-blue w3-border w3-mobile"><a class="button-text2">Click Here to Login</a></a>
                            </div>
                        </div>
                        <div class="w3-col l1 m1 s1 w3-center w3-mobile"></br></div>
                    </div>
                </section>
            </section>
            <section class="hover-sect">
                    <div class="w3-row w3-mobile">
                        <div class="w3-col l1 m1 w3-center "></br></div>
                        <div class="w3-col l3 m12 w3-center">
                            <img src="../assets/tos.png" class="tos-book">
                        </div>
                        <div class="w3-col l4 m12 w3-center">
                            </br>
                            <p class="tip-text">Don't forget to read our general rules and terms of service.</p>
                        </div>
                        <div class="w3-col l3 m12 w3-center">
                            </br>
                            <button class="tip-button">>></button>
                        </div>
                        <div class="w3-col l1 m1 w3-center"></br></div>
                    </div>
            </section>
            <main-tail></main-tail>
        </body>

    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        searchType: 'byChef'
    }
  }
}
</script>

<style scoped>

#cooking-banner {
    background: url("../assets/cooking.png") no-repeat;
    background-position: center;

    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    height: 1100px;
    color: #fff;
}

.banner-subsect {
    margin-bottom: 150px;
}

.hover-sect {
    background-color: #EDEDED;
    -moz-box-shadow: 0 0 3px #000;
    -webkit-box-shadow: 0 0 3px #000;
    box-shadow: 0px 45px 75px #000;
    margin-top: -15px;
}

.tos-book {
    margin: 45px;
    margin-right: 15px;
}

.tip-text {
    margin: 45px;
    font-size:35px;
    font-family: Verdana;
}

.tip-button {
    margin: 45px;
    margin-left:15px;
    font-size:35px;
    font-family: Verdana;
    background-color: #2196F3;
    color: white;
    height:150px;
    width:200px;
    border-radius:8px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.tip-button:hover {
    background-color: #CCC;
    color: black;
    box-shadow: 0 10px 18px 0 rgba(0,0,0,0.5), 0 8px 22px 0 rgba(0,0,0,0.25);
}

#logo-img {
    margin-top: 10px;
}

#logo-text {
    font-size:35px;
    font-family: Verdana;
    text-shadow: 4px 4px 6px #000000;
    margin-top: 20px;
}

#overlay {
    margin-top: 20px;
}

#overlay-button1 {
    background-color: Transparent;
    border: none;
    color: white;
    font-size: 15px;
    font-family: Verdana, sans-serif;
    padding:5px;
}

.div-pipe {
    font-size: 25px;
}

#home-button {
    background-color: Transparent;
    border: none;
}

#overlay-button2 {
    background-color: Transparent;
    border: none;
    color: white;
    font-size: 15px;
    padding:5px;
    font-family: Verdana, sans-serif;
}

#overlay-button1:hover {
    color: #A9A9A9;
    text-shadow: 2px 2px 4px #000000;
    text-decoration: none;
}

#overlay-button2:hover {
    color: #A9A9A9;
    text-shadow: 2px 2px 4px #000000;
    text-decoration: none;
}

.button-text {
    font-size: 17px;
    font-family: Verdana, Geneva, sans-serif;
}

.button-text2 {
    font-size: 35px;
    font-family: Verdana, Geneva, sans-serif;
}

</style>