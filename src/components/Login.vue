<template> 
    <div id="login"> 
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <h2>Login</h2>
        </transition>
        <br><br> 
        <p id="back" v-on:click="back()"> ← back</p>
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <form> 
                <label>Email: </label>
                <input type="text" id="email" name="email" v-model="email" required>
            </form>
        </transition>
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <form> 
                <label>Password: </label>
                <input type="password" id="password" name="password" v-model="password" required><br>
                <input type="checkbox" v-on:click="toggle()" id="toggle"><span id="showPW">Show Password</span>
            </form>
        </transition>
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <button type="button" v-on:click="login()">Login</button>
        </transition>
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <div id="extras">
                <span id="signUp" v-on:click="register()">CREATE ACCOUNT</span>
                <span id="forgotPW" v-on:click="resetPW()">FORGOT PASSWORD?</span>
            </div>
        </transition>
    </div> 
</template> 

<script>
import firebase from 'firebase/app'

export default {
    data() {
        return {
            recycledData: {},
            email:"",
            password:""
        }
    },
    methods :{
        back: function() {
            this.$router.push('/')
        },
        register: function() {
            if (typeof this.recycledData === "undefined") {
                this.$router.push('/Registration');
            }
            else { // user logged in through scanning
                this.$router.push({name:"Registration", params:{data: this.recycledData }});
            }
        },

        resetPW: function() {
            if (typeof this.recycledData === "undefined") {
                this.$router.push('/ForgotPassword')
            }
            else { // user logged in through scanning
                this.$router.push({name:"Reset your password", params:{data: this.recycledData }});
            }
        },

        login: function() {
            firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        if (typeof this.recycledData === "undefined") { //user logged in normally
                            this.email = document.getElementById("email").value;
                            this.$router.push({name:"Home", params:{ userEmail:this.email }});
                        } 
                        else { // user logged in through scanning of QR code (data in form of [{"glass":40}])
                            this.email = document.getElementById("email").value;
                            this.$router.push({name:"Identified Item", 
                                                params:{ userEmail:this.email, data: this.recycledData }});
                        }
                    })
                    .catch(err => {
                        this.error = err.message;
                        alert("Wrong email/password. Please try again.")
                    });
        },
        getData: function() {
            this.recycledData = this.$route.params.data;
            console.log("data in login: " + this.recycledData);
        },
        toggle: function() {
            var x = document.getElementById("password");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        }
    },
    created() {
        this.getData();
    }
}
</script> 

<style scoped> 
#login{
    font-size: 25px;
    font-family: Asap,Avenir, Helvetica, Arial, sans-serif;
    letter-spacing: 0.5px;
    text-align: center;
    padding-top: 300px;
    padding-bottom: 300px;
    background-image: url('~@/assets/forest-full2.jpg');
    background-size: cover;
    color: white;
    top: 0;
    bottom:0;
    left:0;
}

h2 {
    font-family: Asap;
    color: white;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 35px;
    text-decoration: underline;
}

form {
    margin-bottom: 10px;
}

input {
    height: 22px;
    border: 2px solid #ccc;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
}

input:focus {
    border: 2px solid rgb(158, 121, 65);
}
label {
    width: 134px;
    text-align: left;
    display: inline-block;  
}

#signUp:hover {
    color: rgb(240, 41, 75);
    text-decoration: underline;
}

#forgotPW:hover {
    color: rgb(240, 41, 75);
    text-decoration: underline;
}

p,span {
    color: white;
    font-size: 16px;
    padding: 20px;
}

button {
    font-size: 20px;
    border: none;
    font-family: Asap, Helvetica;
    color: white;
    background-color: rgb(177, 128, 55);
    height: 50px;
    width: 135px;
    opacity: 1;
    border-radius: 25px;
    transition: 0.4s;
}

button:hover {
    background-color: rgb(150, 103, 33);
}

#extras {
    padding: 20px;
    font-family: Asap;
}
#toggle {
    margin-left: 140px;
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;
}

#showPW {
    vertical-align: middle;
    padding-left:4px;
    color:white;
}

#back {
    position: absolute;
    top: 2%;
    left:3%;
    font-size: 20px;
    text-decoration: underline;
    font-family: Asap;
    color: white;
    cursor: pointer;
    font-weight: bold;
}

#back:hover {
    color: rgb(247, 148, 0);
}

.fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
}
</style> 

