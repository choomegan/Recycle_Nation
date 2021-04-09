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
import db from "../firebase.js"
import firebase from 'firebase/app'
export default {
    data() {
        return {
            info: [
                {type: 'Paper',     data: ['Flyers, Letters, Envelopes', 'Newspaper', 'Flattened tissue box']},
                {type: 'Plastic',   data: ['Plastic packaging from food','Empty detergent, soap and condiment bottles', 'Cosmetic bottles and containers']},
                {type: 'Glass',     data: ['Empty condiment bottles and containers', 'Glassware']},
                {type: 'Metal',     data: ['Aluminum cans (from canned drinks and canned food)', 'Aerosal can']},
            ],
            email:"",
            data:{}
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
        },
        getData: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
                this.email = user.email;
            }
            else {
                alert("Please log in to continue.")
                this.$router.push('/Login');
            }
        },
        update: function() {
            db.collection(this.email).doc("Profile").get().then(snapShot => {
                var current = new Date()
                var diff = current.getTime()/1000 - snapShot.data()["dateJoined"]["seconds"]
                var days = Math.floor(diff/86400)
                if (days < 3) {
                db.collection(this.email).doc("Achievements").update({
                    0: {
                    completed: false,
                    type: "time",
                    count: days,
                    name: "Recycled for 3 days",
                    numberRequired: 3 - days
                    },
                    1: {
                    completed: false,
                    type: "time",
                    count: days,
                    name: "Recycled for 30 days",
                    numberRequired: 30 - days
                    }
                })
                } else if (days > 30) {
                db.collection(this.email).doc("Achievements").update({
                    0: {
                    completed: true,
                    type: "time",
                    count: days,
                    name: "Recycled for 3 days",
                    numberRequired: 0
                    },
                    1: {
                    completed: true,
                    type: "time",
                    count: days,
                    name: "Recycled for 30 days",
                    numberRequired: 0
                    }
                })
                } else {
                db.collection(this.email).doc("Achievements").update({
                    0: {
                    completed: true,
                    type: "time",
                    count: days,
                    name: "Recycled for 3 days",
                    numberRequired: 0
                    },
                    1: {
                    completed: false,
                    type: "time",
                    count: days,
                    name: "Recycled for 30 days",
                    numberRequired: 30 - days
                    }
                })
                }
            })
        }
    },
    created() {
        this.checkUser();
        this.getData();
        this.update()
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