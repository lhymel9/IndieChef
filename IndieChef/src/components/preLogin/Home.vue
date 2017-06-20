<template>
    <div class="home">

        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        </head>

        <body>
            <div class="w3-container w3-black"><span>IndieChef</span></div>
            <div id="background" class="w3-container">

                <!-- Icon and Top-Screen Links -->
                <div class="w3-col w3-hide-small">
                    <img src="../../assets/logo.png">
                    <a id="button" href="#login" class="w3-button w3-xlarge"><span class="btn-txt">Login</span></a>
                    <a id="button" href="#browser" class="w3-button w3-xlarge"><span class="btn-txt">Browser</span></a>
                    <a id="button" href="#dashboard" class="w3-button w3-xlarge"><span class="btn-txt">Dashboard</span></a>
                    <a id="button" href="#about" class="w3-button w3-xlarge"><span class="btn-txt">About</span></a>
                </div>
                <div class="w3-col w3-center w3-hide-large w3-hide-medium">
                    <img src="../../assets/logo.png" style="padding:20px;">
                    <div class="w3-dropdown-hover">
                        <a id="button" class="w3-button w3-xlarge"><i class="material-icons">menu</i></a>
                        <div class="w3-dropdown-content w3-bar-block w3-card-4">
                            <a href="#login" class="w3-bar-item w3-button"><a class="btn-txt">Login</a></a>
                            <a href="#browser" class="w3-bar-item w3-button"><a class="btn-txt">Browser</a></a>
                            <a href="#dashboard" class="w3-bar-item w3-button"><a class="btn-txt">Dashboard</a></a>
                            <a href="#about" class="w3-bar-item w3-button"><a class="btn-txt">About</a></a>
                        </div>
                    </div>
                </div>

                <!-- Center Content Text For Large And Medium-->
                <div class="w3-col l8 m8 w3-hide-small" style="margin:125px 0px 90px 125px">
                    <h1 class="welcome-text">Welcome to <span class="yellow-text">Indie Chef</span></h1>
                </div>
                <div class="w3-col l4 m4 w3-hide-small" style="margin-left: 175px; margin-bottom: 35px">
                    <p class="welcome-subtext">A platform that connects <span class="yellow-text">freelance chefs</span> to <span class="yellow-text">hungry customers</span>...</p>
                </div>
                <div class="w3-col l8 m8 w3-hide-small" style="margin-left: 195px">
                    <a href="#browser" id="browse-button" class="c-button">Search for Food</a>
                    <a href="#register" id="register-button" class="c-button">Register a Vendor</a>
                </div>

                <!-- Center Content For Small -->
                <div class="w3-col s12 w3-hide-medium w3-hide-large w3-center" style="margin-top: 50px;">
                    <p class="welcome-text">Welcome to <span class="yellow-text">Indie Chef</span></p>
                </div>
                <div class="w3-col s12 w3-hide-medium w3-hide-large w3-center">
                    <p class="welcome-subtext">A platform that connects <span class="yellow-text">freelance chefs</span> to <span class="yellow-text">hungry customers</span>...</p>
                </div>
                <div class="w3-col s12 w3-hide-medium w3-hide-large w3-center">
                    <a href="#browser" id="browse-button" class="c-button">Search for Food</a>
                </div>
                <div class="w3-col s12 w3-hide-medium w3-hide-large w3-center">
                    <a href="#regiser" id="register-button" class="c-button">Register a Vendor</a>
                </div>

            </div>
            <main-tail></main-tail>
        </body>

    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        
    }
  }
}
</script>

<style scoped>

#background {
    background: url("../../assets/homeback.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height:1250px;
    width:100%;
    padding: 80px;
}

#button {
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    color: #252839;
}

.btn-txt {
    font-size: 22px;
    font-family: Verdana;
}

.welcome-text {
    font-size: 60px;
    font-family: Verdana;
    color: #252839;
}

.yellow-text {
    color: #f2b632;
}

.welcome-subtext {
    font-size: 32px;
    font-family: Verdana;
    color: #252839;
}

.c-button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 2px;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    font-family: Verdana;
}

#browse-button {
    background-color: #252839;
    color: #b5b5b7;
    border: 2px solid #252839;
}

#register-button {
    background-color: Transparent;
    border: 2px solid #f2b632;
    color: #f2b632;
}

#browse-button:hover {
    background-color: Transparent;
    color: black;
}

#register-button:hover {
    background-color: #f2b632;
    color: black;
}

</style>