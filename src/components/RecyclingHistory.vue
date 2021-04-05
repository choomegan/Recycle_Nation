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
    <h2>Summary and Statistics</h2> 
    <PieChart></PieChart>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase.js'
import PieChart from './Charts/PieChart.vue'

export default {
    data() {
      return {
        title: "Recycling History"
      }
    },
    components: {
      PieChart
    },
    methods: {
        retrieveData: function() {
            var user = firebase.auth().currentUser;
            console.log("hello")
            db.collection(user.email).doc("Recycling history").get().then(doc => {
              console.log(doc.data()) 
              console.log("doc.data()")
              Object.values(doc.data()).forEach(item => {
                console.log(item)
                console.log("item")
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
