<template> 
    <div id="login"> 
        <form> 
            <label>User ID: </label>
            <input type="text" id="email" name="email" v-model="email" required>
        </form>
        <form> 
            <label>Password: </label>
            <input type="text" id="password" name="password" v-model="password" required>
        </form> 
        <p>Don't have an account?
            <span id="signUp" v-on:click="route()">Sign up here!</span>
        </p>
        <button type="button" v-on:click="home()">Login</button>
    </div> 
</template> 

<script>
import firebase from 'firebase/app'

export default {
    data() {
        return {
            recycledData: {},
            email:"",
            password:"",
        }
    },
    methods :{
        route: function() {
            this.$router.push({path:'Registration'})
        },
        home: function() {
            if (typeof this.recycledData === "undefined") { //user logged in normally
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                    this.$router.push({path:'Home'})
                    })
                    .catch(err => {
                    this.error = err.message;
                    });
            } else {
                this.$router.push({ path: `/IdentifiedItem/${this.recycledData}`})
            }
        },
        getData: function() {
            var data = this.$route.params.data;
            console.log("data: " + data);
            this.recycledData = data
        }
    },
    created() {
        this.getData();
    }
}
</script> 

<style> 
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
    color: blue;
}

p {
    font-size: 18px;
    padding: 10px;
}

button {
    font-size: 20px;
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 150px;
}
</style> 

