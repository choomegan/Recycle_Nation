<template> 
    <div>
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
            name: "Orders"
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
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>