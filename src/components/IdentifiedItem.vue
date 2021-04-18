<template>
  <div id="content">
    
    <img src="../assets/glass.jpg" width="200" height="200" v-if="this.item=='glass'"/>
    <img src="../assets/plastic.jpg" width="200" height="200" v-if="this.item=='plastic'"/>
    <img src="../assets/paper.jpg" width="200" height="200" v-if="this.item=='paper'"/>
    <img src="../assets/metal.jpg" width="200" height="200" v-if="this.item=='metal'"/>
    <br><br> 
    <div>Item recycled:  {{this.item}}</div> 
    <div>Points earned:  {{this.points}}</div> 
    <br> 
    <button v-on:click="directed()">Back to Home</button>
  </div>
</template>

<script>
import db from "../firebase.js"
import firebase from 'firebase/app'

export default {
  data() {
    return {
      email: "",
      item: "",
      points: "",
      pushData:[],
      data:{}
    }
  },
  methods: {
      directed: function() {        
        this.$router.push({name:"Home", params:{ userEmail: this.email }})
      },
      getData: function() {
        var user = firebase.auth().currentUser;
        if (user) {
            //user signed in
            this.email = user.email;
        }
        else {
            alert("Please log in to continue.")
            this.$router.push('/Login');
        }
        var data = JSON.parse(this.$route.params.data);
        this.item = data[0].item;
        this.points = data[1].points;
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
          if (data == undefined) { // User is recycling for the first time
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
              db.collection(this.email).doc("Recycling history").set(Object.assign({},this.pushData))
          }
        })
      },
      update: function() {
        db.collection(this.email).doc("Achievements").get().then((querySnapShot) => {
          for (let i = 0; i < Object.keys(querySnapShot.data()).length; i++) {
            this.data[i] = Object.values(querySnapShot.data())[i]
          }
          console.log(Object.values(this.data))
          Object.values(this.data).forEach(ach => {
            if (ach.type == this.item) {
              ach.count += 1
              ach.numberRequired -= 1
              if (ach.numberRequired == 0) {
                ach.completed = true
              } else if (ach.numberRequired < 0) {
                ach.numberRequired = 0
              }
            } else if (ach.type == null) {
              ach.count += 1
              ach.numberRequired -= 1
              if (ach.numberRequired == 0) {
                ach.completed = true
              } else if (ach.numberRequired < 0) {
                ach.numberRequired = 0
              }
            }
            for (let i = 0; i < Object.values(this.data).length; i++) {
              if (Object.values(this.data)[i].type == this.item) {
                Object.values(this.data)[i] = ach
              } else if (Object.values(this.data)[i].type == null) {
                Object.values(this.data)[i] = ach             
              }
            }
          })
          db.collection(this.email).doc("Achievements").update(Object.assign({},Object.values(this.data)))

          db.collection(this.email).doc("Profile").get().then(snapShot => {
            db.collection(this.email).doc("Profile").update({
              dateJoined: snapShot.data()["dateJoined"],
              points: snapShot.data()["points"] + this.points,
              total: snapShot.data()["total"] + this.points,
              username: snapShot.data()["username"]
            })
          })
        })  
      }
    },
  created() {
    this.getData();
    this.addToDB();
    this.update();
  }
}
</script>

<style>
button {
    font-size: 20px;
    border: none;
    font-family: Asap, Helvetica;
    color: white;
    background-color: #7D6558;
    height: 50px;
    width: 200px;
    border-radius: 9px;
    padding: 10px;
}
button:hover {
    background-color: #7d6558d2;
}
#content {
    background-color: #E8E1CF;
    padding: 50px;
    font-size: 25px;
    font-family: Avenir, Helvetica;
}
#display {
  margin: 50px;
}

</style>
