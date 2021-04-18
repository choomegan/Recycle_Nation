<template>
    <div id="MyProfile">
        <div class="split">
            <div class="halves">
                <img id="icon"/>
                <div>
                    <div>
                        <input style="display: none" type="file" @change="previewImage" accept="image/*" ref="fileInput">
                        <u @click="$refs.fileInput.click()">Change photo</u>
                    </div>
                    <div>
                        <p>Progress: {{uploadValue.toFixed()+"%"}}
                        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                    </div>
                    <div v-if="imageData!=null">
                        <img class="preview" :src="picture">
                        <br>
                        <button @click="onUpload">Upload</button>
                    </div>
                </div>
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
            uploadValue: 0
            
        }
    },
    methods: {
        getPic: function() { //get path of image from db
            db.collection(this.email).doc("Profile").get().then((querySnapShot) => {
                //console.log(querySnapShot.data().pic); // tree3.png is the default profile pic for new users
                this.image = querySnapShot.data().pic;
                var storage    = firebase.storage();
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
        },
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
                this.email = user.email;
                this.username = user.displayName;
            }
            else {
                alert("Please log in to continue")
                this.$router.push('/Login');
            }
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
        }
    },
    created: function() {
        this.updatePage();
        this.getPic();
    }
}
</script>

<style scoped>
#MyProfile {
    font-family: Avenir, Helvetica;
    font-size: 25px;
    padding: 100px;
    color: white;
    object-fit: cover;
    background-image: url('~@/assets/forest-full.jpg');
    /*background-color: #E8E1CF;*/
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
    color:rgb(80, 169, 199);
    font-size: 20px;
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

img.preview {
    width: 200px;
}
u {
    font-size: 12px;
}

</style>