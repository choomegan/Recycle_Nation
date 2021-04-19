<template>
<transition name="fade" enter-active-class="animated fadeIn" appear>
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
</transition>
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
                this.$router.push('/Login');
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
    font-size: 17px;
    font-family: Avenir, Helvetica;
    padding: 100px;
    /*background-color: #E8E1CF;*/
    object-fit: cover;
    background-image: url('~@/assets/forest-full.jpg');
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
    background-color:#f0eaddb0;
}
.box {
    padding: 10px;
}

#name {
    font-family: Asap, Avenir;
    color: rgb(65, 78, 47);
    font-weight: bold;
    font-size: 25px;
}
</style>