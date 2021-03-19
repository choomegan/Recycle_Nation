<template>
    <div id="register">
        <form> 
            <label>User ID: </label>
            <input type="text" id="userID" name="userID">
        </form>
        <form> 
            <label>Email:</label>
            <input type="text" id="email" name="email">
        </form> 
        <form> 
            <label>Password: </label>
            <input type="text" id="userID" name="userID">
        </form>
        <form> 
            <label>Re-enter Password: </label>
            <input type="text" id="password" name="password">
        </form><br>
        <button type="button" v-on:click="home()">Sign up</button>
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
}

button {
    font-size: 20px;
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 150px;
}
</style> 
