<template> 
    <div id="forgotPW"> 
        <p id="back" v-on:click="back()"> ← back</p>
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <h2>Forgot Password</h2>
        </transition>
        <br><br> 
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <form> 
                <label>Enter email address: </label> 
                <input type="email" id="email" name="email" v-model="email" required> 
                <br><br>
                <input type="button" id="button" value="Send reset password link" v-on:click="sendEmail()">
                <br><br> 
            </form> 
        </transition>
    </div> 
</template> 

<script> 
import firebase from 'firebase/app'
export default {
    data() {
        return {
            email: "",
            recycledData: "",
            err:""
        }
    },
    methods: {
        back: function() {
            this.$router.push('/Login')
        },
        sendEmail: function() {
            this.err =""
            var user = this;
            firebase.auth().sendPasswordResetEmail(this.email).then(function() {
                console.log("sent email");
                alert("Instructions to reset password have been sent to your email. Please reset your password through the link.")
                console.log("inside firebase.auth() success")
                user.pushRouter()
                
            }).catch((err) => {
                //console.log(err)
                this.err = err.message;
                console.log("inside firebase.auth() failure")
                console.log("this.err: " + this.err)
                alert("Please input a valid email.")
                
            })
           
        },
        getData: function() {
            this.recycledData = this.$route.params.data;
            console.log("data in forgot password: " + this.recycledData);
            console.log("!this.recycledData")
            console.log(!this.recycledData && this.err=="")
        },
        pushRouter: function() {
            if (!this.recycledData && this.err=="") {
                console.log("no recycled data")
                this.$router.push('/Login');
            } else if (this.err=="") { // user logged in through scanning
                console.log("with recycled data")
                this.$router.push({name:" Login ", params:{data: this.recycledData }});
            }
        }
    },
    created() {
        this.getData();
    }
}
</script> 


<style scoped> 
#forgotPW{
    font-size: 20px;
    font-family: Asap, Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    padding-top: 350px;
    padding-bottom: 350px;
    background-image: url('~@/assets/forest-full2.jpg');
    background-size: cover;
    color: white;
}

h2 {
    font-family: Asap;
    color: white;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 33px;
    text-decoration: underline;
}

input {
    height: 25px;
    width: 200px;
    border: 2px solid #ccc;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
}

input:focus {
    border: 2px solid rgb(158, 121, 65);
}

label {
    width: 200px;
    font-size: 22px;
    text-align: left;
    display: inline-block;  
    padding-right: 14px;
}

#button {
    font-size: 18px;
    font-family: Asap, Avenir;
    color: white;
    background-color: rgb(177, 128, 55);
    height: 50px;
    width: 255px;
    border: none;
    border-radius: 25px;
    opacity:1;
    transition: 0.4s;
}

#button:hover {
    background-color: rgb(150, 103, 33);
}

#back {
    position: absolute;
    top: 3%;
    left:4%;
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
</style> 