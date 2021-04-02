<template>
  <div id="content">
    
    <img src="../assets/glass.jpg" width="200" height="200" v-if="this.item=='glass'"/>
    <img src="../assets/plastic.jpg" width="200" height="200" v-if="this.item=='plastic'"/>
    <img src="../assets/paper.jpg" width="200" height="200" v-if="this.item=='paper'"/>
    <img src="../assets/metal.jpg" width="200" height="200" v-if="this.item=='metal'"/>
    <p>Item recycled: {{this.item}}</p>
    <p>Points earned: {{this.points}}</p>
    
    <button v-on:click="directed()">Back to Home</button>
  </div>
</template>

<script>
import db from "../firebase.js"

export default {
  data() {
    return {
      email: "",
      item: "",
      points: "",
      pushData:[]
    }
  },
  methods: {
      directed: function() {        
        this.$router.push({name:"Home", params:{ userEmail: this.email }})
      },
      getData: function() {
        var data = JSON.parse(this.$route.params.data);
        this.item = data[0].item;
        this.points = data[1].points;
      },
      getUser: function() {
        this.email = this.$route.params.userEmail;
      },
      addToDB: function() { // add newly recycled information into recycling history
        // Get today's date
        var dateTime = new Date();
        var month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
        var date = ('0' + dateTime.getDate()).slice(-2);
        var year = dateTime.getFullYear();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var dateFormat = date + '-' + month + '-' + year
        var time
        if (minute < 10) {
          time = hour + ":0" + minute
        } else {
          time = hour + ":" + minute
        }
        
        db.collection(this.email).doc("Recycling history").get().then(snapshot => {
          var data = snapshot.data();
          var numOfRecycledItems = Object.keys(data).length;
          if (numOfRecycledItems == 0) { // User is recycling for the first time
            db.collection(this.email).doc("Recycling history").set(Object.assign({},[{
              Date: dateFormat, Time: time, Item: this.item, Points: this.points}]));
          }
          else {
            var x;
            for (x of Object.values(data)) {
              this.pushData.push(x)
            }
            this.pushData.push({
              Date: dateFormat, Time: time, Item: this.item, Points: this.points})
              console.log(this.pushData)
              db.collection(this.email).doc("Recycling history").set(Object.assign({},this.pushData))
          }
        })
      }
  },
  created() {
    this.getData();
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
