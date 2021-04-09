<template>
    <div id="MyProfile">
        <div class="split">
            <div class="halves">
                <img v-bind:src="image" id="icon"/>
            </div>
            <div class="halves">
                <a id="name">{{username}} </a>
                <br>
                Joined {{date}} 
                <span>
                    <button v-on:click="logout">Log out</button>
                </span> 
            </div>
        </div>
        <br><br>
        <div id="status">
            Total Points:  
            <a id="points">{{points}}</a>
            <span id="routes" v-on:click="rewards">Rewards Shop</span>
            <br><br>
            Achievements: 
            <a id="points"> {{percent}}% </a>complete!
            <span id="routes" v-on:click="achievements">View All</span>
        </div>

        <div class="split">
            <div class="halves" v-for="i in 5" v-bind:key="i">
                <img v-bind:src="goldStar" id="star" v-if="i <= noOfGoldStars"/>
                <img v-bind:src="greyStar" id="star" v-if="i > noOfGoldStars"/>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase.js'

export default {
    data() {
        return {
            image:require('../assets/holding_plants.png'),
            points: 0,
            username: "",
            email:"",
            date: "",
            noOfGoldStars: 0,
            percent:0,
            goldStar: require('../assets/goldStar.png'),
            greyStar: require('../assets/greyStar.png'),
            
        }
    },
    methods: {
        rewards: function() {
            this.$router.push({path:"/MyRewards"})
        },
        achievements: function() {
            this.$router.push({path:"/MyAchievements"})
        },
        updatePage: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
            }
            else {
                alert("Please log in to continue")
                this.$router.push('/Login');
            }
            this.username = user.displayName;
            db.collection(user.email).doc("Profile").get().then((items) => {
                var datejoined = new Date(items.data().dateJoined.seconds*1000)
                var month = ('0' + (datejoined.getMonth() + 1)).slice(-2);
                var date = ('0' + datejoined.getDate()).slice(-2);
                var year = datejoined.getFullYear();
                var dateTimeNewFormat = date + '-' + month + '-' + year; 
                this.date = dateTimeNewFormat
                this.computeStar()
                this.points = items.data().points
            })
            
        },
        computeStar: function() {
            var user = firebase.auth().currentUser
            db.collection(user.email).doc("Achievements").get().then((doc) => {
                for (var i = 0; i < Object.keys(doc.data()).length; i++) {
                    if (doc.data()[i].completed) {
                        this.noOfGoldStars += 1;
                        console.log(this.noOfGoldStars)
                    }
                }
                this.percent = (this.noOfGoldStars/12 * 100).toFixed(2)
                this.noOfGoldStars = Math.floor(this.noOfGoldStars/12 * 5);
                console.log(this.noOfGoldStars)
            })
        },
        logout: function() {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                this.$router.push('/');
            }).catch((error) => {
                // An error happened.
                alert(error.message);
            });
        }
    },
    created: function() {
        this.updatePage();
    }
}
</script>

<style scoped>
#MyProfile {
    font-family: Avenir, Helvetica;
    font-size: 25px;
    padding: 100px;
    background-color: #E8E1CF;
    text-align: left;
}
#icon{
    width: 120px;
    mix-blend-mode: difference;
}

#star {
    height: 120px;
    color:goldenrod;
}

#routes {
    color:rgb(30, 144, 182);
    font-size: 20px;
    padding: 20px;
}

#routes:hover {
    text-decoration: underline;
}

.split {
    display: flex;
    flex-direction: row;
}

.halves {
    padding-right: 40px;
    padding-top:20px;
}

#name {
    font-family: Asap, Avenir;
    font-weight: 400;
    font-size: 35px;
}

#points {
    font-size: 32px;
    padding:20px;
}

button {
    font-size: 19px;
    font-family: Asap, Avenir;
    color: white;
    background-color: #7D6558;
    border: none;
    height: 40px;
    width: 120px;
    border-radius: 6px;
    margin-left: 20px;
}


button:hover {
    background-color: #7d6558d2;
}

#status {
    font-family: Avenir;
}
</style>