<template> 
    <div id="login"> 
        <form> 
            <label>Email: </label>
            <input type="text" id="email" name="email" v-model="email" required>
        </form>
        <form> 
            <label>Password: </label>
            <input type="text" id="password" name="password" v-model="password" required>
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
            this.$router.push({path:'Registration'})
        },

        resetPW: function() {
            this.$router.push({path:'ForgotPassword'})
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
                    });
        },
        getData: function() {
            this.recycledData = this.$route.params.data;
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    padding: 170px;
    background-color: #E8E1CF;
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
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 150px;
}

#extras {
    padding: 20px;
}
</style> 

