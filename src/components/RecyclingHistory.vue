<template>
  <div id="history">
    <table id="table">
      <thead> 
          <th>Date/ Time</th> 
          <th> Name of Item </th> 
          <th>Points Earned </th>
      </thead> 
    </table><br><br> 
    <h2>Summary and Statistics</h2> 
    <div id="pie">
      <pie-chart></pie-chart>
    </div> 
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase.js'
import PieChart from './Charts/PieChart.vue'

export default {
    name: 'pie',
    components: {
        PieChart
    },
    data() {
      return {
      }
    },
    methods: {
        retrieveData: function() {
            var user = firebase.auth().currentUser;
            db.collection(user.email).doc("Recycling history").get().then(doc => {
                Object.values(doc.data()).forEach(item => {
                    //console.log(item)
                    //console.log("item")
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
  padding: 170px;
  background-color: #E8E1CF;
}
table{
    margin: 20px;
    font-size: 15px;
    font-family: sans-serif;
    min-width: 1000px;
    background-color: white;
}

thead {
    background-color: #70533b;
    color: #ffffff;
    text-align: left;
}

tr {
  color: blue;
  border-bottom: thin;
}

th, td{
  text-align: center;
  padding: 10px;
}

h2 {
  color: #69815e;
}

</style>
