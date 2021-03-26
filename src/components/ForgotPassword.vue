<template> 
    <div id="forgotPW"> 
        <h2>Reset your password</h2> 
        <form> 
            <label>Enter email address: </label> 
            <input type="email" id="email" name="email" v-model="email" required> 
            <br><br>
            <input type="button" id="button" value="Send Login Link">
        </form> 
    </div> 
</template> 

<script> 
export default {
    data() {
        return {
            email: ""
        }
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