<template> 
    <div id="forgotPW"> 
        <h2>Reset your password</h2> 
        <form> 
            <label>Enter email address: </label> 
            <input type="email" id="email" name="email" v-model="email" required> 
            <br><br>
            <input type="button" id="button" value="Send Login Link" v-on:click="sendEmail()">
        </form> 
    </div> 
</template> 

<script> 
import firebase from 'firebase/app'
export default {
    data() {
        return {
            email: "",
            recycledData: ""
        }
    },
    methods: {
        sendEmail: function() {
            firebase.auth().sendPasswordResetEmail(this.email).then(function() {
                console.log("sent email");
                alert("Instructions to reset password have been sent to your email. Please reset your password through the link.")
            })
            if (typeof this.recycledData === "undefined") {
                this.$router.push('/');
            }
            else { // user logged in through scanning
                this.$router.push({name:"Login with data", params:{data: this.recycledData }});
            }
            //this.$router.push({path:'/'});
        },
        getData: function() {
            this.recycledData = this.$route.params.data;
            console.log("data in forgot password: " + this.recycledData);
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    padding: 220px;
    background-color: #E8E1CF;
    margin: 0;
}

input {
    height: 20px;
    width: 200px;
}

label {
    width: 200px;
    text-align: left;
    display: inline-block;  
}

#button {
    font-size: 20px;
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 200px;
}
</style> 