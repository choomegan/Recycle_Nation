<template>
    <div id="MyRewards">
        <div class="split">
            <div class="halves">
                <p>Rewards Catalog </p>
                <div class="sideBySide">
                    <div class="side" v-for="item in rewards" v-bind:key ="item.title">
                        <img id="icon" v-bind:src="item.image"/>
                        <br>
                        {{item.name}}
                        <br>
                        {{item.points}} points
                        <br>
                        <button v-on:click="redeem(item)">Exchange</button>
                        <br><br>
                    </div>
                </div>
            </div>
            <div class="halves">
                <p>My Rewards</p>
                You currently have no existing rewards.
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
            points:0,
            rewards: [
                {
                    title: "tree",
                    name: "Plant a real tree!",
                    image: require('../assets/tree.png'),
                    points: 500,
                },
                {
                    title: 'GrabFood',
                    name: "$10 GrabFood Voucher",
                    image: require('../assets/grabFood.png'),
                    points: 500,
                },
                {
                    title: "grabGifts",
                    name: "$10 GrabRide Voucher",
                    image: require('../assets/grabGifts.png'),
                    points: 500,
                },
                {
                    title: "donate",
                    name: "Donate $1!",
                    image: require('../assets/donate.png'),
                    points: 100,
                },
            ]
        }
    }, 
    methods: {
        checkUser: function(item) {
            var currentUser = firebase.auth().currentUser;
            if (currentUser == null) {
                console.log("no user logged in")
            } else {
                console.log(currentUser.email)
                this.redeem(item)
            }
        },
        redeem: function(item) {
            var currentUser = firebase.auth().currentUser;
            db.collection(currentUser.email).doc("Profile").get().then((doc) => {
                this.points = doc.data().points;
                console.log(currentUser.email, this.points, item.title)
                if (this.points - item.points < 0) {
                    console.log(this.points, item.title)
                    alert("You do not have enough points to redeem this reward. Recycle more to earn more points!")
                } else {
                    this.points -= item.points;
                    db.collection(currentUser.email).doc("Profile").update({
                        points: this.points
                    }).then(() => console.log("Successfully updated points")).catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                }
            })
            
        }
    }
}
</script>

<style scoped>
#MyRewards {
    font-size: 25px;
    padding: 50px;
    background-color: #E8E1CF;
}
.split {
    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
}
.sideBySide {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: center;
}
.halves {
    padding: 20px 100px 20px 100px;
    background-color:oldlace;
    margin:10px;
}


.side {
    background-color:oldlace;
    padding: 10px;
    width: 300px;

}

#icon {
    height: 120px;
    max-width: 250px;
}

p {
    font-size: 30px;
    text-decoration-line:underline;
}
</style>