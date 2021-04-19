<template>
    <div id="register">
        <p id="back" v-on:click="back()"> ← back </p>
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
            <h2>Registration</h2>
        </transition>
        <br><br> 
        <transition name="bounce" enter-active-class="animated bounceInLeft" appear>
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
                <br><br><br>
                <input type="button" id="button" v-on:click="register()" value="Sign up">
            </form>
        </transition>
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

            var image = 'tree3.png';

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
                    database.collection(this.email).doc("Profile").set({username: this.name, points: 0, dateJoined: dateTime, total: 0, pic: image})
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
    font-family: Asap,'Avenir', Helvetica, Arial, sans-serif;
    letter-spacing: 0.5px;
    text-align: center;
    padding-top: 310px;
    padding-bottom: 310px;
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
    font-size: 35px;
    text-decoration: underline;
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
    width: 220px;
    text-align: left;
    display: inline-block;  
    padding: 5px;
}


#button {
    font-size: 20px;
    font-family: Asap, Avenir;
    color: white;
    background-color: rgb(177, 128, 55);
    border: none;
    height: 50px;
    width: 150px;
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
