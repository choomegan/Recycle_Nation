<template>
    <div id="options">
        <button v-on:click="login()"><span>Login</span></button>
        <button v-on:click="scanQR()"><span>Scan QR code</span></button>
    </div>
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
    padding: 200px 50px;
    background-color: #E8E1CF;
}
button {
    background-color: rgba(69, 85, 10, 0.459);
    color:white;
    font-size: 30px;
    font-family: Asap, Helvetica;
    border: none;
    margin: 20px;
    width: 290px;
    height: 125px;
    transition: all 0.5s;
    cursor: pointer;
    border-radius: 9px;
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

</style>