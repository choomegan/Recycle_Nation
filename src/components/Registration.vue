<template>
    <div id="register">
        <form> 
            <label>Username: </label>
            <input type="text" id="username" name="username">
            <br>
            <label>Email:</label>
            <input type="text" id="email" name="email">
            <br>
            <label>Password: </label>
            <input type="text" id="userID" name="userID">
            <br>
            <label>Re-enter Password: </label>
            <input type="text" id="password" name="password">
            <br><br>
            <button type="submit" v-on:click="home()">Sign up</button>
        </form>
    </div> 
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods :{
        home: function() {
            this.$router.push({path:'Home'})
        }
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

button {
    font-size: 20px;
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 150px;
}
</style> 
