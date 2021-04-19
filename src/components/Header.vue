<template> 
    <div id="header">
        <ul>
            <li><router-link to="/Home" exact>Home</router-link></li>
            <li><router-link to="/MyProfile" exact>My Profile</router-link></li>
            <li><router-link to="/RecyclingHistory" exact>Recycling History</router-link></li>
            <li><router-link to="/MapOfBins" exact>Map Of Bins</router-link></li>
            <li><router-link to="/AboutUs" exact>About Us</router-link></li> 
        </ul>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            name: "Header",
        }
    }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 200px;
    text-align: center;
    padding: 10px;
}
li a {
    text-decoration-line: none;
    color:saddlebrown;
}

li:hover{
    font-weight:bold;
}

.router-link-active {
    text-decoration-line: underline;
    font-weight: 400;
}
#header {
    background-color:white;
    font-family: Avenir, Helvetica;
    font-size: 18px;
}
</style>