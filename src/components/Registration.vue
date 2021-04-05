<template>
    <div id="register">
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
            rePassword:""
        }
    },
    methods :{
        input: function() {
            database.collection(this.name).add()
        },
        register:function() {
            var dateTime = new Date();
            var month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
            var date = ('0' + dateTime.getDate()).slice(-2);
            var year = dateTime.getFullYear();
            var dateTimeNewFormat = date + '-' + month + '-' + year; 

            var achievements =[
                {
                    name: "Recycled for 3 days",
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Recycled for 30 days",
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Reycled 3 plastic items",
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Reycled 30 plastic items",
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 3 metal items",
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Reycled 30 metal items",
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 3 paper items",
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Recycled 30 paper items",
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 3 glass items",
                    numberRequired: 3,
                    completed: true
                },
                {
                    name: "Recycled 30 glass items",
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 10 items in total",
                    numberRequired: 10,
                    completed: false
                },
                {
                    name: "Recycled 100 items in total",
                    numberRequired: 100,
                    completed: false
                },
                
            ]

            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((data) => {
                data.user.updateProfile( {
                    displayName: this.name,
                })
                database.collection(this.email).doc("Authentication").set({email: this.email, username: this.name, password: this.password})
                database.collection(this.email).doc("Profile").set({username: this.name, points: 0, dateJoined: dateTimeNewFormat})
                database.collection(this.email).doc("Achievements").set(Object.assign({},achievements))
                alert('Successfully registered! Please login.');
                this.$router.push({path:'/'});
            })
            .catch(error => {
                alert(error.message);
            });
        },
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
    height: 50px;
    width: 150px;
}
</style> 
