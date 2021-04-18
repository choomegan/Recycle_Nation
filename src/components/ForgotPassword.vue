<template> 
    <div id="forgotPW"> 
        <p id="back" v-on:click="back()"> ← back</p>
        <form> 
            <label>Enter email address: </label> 
            <input type="email" id="email" name="email" v-model="email" required> 
            <br><br>
            <input type="button" id="button" value="Send reset password link" v-on:click="sendEmail()">
            <br><br>
            
        </form> 
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    padding: 220px;
    background-color: #E8E1CF;
    margin: 0;
}

input {
    height: 25px;
    width: 200px;
}

label {
    width: 200px;
    text-align: left;
    display: inline-block;  
}

#button {
    font-size: 20px;
    font-family: Avenir;
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 250px;
    border-radius: 9px;
}

#button:hover {
    background-color: #7d6558d2;
}

/*#button:active {
    background-color: #7c5b4ad2;
    transform: translateY(1px);
}*/
#back {
    position: absolute;
    top: 173px;
    left:40px;
    font-size: 17px;
    text-decoration: underline;
    font-family: Asap;
    color: rgb(55, 83, 55);
    cursor: pointer;
    font-weight: bold;
}

#back:hover {
    color: black;
}
</style> 