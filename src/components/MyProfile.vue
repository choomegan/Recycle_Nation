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
            </div>
        </div>
        <br><br>
        <div>
            Total Points earned: 
            <a id="points">{{points}}</a>
            <span id="routes" v-on:click="rewards">Rewards Shop</span>
            <br><br>
            Achievements
            <span id="routes" v-on:click="achievements">View All</span>
        </div>

        <div class="split">
            <div class="halves" v-for="i in 3" v-bind:key="i">
                <img v-bind:src="goldStar" id="star"/>
            </div>
            <div class="halves" v-for="i in 2" v-bind:key="i">
                <img v-bind:src="greyStar" id="star"/>
            </div>
        </div>
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
            date: "",
            goldStar: require('../assets/goldStar.png'),
            greyStar: require('../assets/greyStar.png')
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
            this.username = user.displayName;
            db.collection(user.email).doc("Profile").get().then((items) => {
                this.date = items.data().dateJoined
                this.points = items.data().points
                console.log(items.data())
            })

        }
    },
    created: function() {
        this.updatePage();
    }
}
</script>

<style scoped>
#MyProfile {
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
}

#routes {
    color:deepskyblue;
    padding: 20px;
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
    font-weight: bold;
    font-size: 35px;
}

#points {
    font-size: 30px;
    padding:20px;
}

</style>