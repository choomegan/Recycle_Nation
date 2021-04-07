<template>
    <div id="Home">
        <p>Common Recyclable Items </p>
        <br>
        <div class="recycle-box">
            <div class="recycle" v-for="recycle in this.info" v-bind:key="recycle[0]">
                <p id="item">{{recycle.type}}</p>
                <ul v-for="item in recycle.data" v-bind:key="item">
                    <li>{{item}}</li>
                </ul>
            </div>
        </div>
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
                this.$router.push('/');
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
    border:solid;
    border-color: slategray;
    width:400px;
    text-align: left;
    font-size: 20px;
    border-width: 2px;
    padding:5px;
}
#item {
    font-weight:bold;
    color:darkgreen;
    font-size:25px;
    text-align: center;
}
p {
    font-size: 25px;
    font-weight:bold;
}
</style>