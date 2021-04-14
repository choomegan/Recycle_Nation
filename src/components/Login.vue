<template> 
    <div id="login"> 
        <form> 
            <label>Email: </label>
            <input type="text" id="email" name="email" v-model="email" required>
        </form>
        <form> 
            <label>Password: </label>
            <input type="password" id="password" name="password" v-model="password" required><br>
            <input type="checkbox" v-on:click="toggle()" id="toggle"><span>Show Password</span>
        </form>
        <button type="button" v-on:click="login()">Login</button>
        <div id="extras">
            <span id="signUp" v-on:click="register()">CREATE ACCOUNT</span>
            <span id="forgotPW" v-on:click="resetPW()">FORGOT PASSWORD?</span>
        </div>

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
                        alert("Wrong username/password. Please try again.")
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    padding: 170px;
    background-color:#E8E1CF;
}

form {
    margin-bottom: 15px;
}

input {
    height: 20px;
}

label {
    width: 125px;
    text-align: left;
    display: inline-block;  
}

#signUp:hover {
    color: #184eff;
    text-decoration: underline;
}

#forgotPW:hover {
    color: rgb(240, 41, 75);
    text-decoration: underline;
}

p,span {
    color: #565755;
    font-size: 16px;
    padding: 20px;
}

button {
    font-size: 20px;
    border: none;
    font-family: Asap, Helvetica;
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 150px;
    border-radius: 9px;
}

button:hover {
    background-color: #7d6558d2;
}

#extras {
    padding: 20px;
    font-family: Asap;
}
#toggle {
    margin-left: 120px;
}
</style> 

