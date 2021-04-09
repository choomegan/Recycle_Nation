<template>
    <div id="Home">
        <p id="header">Common Recyclable Items </p>
        <br>
        <div class="recycle-box">
            <div class="recycle" v-for="recycle in this.info" v-bind:key="recycle[0]">
                <p id="item">{{recycle.type}}</p>
                <ul v-for="item in recycle.data" v-bind:key="item">
                    <li>{{item}}</li>
                </ul>
            </div>
        </div><br> 
        <div id="disclaimer">Empty all food waste and liquids before recycling!</div> 
    </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
    data() {
        return {
            info: [
                {type: 'Paper',     data: ['Flyers, Letters, Envelopes', 'Newspaper', 'Flattened tissue box']},
                {type: 'Plastic',   data: ['Plastic packaging from food','Empty detergent, soap and condiment bottles', 'Cosmetic bottles and containers']},
                {type: 'Glass',     data: ['Empty condiment bottles and containers', 'Glassware']},
                {type: 'Metal',     data: ['Aluminum cans (from canned drinks and canned food)', 'Aerosal can']},
            ]
        }
    },
    methods: {
        checkUser: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
            }
            else {
                alert("Please log in to continue.")
                this.$router.push('/Login');
            }
        }
    },
    created() {
        this.checkUser();
    }
}
</script>

<style scoped>
#Home {
    padding: 100px;
    background-color: #E8E1CF;
    text-align: center;
    min-height: 500px;
}
.recycle-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.recycle {
    font-family: Avenir, Helvetica;
    border:solid;
    border-color: #b1a68c;
    width:400px;
    text-align: left;
    font-size: 20px;
    border-width: 1px;
    padding:5px;
}
#item {
    font-family: Avenir, Helvetica;
    font-weight:bold;
    color:rgb(57, 87, 52);
    font-size:25px;
    text-align:center;
}
p {
    font-size: 25px;
    font-weight:bold;
}

#header {
    font-family: Asap, Avenir;
    font-weight: bold;
}

#disclaimer {
    font-family: Avenir, Helvetica;
    font-weight: bold;
    font-size: 18px;
    color: rgb(112, 40, 40);
}
</style>