<template>
    <div id="MyAchievements">
        <div class="sideBySide">
            <div class="boxDisplay" v-for="item in data" v-bind:key="item.name"> 
                <div class="box">
                    <img id="star" v-bind:src= "completed(item.completed)"/>
                </div> 
                <br><br>
                <div class="box" id="name">
                    {{item.name}}
                </div>
                <div class="box" v-if="item.completed">
                    Achievement Unlocked!
                </div>
                <div class="box" v-if="!item.completed">
                    {{item.numberRequired}} more to go!
                </div>
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
            goldStar: require('../assets/goldStar.png'),
            greyStar: require('../assets/greyStar.png'),
            data: []
        }
    },
    methods: {
        completed: function(complete) {
            if (complete) {
                return this.goldStar;
            } else {
                return this.greyStar;
            }
        },
        retrieve: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
            }
            else {
                alert("Please log in to continue.")
                this.$router.push('/');
            }
            var email = user.email;
            db.collection(email).doc("Achievements").get().then((querySnapShot) => {
                console.log(querySnapShot.data())
                this.data = querySnapShot.data();
            })
        }
    },
    created: function() {
        this.retrieve();
    }
}
</script>

<style scoped>
#MyAchievements {
    font-size: 20px;
    padding: 100px;
    background-color: #E8E1CF;
}
.sideBySide {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
}
.side {
    padding: 20px;
    align-content:flex-start;
    width: 200px;
}
#star {
    height: 120px;
}
.boxDisplay {
    padding: 40px;
    justify-content: center;
    margin:10px;
    width: 300px;
    height: 300px;
    background-color:rgb(224, 212, 194);
}
.box {
    padding: 10px;
}

#name {
    font-weight: bold;
    font-size: 25px;
}
</style>