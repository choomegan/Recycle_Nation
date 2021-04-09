<template>
  <div id="history">
    <table class="table" id="table">
      <thead> 
        <tr> 
          <th>Date/Time</th> 
          <th>Name of Item</th> 
          <th>Points Earned</th>
        </tr> 
      </thead> 
    </table> 
    <div id="charts">
      <h2>Summary and Statistics</h2> 
      <PieChart></PieChart>
      <br><br>
      <LineChart id="linechart"></LineChart> 
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
        title: "Recycling History"
      }
    },
    components: {
      PieChart,
      LineChart
    },
    methods: {
        retrieveData: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
            }
            else {
              alert("Please log in to continue.")
                this.$router.push('/Login');
            }
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
      this.retrieveData();
    }
}
</script>

<style scoped>
#history {
  height: 1000px;
  background-color: #ebe8de;
}
/* div {
  padding: 0px;
  background-color: #ebe8de;
} */

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
