<template> 
    <div id="login"> 
        <form> 
            <label>User ID: </label>
            <input type="text" id="userID" name="userID">
        </form>
        <form> 
            <label>Password: </label>
            <input type="text" id="password" name="password">
        </form> 
        <p>Don't have an account?
            <span id="signUp" v-on:click="route()">Sign up here!</span>
        </p>
        <button type="button" v-on:click="home()">Login</button>
    </div> 
</template> 

<script>
export default {
    data() {
        return {
        }
    },
    methods :{
        route: function() {
            this.$router.push({path:'Registration'})
        },
        home: function() {
            this.$router.push({path:'Home'})
        }
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

