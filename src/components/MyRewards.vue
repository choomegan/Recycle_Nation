<template>
    <div id="MyRewards">
        <div class="split">
            <div class="halves">
                <p>Rewards Catalog </p>
                <div class="sideBySide">
                    <div class="side" v-for="item in rewardsCatelog" v-bind:key ="item.title">
                        <img id="icon" v-bind:src="item.image"/>
                        <br>
                        {{item.name}}
                        <br>
                        {{item.points}} points
                        <br>
                        <button v-on:click="confirmRedemption(item)">Exchange</button>
                        <br><br>
                    </div>
                </div>
            </div>
            <div class="halves">
                <p>My Rewards</p>
                <div class="start" v-if="myRewards.length==0">
                    You have no existing rewards.
                </div>
                <div v-for="item in myRewards" v-bind:key="item.code">
                    <div class="block">
                        <img class="left" v-if="item.title == 'GrabFood'" v-bind:src="item.image"/>
                        <img class="left" v-if="item.title == 'GrabGifts'" v-bind:src="item.image"/>

                        <div class="right" v-if="item.title == 'GrabFood'" >
                            $10 GrabFood voucher
                            <br>{{item.code}}
                        </div>
                        
                        <div class="right" v-if="item.title == 'GrabGifts'">
                            $10 GrabGifts voucher
                            <br>{{item.code}}
                        </div>
                        <div id="cross">
                            <button v-on:click="deleteReward(item)"> X </button>
                        </div>
                    </div>
                    <br>
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
            points:0,
            myRewards: [],
            rewardsCatelog: [
                {
                    title: "tree",
                    name: "Plant a real tree!",
                    image: require('../assets/tree.png'),
                    points: 500,
                    code: "",
                },
                {
                    title: 'GrabFood',
                    name: "$10 GrabFood Voucher",
                    image: require('../assets/grabFood.png'),
                    points: 500,
                    code: "",
                },
                {
                    title: "GrabGifts",
                    name: "$10 GrabRide Voucher",
                    image: require('../assets/grabGifts.png'),
                    points: 500,
                    code: "",
                },
                {
                    title: "Donate",
                    name: "Donate $1!",
                    image: require('../assets/donate.png'),
                    points: 100,
                    code: "",
                },
            ],
            
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
        confirmRedemption: function(item) {
            var msg = 'Redeem reward [' + item.name + '] ?'
            if(confirm(msg)) {
                console.log('Clicked on proceed');
                this.redeem(item)
            } else {
                console.log('Clicked on cancel');
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
                    this.success(item)
                    console.log(this.myRewards)
                    
                }
            })
        },
        success(item) {
            if (item.title =="tree"){
                alert("Congratulations you have planted a tree!")
            } else if (item.title == "GrabFood") {
                item = {
                    title: 'GrabFood',
                    name: "$10 GrabFood Voucher",
                    image: require('../assets/grabFood.png'),
                    points: 500,
                    code: "",
                }
                item.code = this.displayCode(item);
                this.myRewards.push(item);
                alert("Congratulations you have redeemed a GrabFood Voucher! You can now view the voucher and redemption code at [My Rewards]")
            } else if (item.title == "GrabGifts") {
                item = {
                    title: 'GrabGifts',
                    name: "$10 GrabGifts Voucher",
                    image: require('../assets/grabGifts.png'),
                    points: 500,
                    code: "",
                }
                item.code = this.displayCode(item);
                this.myRewards.push(item);
                alert("Congratulations you have redeemed a GrabGifts Voucher! You can now view the voucher and redemption code at [My Rewards]")
            } else if (item.title == "Donate") {
                alert("Congratulations you have donated $1!")
            }
        },
        displayCode: function(item) {
            var code;
            if (item.code != "") {
                return item.code;
            }
            if (item.title == "GrabFood") {
                code = "Grab Code: GF10" 
            } else if (item.title == "GrabGifts") {
                code = "Grab Code: GG10"
            }
            let chars = "abcdefghijklmnopqrstuvwxyz"
            for( let i=0; i < 3; i++ ) {
                code += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            return code.toUpperCase();
        },
        deleteReward: function(item) {
            var index;
            for (index = 0; index < this.myRewards.length; index++) {
                if (item.code == this.myRewards[index].code) {
                    this.myRewards.splice(index, 1);
                    break;
                }
            }
        }
    },
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
    padding: 40px;
    background-color:oldlace;
    margin:10px;
}
.side {
    background-color:oldlace;
    width: 300px;
}
.start {
    width: 430px;
}
.block {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content:space-evenly;
    width:430px;
    padding: 20px 10px 20px 30px;
    background-color:white;
}
.right {
    padding: 10px;
    font-size: 20px;
}
.left {
    height: 80px;
    width: 120px;
}
#icon {
    height: 110px;
    max-width: 250px;
}
#cross {
    padding: none;
}
p {
    font-size: 30px;
    text-decoration-line:underline;
}
</style>