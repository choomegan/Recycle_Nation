<template>
  <div id="history">
    <table class="table" id="table" v-if="this.dataShow">
      <thead> 
        <tr> 
          <th>Date/Time</th> 
          <th>Name of Item</th> 
          <th>Points Earned</th>
        </tr> 
      </thead> 
    </table> 
    <div id="charts" v-if="this.dataShow">
      <h2>Summary and Statistics</h2> 
      <PieChart></PieChart>
      <br><br>
      <LineChart id="linechart"></LineChart> 
    </div>
    <div id="noData" v-if="!this.dataShow">
      Welcome to Recycle Nation! 
      <br>Start recycling to view your recycling history!
    </div>
  </div>
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
        dataShow: false
      }
    },
    components: {
      PieChart,
      LineChart
    },
    methods: {
        dataPresent: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
            }
            else {
              alert("Please log in to continue.")
                this.$router.push('/Login');
            }
            db.collection(user.email).doc("Recycling history").get().then((doc) => {
              console.log("doc.data()")
              console.log(doc.data())
              console.log(!doc.data())
              if (!doc.data()) {
                this.dataShow = false;
              } else {
                this.dataShow = true;
                this.retrieveData()
              }
            })
        },
        retrieveData: function() {
            var user = firebase.auth().currentUser;
            db.collection(user.email).doc("Recycling history").get().then(doc => {
              Object.values(doc.data()).forEach(item => {
                /*
                let row = `<tr>
                              <td>${item.Date} ${item.Time}</td>
                              <td>${item.Item}</td> 
                              <td>${item.Points}</td> 
                          <tr>`
                */
                let table = document.getElementById("table").insertRow(1)
                table.className = "rowdiv"
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
  font-size: 30px;
  font-family: Avenir;
  color: #69815e;
}

.table{
    margin-left: 0%;
    font-size: 15px;
    font-family: Avenir;
    width: 50%;
    padding: 50px;
    float: left;
    /* background-color: #E8E1CF; */
    min-height: 100px;
}

.rowdiv {
  background-color: blue;
}

thead {
    background-color: #70533b;
    color: white;
    text-align: center;
    border-collapse:collapse;

}

tr {
  color: white; 
  border-bottom: thin;
}

th, td{
  text-align: center;
  padding: 10px;
  color:white;

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
