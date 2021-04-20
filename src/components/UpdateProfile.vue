<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle" >
          <slot name="header">
            Upload Profile Picture
          </slot>
          <button id="cross" v-on:click="close" v-show="!uploading">
            X
          </button>
        </header>

        <section class="modal-body" id="modalDescription" >
          <slot name="body">   
            <div>
                <div>
                    <input style="display: none" type="file" @change="previewImage" accept="image/*" ref="fileInput">
                    <button v-show="!uploading" @click="$refs.fileInput.click()">Choose photo</button>
                    <div v-show="!uploading" >
                        <img id="box" class="preview" :src="picture"/>
                    </div>
                </div>
                <div v-if="imageData!=null">
                <div>
                    <button v-show="!uploading" id="uploadButton" @click="onUpload">Upload</button>
                    <p v-show="uploading">Progress: {{uploadValue.toFixed()+"%"}}
                    <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                </div>
                
            </div>
            </div> 
            
          </slot>
        </section>

        <footer class="modal-footer">
          <!-- <slot name="footer">
            This is the default footer!
          </slot>-->
                <div v-show="uploadValue==100">
                    Profile picture successfully uploaded!
                </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase.js'
  export default {
    name: 'Modal',
     data() {
        return {
            image:"",
            email:"",
            imageData: null,
            picture: null,
            uploadValue: 0,
            remaining:0,
            uploaded: false,
            uploading: false,
        }
     },
    methods: {
        success() {
            this.image = "";
            this.imageData = null;
            this.picture = require('../assets/emptyImage.png');
            this.uploadValue = 0;
            this.remaining = 0;
            this.uploaded = false;
            this.uploading = false;
            this.$emit('close', true);
        },
        close() {
            this.$emit('close', false)
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
            this.imageData = event.target.files[0];
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.picture = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        },

        onUpload(){
            this.picture=null;
            this.uploading = true;
            const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then(()=>{
                });
            }
            );
            // Update user's profile image path in firebase
            db.collection(this.email).doc("Profile").update({
                pic: this.imageData.name
            });
            this.uploaded = true;
            this.onComplete()
            

        },
        async onComplete () {
            await this.timeout(2000);
            this.success();
        },
        checkLogin() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user== null) {
                    console.log("not logged in")
                    this.$router.push('/Login');
                } else {
                    console.log(user)
                    this.email = user.email;
                    console.log(this.email)
                }
            })
        },
        timeout (ms) {
            return new Promise(resolve => {
                window.setTimeout(resolve, ms)
            })
        }
    },
    created: function() {
        this.checkLogin();
        this.picture = require('../assets/emptyImage.png');
        this.getPic();
    }
    
  };
</script>

<style>
#box {
    max-width: 100%;
    height:300px;
    justify-content: center;
    padding: 10px 30px;
    border: 1px black;
}
#cross {
    padding: 0px;
    width: 30px;
    height: 30px;
    font-family: Asap, Avenir;
}
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .modal {
    background: #FFFFFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 50%;
    font-family: Asap, Avenir;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: row;
    justify-content: space-between;
    color:brown;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    color:burlywood;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>