<template>
    <transition name="fade" enter-active-class="animated fadeIn" appear>
    <div id="MyRewards">
        <div class="split">
            <div class="halves">
                <p>Rewards Catalogue</p>
                <div class="sideBySide">
                    <div class="side" v-for="(item, index) in rewardsCatelog" v-bind:key ="item.title">
                        <img id="icon" v-bind:src="item.image"/>
                        <br>
                        <div id="name">
                            {{item.name}}
                        </div> 
                        <div id="pts"> 
                            {{item.points}} points
                        </div>
                        <redemption v-bind:item=item :email=email
                         v-show="modalVisible==index" v-on:success="success(item)" @close="closeModal"></redemption>
                        <button v-on:click="showModal(item, index)">Exchange</button>
                        <br><br>
                    </div>
                </div>
            </div>
            <div class="halves">
                <p>My Rewards</p>
                <div class="start" v-if="myRewards.length==0">
                    You have no existing rewards.
                </div>
                <div v-for="(item, index) in myRewards" v-bind:key="item.code">
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
                        <div>
                            <deletion v-bind:item=item 
                            v-show="deleteVisible==index" v-on:deleted="deleteReward(item)" @close="closeModal"></deletion>
                            <button id="cross" v-on:click="showDeletion(item, index)"> X </button>
                        </div>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase.js'
import Redemption from './Redemption.vue'
import Deletion from './Deletion.vue'

export default {
    components: {
        Redemption,
        Deletion
    },
    data() {
        return {
            points:0,
            myRewards: [],
            email: "",
            modalVisible: null,
            deleteVisible:null,
            rewardsCatelog: [
                {
                    title: "tree",
                    name: "Plant a real tree!",
                    image: require('../assets/tree2.png'),
                    points: 500,
                    code: "",
                },
                {
                    title: 'GrabFood',
                    name: "$10 GrabFood Voucher",
                    image: require('../assets/food.png'),
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
        checkUser: function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user== null) {
                    console.log("not logged in")
                    alert("Please log in to continue.")
                    this.$router.push('/Login');
                } else {
                    console.log(user)
                    this.email = user.email;
                    console.log(this.email)
                    this.getMyRewards();
                }
            })
        },
        showModal(item, index) {
            this.modalVisible = index;
            console.log(item.name)
        },
        closeModal() {
            this.modalVisible = null;
            this.deleteVisible =null;
        },
        showDeletion(item, index) {
            this.deleteVisible = index;
            console.log(item.name)
        },
        success(item) {
            this.closeModal()
            if (item.title == "GrabFood") {
                item = {
                    title: 'GrabFood',
                    name: "$10 GrabFood Voucher",
                    image: require('../assets/food.png'),
                    points: 500,
                    code: "",
                }
                item.code = this.displayCode(item);
                console.log(this.myRewards);
                this.myRewards.push(item);
                this.updateDatabase()
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
                this.updateDatabase()
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
            console.log(this.myRewards)
            this.closeModal();
            this.updateDatabase();
            
        },
        getMyRewards: function() {
            db.collection(this.email).doc("Profile").get().then((doc) => {
                console.log("doc.data().rewards")
                console.log(doc.data())
                if(doc.data().rewards != null) {
                    for (var i = 0; i <Object.keys(doc.data().rewards).length; i++) {
                        this.myRewards.push(doc.data().rewards[i])
                    }
                }
            })
        },
        updateDatabase: function() {
            db.collection(this.email).doc("Profile").update({
                rewards: Object.assign({}, this.myRewards)
            }).then(() => {
                console.log("updated rewards")
            })
        }
    },
    created: function() {
        console.log("created")
        this.checkUser();
    },
}
</script>

<style scoped>
#MyRewards {
    font-size: 25px;
    font-family: Avenir, Helvetica;
    padding: 50px;
    background-color: #ebe8de;
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
    background-color:#dbd5c8;
    margin:10px;
}
.side {
    background-color:#dbd5c8;
    width: 300px;
}
.start {
    width: 430px;
    padding: 20px 10px 20px 30px;
}
.block {
    font-family: Asap;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content:space-evenly;
    width:430px;
    padding: 20px 10px 20px 30px;
    background-color:rgb(247, 247, 247);
}
.right {
    padding: 10px;
    margin-top: 7%;
    font-size: 20px;
}
.left {
    height: 120px;
    width: 140px;
}
#icon {
    height: 110px;
    max-width: 250px;
}
#cross {
    padding: 0px;
    width: 30px;
    height: 30px;
}

p {
    font-family: Asap, Avenir;
    font-size: 30px;
    text-decoration: underline;
    padding-bottom: 10px;
}

button {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.0625em;
    border: none;
    font-family: Asap, Helvetica;
    color: white;
    background-color: #7D6558;
    height: 40px;
    width: 130px;
    border-radius: 20px;
    padding: 5px;
    opacity:1;
    transition: 0.3s;
}

button:hover {
    opacity:0.84;
}

#name {
    font-family: Asap, Avenir;
    color: rgb(49, 40, 40);
}

#pts {
    font-size: 22px;
    padding: 10px;
}
</style>