<template>
  <div id="content">
    <div v-for="items in recycledData" v-bind:key="items[0][0]">
      <div v-for="item in items" v-bind:key="item[0]">
        <div v-for="(value, index) in item" v-bind:key="index" id='display'>
          <img src="../assets/glass.jpg" width="200" height="200" v-if="index=='Glass'"/>
          <img src="../assets/plastic.jpg" width="200" height="200" v-if="index=='Plastic'"/>
          <img src="../assets/paper.jpg" width="200" height="200" v-if="index=='Paper'"/>
          <img src="../assets/metal.jpg" width="200" height="200" v-if="index=='Metal'"/>
          <p>Item recycled: {{index}}</p>
          <p>Points Earned: {{value}}</p>
        </div>
      </div>
    </div>
    <button v-on:click="directed()">Back to Home</button>
  </div>
</template>

<script>
import db from "../firebase.js"

export default {
  data() {
    return {
      email: "",
      recycledData: [],
    }
  },
  methods: {
      directed: function() {        
        this.$router.push({name:"Home", params:{ userEmail: this.email }})
      },
      /**getData: function() {
        var data = JSON.parse(this.$route.params.data);
        console.log(data);
        this.recycledData.push(data);
        console.log(this.recycledData);
      },**/
      getUser: function() {
        this.email = this.$route.params.userEmail;
        console.log("email: " + this.email);
      },
      addToDB: function() { // add newly recycled information into recycling history
        // Get today's date
        var dateTime = new Date();
        var month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
        var date = ('0' + dateTime.getDate()).slice(-2);
        var year = dateTime.getFullYear();
        var time = dateTime.getHours() + ':' + dateTime.getMinutes()
        var dateTimeNewFormat = date + '/' + month + '/' + year + " " + time
        console.log(dateTimeNewFormat);
        
        // Push to database
        // Need to retrieve from db and check for same dates and combine (recycling more than once a day)
        db.collection(this.email).doc("Recycling History").set({ 
          DateTime: dateTimeNewFormat}); 
      }
  },
  created() {
    //this.getData();
    this.getUser();
    this.addToDB();
  }
}
</script>

<style>
button {
    background-color: #7D6558;
    color: white;
    font-size: 20px;

}
#content {
    background-color: #E8E1CF;
    padding: 50px;
}
#display {
  margin: 50px;
}
</style>
