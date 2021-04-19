<template>
<transition name="fade" enter-active-class="animated fadeInUp" appear>
  <div id="history">
    <table class="table" id="table" v-show="this.dataShow">
      <thead> 
        <tr> 
          <th>Date/Time</th> 
          <th>Name of Item</th> 
          <th>Points Earned</th>
        </tr> 
      </thead> 
    </table> 
    <div id="charts" v-show="this.dataShow">
      <h2>Summary and Statistics</h2> 
      <PieChart></PieChart>
      <br><br>
      <LineChart id="linechart"></LineChart> 
    </div>
    <div id="noData" v-show="!this.dataShow">
      Welcome to Recycle Nation! 
      <p>Start recycling to view your recycling history</p>
    </div>
  </div>
</transition>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase.js'
import PieChart from './Charts/PieChart.vue'
import LineChart from './Charts/LineChart.vue'

export default {
    data() {
      return {
        title: "Recycling History",
        dataShow: false,
        email: "",
      }
    },
    components: {
      PieChart,
      LineChart
    },
    methods: {
        dataPresent: function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user== null) {
                    console.log("not logged in")
                    this.$router.push('/Login');
                } else {
                    console.log(user)
                    this.email = user.email;
                    console.log(this.email)
                }
            })
            db.collection(this.email).doc("Recycling history").get().then((doc) => {
              console.log("doc.data()")
              console.log(doc.data())
              console.log(!doc.data())
              if (!doc.data()) {
                this.dataShow = false;
              } else {
                this.dataShow = true;
                //this.retrieveData()
              }
            })
        },
        retrieveData: function() {
            db.collection(this.email).doc("Recycling history").get().then(doc => {
              Object.values(doc.data()).forEach(item => {
                /*
                let row = `<tr>
                              <td>${item.Date} ${item.Time}</td>
                              <td>${item.Item}</td> 
                              <td>${item.Points}</td> 
                          <tr>`
                */
                let table = document.getElementById("table").insertRow(1)
                //table.innerHTML += row 
                var x = table.insertCell(0)
                var y = table.insertCell(1)
                var z = table.insertCell(2)
                x.innerHTML=item.Date + "  " + item.Time
                y.innerHTML=item.Item
                z.innerHTML=item.Points
                
              })
            })
        }
    },
    created() {
      this.dataPresent();
      this.retrieveData();
    }
}
</script>

<style scoped>
#history {
  height: 1000px;
  background-color: #ebe8de;
}
#noData {
  padding: 100px;
  font-size: 35px;
  font-family: Asap,Avenir;
  color: #69815e;
}

#noData p {
  font-size: 20px;
  font-family: Avenir;
  color: black;
}

.table{
    margin-left: 0%;
    font-size: 15px;
    font-family: Avenir;
    width: 50%;
    padding: 50px;
    float: left;
    min-height: 100px;
}

thead {
    background-color: #dbd5c8;
    color: black;
    text-align: center;
    border-collapse:collapse;

}

th, td{
  text-align: center;
  padding: 10px;
  color:#69815e;

}

h2 {
  color: #69815e;
  font-family: Asap, Avenir;
  text-decoration: underline;
  text-align: center;
}

#linechart {
    padding-left: 0%;
}

#charts {
  padding-top: 40px;
  width: 50%;
  float: left;
  align-content: center;
}

</style>
