<template>
    <transition name="fade" enter-active-class="animated fadeIn" appear>
    <div id="options">
        <h2>Welcome to Recycle Nation!</h2> 
        <button v-on:click="login()"><span>Login</span></button>
        <button v-on:click="scanQR()"><span>Scan QR code</span></button>
    </div>
    </transition>
</template>

<script>
export default {
    methods: {
        login : function() {
            this.$router.push({path:"/Login"})
        },
        scanQR : function() {
            this.$router.push({path:"/QR"})
        }
    }
}
</script>

<style scoped>
#options {
    text-align: center;
    padding-top: 250px;
    padding-bottom: 350px;
    background-image: url('~@/assets/forest-full2.jpg');
    height: 100%;
    margin:0;
    background-size: cover;
}
button {
    background-color: rgb(185, 140, 72);
    color:white;
    font-size: 27px;
    font-family: Asap, Helvetica;
    border: none;
    margin: 20px;
    width: 255px;
    height: 120px;
    transition: all 0.5s;
    cursor: pointer;
    border-radius: 26px;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

button:hover span {
  padding-right: 25px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}

h2 {
    font-family: Asap;
    color:white;
    margin-top: 0;
    margin-bottom: 0;
    padding: 50px;
    font-weight: 600;
    font-size: 35px;
}
</style>