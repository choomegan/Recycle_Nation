<template>
  <div id="history">
    <table id="table">
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
                let row = `<tr>
                              <td>${item.Date} ${item.Time}</td>
                              <td>${item.Item}</td> 
                              <td>${item.Points}</td> 
                          <tr>`
                let table = document.getElementById("table")
                table.innerHTML += row 
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
div {
  padding: 0px;
  background-color: #E8E1CF;
}
table{
    margin-left: 0%;
    font-size: 15px;
    font-family: Avenir;
    width: 40%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 50px;
    float: left;
    
}

thead {
    background-color: #70533b;
    color: black;
    text-align: left;
}

tr {
  color: white; 
  border-bottom: thin;
}

th, td{
  text-align: center;
  padding: 10px;
}

h2 {
  color: #69815e;
  font-family: Asap, Avenir;
  text-decoration: underline;
}

#linechart {
    /*padding-left: 15%;*/
}

#charts {
  width: 60%;
  float: left;
}

</style>
