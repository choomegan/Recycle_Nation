<template>
    <div id="register">
        <p id="back" v-on:click="back()"> ← back </p>
        <form> 
            <label>Username: </label>
            <input type="text" id="username" name="username" v-model="name" required>
            <br>
            <label>Email:</label>
            <input type="email" id="email" name="email" v-model="email" required>
            <br>
            <label>Password: </label>
            <input type="text" id="password" name="password" v-model="password" required>
            <br>
            <label>Re-enter Password: </label>
            <input type="text" id="Repassword" name="Repassword" v-model="rePassword" required>
            <br><br>
            <input type="button" id="button" v-on:click="register()" value="Sign up">
        </form>
    </div> 
</template>

<script>
import database from '../firebase.js'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            name:"",
            email:"",
            password:"",
            rePassword:"",
            recycledData: ""
        }
    },
    methods :{
        back: function() {
            this.$router.push('/Login')
        },
        input: function() {
            database.collection(this.name).add()
        },
        register:function() {
            var dateTime = new Date();

            var achievements =[
                {
                    name: "Recycled 3 plastic items",
                    type: "plastic",
                    count: 0,
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Recycled 30 plastic items",
                    type: "plastic",
                    count: 0,
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 3 metal items",
                    type: "metal",
                    count: 0,
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Recycled 30 metal items",
                    type: "metal",
                    count: 0,
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 3 paper items",
                    type: "paper",
                    count: 0,
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Recycled 30 paper items",
                    type: "paper",
                    count: 0,
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 3 glass items",
                    type: "glass",
                    count: 0,
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Recycled 30 glass items",
                    type: "glass",
                    count: 0,
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 10 items in total",
                    type: null,
                    count: 0,
                    numberRequired: 10,
                    completed: false
                },
                {
                    name: "Recycled 25 items in total",
                    type: null,
                    count: 0,
                    numberRequired: 25,
                    completed: false
                },
                {
                    name: "Recycled 50 items in total",
                    type: null,
                    count: 0,
                    numberRequired: 50,
                    completed: false
                },
                {
                    name: "Recycled 100 items in total",
                    type: null,
                    count: 0,
                    numberRequired: 100,
                    completed: false
                }
                
            ]
            if (this.password != this.rePassword) {
                alert("Re-enter Password is different from Password. Please try again.")

            } else if (this.name == "") {
                alert("Please enter your username.")
            } else {
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((data) => {
                    data.user.updateProfile( {
                        displayName: this.name,
                    })
                    database.collection(this.email).doc("Authentication").set({email: this.email, username: this.name, password: this.password})
                    database.collection(this.email).doc("Profile").set({username: this.name, points: 0, dateJoined: dateTime, total: 0})
                    database.collection(this.email).doc("Achievements").set(Object.assign({},achievements))
                    alert('Successfully registered! Please login.');
                    if (typeof this.recycledData === "undefined") {
                        this.$router.push('/Login');
                    }
                    else { // user logged in through scanning
                        this.$router.push({name:" Login ", params:{data: this.recycledData }});
                    }
                    //this.$router.push({path:'/'});
                })
                .catch(error => {
                    if (error.message == "The email address is badly formatted.") {
                        alert("Please enter a valid email.")
                    } else {
                        alert(error.message);
                    }
                    
                });
            }
        },
        getData: function() {
            this.recycledData = this.$route.params.data;
            console.log("data in registration: " + this.recycledData);
        }
    },
    created() {
        this.getData();
    }
}
</script> 

<style scoped> 
#register{
    font-size: 23px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    padding: 150px;
    background-color: #E8E1CF;
    margin: 0;
}

input {
    height: 20px;
}

label {
    width: 210px;
    text-align: left;
    display: inline-block;  
    padding: 5px;
}

#button {
    font-size: 20px;
    color: white;
    background-color: #7D6558;
    border: none;
    height: 50px;
    width: 150px;
    border-radius: 9px;
}

#button:hover {
    background-color: #7d6558d2;
}

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
