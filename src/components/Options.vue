<template>
    <div id="options">
        <button v-on:click="login()">Login</button>
        <button v-on:click="scanQR()">Scan QR code</button>
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
    font-size: 30px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    padding: 200px 50px;
    background-color: #E8E1CF;
}
button {
    background-color: cornsilk;
    color:darkgreen;
    padding: 100px 50px;
    font-size: 55px;
    margin: 20px;
    width: 500px;
    
}
</style>