<template>
<transition name="fade" enter-active-class="animated fadeInUp" appear>
    <div id="MyProfile">
        <div class="split">
            <div class="halves">
                <img id="icon"/><br>
                <u v-on:click="showModal()">Upload Photo</u>
                <update-profile v-show="modalVisible" @close="closeModal"></update-profile>
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
        <br>
        <div class="tooltip">
            <span id="prog" class="tooltiptext"> {{remaining}} points to the next level !</span>
            
            <div id="myProgress" >
                <transition appear @before-appear="beforeEnter" @after-appear="enter">
                    <div id="myBar"></div>
                </transition>
            </div>
        </div>

        <br> 
        <div id="level">Level: {{level}} --
            <span id="recycler">{{title}}</span>
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
</transition>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase.js'
import UpdateProfile from './UpdateProfile.vue'

export default {
    components: {
        UpdateProfile
    },
    data() {
        return {
            image:"",
            points: 0,
            username: "",
            email:"",
            date: "",
            noOfGoldStars: 0,
            percent:0,
            goldStar: require('../assets/goldStar.png'),
            greyStar: require('../assets/greyStar.png'),
            imageData: null,
            picture: null,
            uploadValue: 0,
            width:0,
            level:0,
            title:"",
            hovered: false,
            remaining:0,
            uploaded: false,
            modalVisible: false,
            msg: "this is the message"
        }
    },
    methods: {
        beforeEnter (el) {
            el.style.width = 0
        },
        enter (el) {
            el.style.width = `${this.percentage}%`
            el.style.transition = `width 1s linear`
            el.style.transitionDelay = `0.90s`
        },
        getPic: function() { //get path of image from db
            db.collection(this.email).doc("Profile").get().then((querySnapShot) => {
                console.log(querySnapShot.data().pic); // tree3.png is the default profile pic for new users
                this.image = querySnapShot.data().pic;
                var storage = firebase.storage();
                var storageRef = storage.ref();

                storageRef.child(this.image).getDownloadURL().then(function(url) {
                    var test = url;
                    document.querySelector('img').src = test;
                }).catch(function(error) {
                    console.log(error);
                });
                
            })
        },
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            },

        onUpload(){
            this.picture=null;
            const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture =url;
                });
            }
            );
            // Update user's profile image path in firebase
            db.collection(this.email).doc("Profile").update({
                pic: this.imageData.name
            });

            alert("Profile picture updated!")
            this.uploaded = true;

        },
        rewards: function() {
            this.$router.push({path:"/MyRewards"})
        },
        achievements: function() {
            this.$router.push({path:"/MyAchievements"})
        },
        updatePage: function() {
            db.collection(this.email).doc("Profile").get().then((items) => {
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
            db.collection(this.email).doc("Achievements").get().then((doc) => {
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
        },
        bar: function() {
            var elem = document.getElementById("myBar");
            db.collection(this.email).doc("Profile").get().then(snapShot => {
                this.width = (snapShot.data()["total"]%400)/4
                this.level = Math.floor(snapShot.data()["total"]/400) + 1
                this.remaining = 400 - this.width*4
                console.log(this.width)
                elem.style.width = this.width + "%"
                if (this.level >= 60) {
                    this.title = "Grandmaster Recycler"
                } else if (this.level >= 30) {
                    this.title = "Master Recycler"
                } else if (this.level >= 10) {
                    this.title = "Apprentice Recycler"
                } else {
                    this.title = "Novice Recycler"
                }
            })
        },
        checkLogin() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user== null) {
                    console.log("not logged in")
                    this.$router.push('/Login');
                } else {
                    console.log(user)
                    this.username = user.displayName;
                    this.email = user.email;
                    console.log(this.username, this.email)
                    this.updatePage();
                    this.getPic();
                    this.bar();
                }
            })
        },
        showModal() {
            this.modalVisible = true;
        },
        closeModal(changed) {
            this.modalVisible = false;
            if (changed) {
                this.uploaded = !this.uploaded;
            } 
        }
    },
    watch: {
        uploaded: function() {
            console.log("upload watch");
            this.getPic();
        }
    },
    created: function() {
        this.checkLogin();
        this.getPic();        
    }
}
</script>

<style scoped>

#MyProfile {
    font-family: Avenir, Helvetica;
    font-size: 25px;
    padding: 50px 100px;
    color: white;
    object-fit: cover;
    background-image: url('~@/assets/forest-full.jpg');
    background-size: cover;
    text-align: left;
    
}
#icon{
    width: 120px;
    border-radius: 50%;
    /*mix-blend-mode: multiply;*/
}

#star {
    height: 95px;
    color:goldenrod;
}

#routes {
    color:rgb(80, 184, 219);
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
    font-style: italic;
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
    font-size: 16px;
    font-family: Asap, Avenir;
    font-weight: bold;
    letter-spacing: 0.0600em;
    color: white;
    background-color: #7D6558;
    border: none;
    height: 40px;
    width: 120px;
    border-radius: 20px;
    margin-left: 20px;
}


button:hover {
    background-color: #695449;
}

#status {
    font-family: Avenir;
}

img.preview {
    width: 200px;
}
u {
    font-size: 20px;
    padding-left: 10px;
}

#myProgress {
  width: 100%;
  background-color: rgb(65, 90, 65);
  border-radius: 25px;
}

#prog {
    text-align: center;
    font-family: Asap, Avenir;
}

#myBar {
  width: 1%;
  height: 30px;
  background-color: rgb(103, 143, 103);
  border-radius: 25px;
  transition-property: margin-right;
}

#level {
    font-family: Asap, Avenir;
    text-align: center;
}
#recycler {
    color: rgb(216, 184, 0);
    font-family: Asap, Avenir;
}

#uploadButton {
    margin-left:0;
    margin-bottom: 10px;
}

.fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  bottom: 140%;
  left: 30%;
  color: white;
  background-color: black;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  position: relative;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
</style>