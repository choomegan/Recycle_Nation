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
      pushData:[],
      data:{}
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
          console.log(this.data)
          var glasscount = 30 - this.data[9].numberRequired
          var papercount = 30 - this.data[7].numberRequired
          var metalcount = 30 - this.data[5].numberRequired
          var plasticcount = 30 - this.data[3].numberRequired
          var totalcount = 100 - this.data[11].numberRequired
          if (this.item == 'glass') {
            glasscount += 1
            if (glasscount < 3) {
              db.collection(this.email).doc("Achievements").update({
                8: {
                  completed: false,
                  name: "Recycled 3 glass items",
                  numberRequired: 3 - glasscount
                },
                9: {
                  completed: false,
                  name: "Recycled 30 glass items",
                  numberRequired: 30 - glasscount
                }
              })
            } else if (glasscount >= 30) {
              db.collection(this.email).doc("Achievements").update({
                8: {
                  completed: true,
                  name: "Recycled 3 glass items",
                  numberRequired: 0
                },
                9: {
                  completed: true,
                  name: "Recycled 30 glass items",
                  numberRequired: 0
                }
              })
            } else {
              db.collection(this.email).doc("Achievements").update({
                8: {
                  completed: true,
                  name: "Recycled 3 glass items",
                  numberRequired: 0
                },
                9: {
                  completed: false,
                  name: "Recycled 30 glass items",
                  numberRequired: 30 - glasscount
                }
              })
            }
          } else if (this.item == "paper") {
            papercount += 1
            if (papercount < 3) {
              db.collection(this.email).doc("Achievements").update({
                6: {
                  completed: false,
                  name: "Recycled 3 paper items",
                  numberRequired: 3 - papercount
                },
                7: {
                  completed: false,
                  name: "Recycled 30 paper items",
                  numberRequired: 30 - papercount
                }
              })
            } else if (papercount >= 30) {
              db.collection(this.email).doc("Achievements").update({
                6: {
                  completed: true,
                  name: "Recycled 3 paper items",
                  numberRequired: 0
                },
                7: {
                  completed: true,
                  name: "Recycled 30 paper items",
                  numberRequired: 0
                }
              })
            } else {
              db.collection(this.email).doc("Achievements").update({
                6: {
                  completed: true,
                  name: "Recycled 3 paper items",
                  numberRequired: 0
                },
                7: {
                  completed: false,
                  name: "Recycled 30 paper items",
                  numberRequired: 30 - papercount
                }
              })
            }
          } else if (this.item == "metal") {
            metalcount += 1
            if (metalcount < 3) {
              db.collection(this.email).doc("Achievements").update({
                4: {
                  completed: false,
                  name: "Recycled 3 metal items",
                  numberRequired: 3 - metalcount
                },
                5: {
                  completed: false,
                  name: "Recycled 30 metal items",
                  numberRequired: 30 - metalcount
                }
              })
            } else if (metalcount >= 30) {
              db.collection(this.email).doc("Achievements").update({
                4: {
                  completed: true,
                  name: "Recycled 30 metal items",
                  numberRequired: 0
                },
                5: {
                  completed: true,
                  name: "Recycled 30 metal items",
                  numberRequired: 0
                }
              })
            } else {
              db.collection(this.email).doc("Achievements").update({
                4: {
                  completed: true,
                  name: "Recycled 3 metal items",
                  numberRequired: 0
                },
                5: {
                  completed: false,
                  name: "Recycled 30 metal items",
                  numberRequired: 30 - metalcount
                }
              })
            }
          } else if (this.item == "plastic") {
            plasticcount += 1
            if (plasticcount < 3) {
              db.collection(this.email).doc("Achievements").update({
                2: {
                  completed: false,
                  name: "Recycled 3 plastic items",
                  numberRequired: 3 - plasticcount
                },
                3: {
                  completed: false,
                  name: "Recycled 30 metal items",
                  numberRequired: 30 - plasticcount
                }
              })
            } else if (plasticcount >= 30) {
              db.collection(this.email).doc("Achievements").update({
                2: {
                  completed: true,
                  name: "Recycled 3 metal items",
                  numberRequired: 0
                },
                3: {
                  completed: true,
                  name: "Recycled 30 metal items",
                  numberRequired: 0
                }
              })
            } else {
              db.collection(this.email).doc("Achievements").update({
                2: {
                  completed: true,
                  name: "Recycled 3 metal items",
                  numberRequired: 0
                },
                3: {
                  completed: false,
                  name: "Recycled 30 metal items",
                  numberRequired: 30 - plasticcount
                }
              })
            }
          }
          totalcount += 1
          if (totalcount < 10) {
            db.collection(this.email).doc("Achievements").update({
              10: {
                completed: false,
                name: "Recycled 10 items in total",
                numberRequired: 10 - totalcount
              },
              11: {
                completed: false,
                name: "Recycled 100 items in total",
                numberRequired: 100 - totalcount
              }
            })
          } else if (totalcount > 100) {
            db.collection(this.email).doc("Achievements").update({
              10: {
                completed: true,
                name: "Recycled 10 items in total",
                numberRequired: 0
              },
              11: {
                completed: true,
                name: "Recycled 100 items in total",
                "numberRequired": 0
              }
            })
          } else {
            db.collection(this.email).doc("Achievements").update({
              10: {
                completed: true,
                name: "Recycled 10 items in total",
                numberRequired: 0
              },
              11: {
                completed: false,
                name: "Recycled 100 items in total",
                numberRequired: 100 - totalcount
              }
            })
          }
          db.collection(this.email).doc("Profile").get().then(snapShot => {
            var current = new Date()
            var diff = current.getTime()/1000 - snapShot.data()["dateJoined"]["seconds"]
            var days = Math.floor(diff/86400)
            if (days < 3) {
              db.collection(this.email).doc("Achievements").update({
                0: {
                  completed: false,
                  name: "Recycled for 3 days",
                  numberRequired: 3 - days
                },
                1: {
                  completed: false,
                  name: "Recycled for 30 days",
                  numberRequired: 30 - days
                }
              })
            } else if (days > 30) {
              db.collection(this.email).doc("Achievements").update({
                0: {
                  completed: true,
                  name: "Recycled for 3 days",
                  numberRequired: 0
                },
                1: {
                  completed: true,
                  name: "Recycled for 30 days",
                  numberRequired: 0
                }
              })
            } else {
              db.collection(this.email).doc("Achievements").update({
                0: {
                  completed: true,
                  name: "Recycled for 3 days",
                  numberRequired: 0
                },
                1: {
                  completed: false,
                  name: "Recycled for 30 days",
                  numberRequired: 30 - days
                }
              })
            }

            db.collection(this.email).doc("Profile").update({
              dateJoined: snapShot.data()["dateJoined"],
              points: snapShot.data()["points"] + this.points,
              username: snapShot.data()["username"]
            })
          })
        })
      }  
    },
  created() {
    this.getData();
    this.getUser();
    this.addToDB();
    this.update();
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
