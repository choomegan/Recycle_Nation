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
#table{
    text-align: center;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    align-content: center ;
}

#table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    padding: 10px;
}
th, td{
  padding: 12px;
}
#history {
  justify-content: center;
}
</style>
