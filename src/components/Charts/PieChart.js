import { Pie } from 'vue-chartjs'
import firebase from 'firebase/app'
import db from '../../firebase.js'

export default {
    extends: Pie,
    data: function() {
        return {
            datacollection: {
                labels: ["Glass", "Plastic", "Paper", "Metal"],
                datasets: {
                    label: "Overview of materials recycled",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                    data:[0,0,0,5]
                }
            },
            options: {
                title: {
                    display: true,
                    text: 'Hello'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        chartData: function() {
            var user = firebase.auth().currentUser;
            db.collection(user.email).doc("Recycling history").get().then(doc => {
            
                Object.values(doc.data()).forEach(item => {
                    console.log("hello")
                    console.log(this.datacollection.datasets.data)
                    console.log("printed")
                    if (item.Item == "glass") { 
                        this.datacollection.datasets.data[0] += 1;
                    } else if (item.Item == "plastic") {
                        this.datacollection.datasets.data[1] += 1;
                    } else if (item.Item == "paper") {
                        this.datacollection.datasets.data[2] += 1;
                    } else {
                        this.datacollection.datasets.data[3] += 1;
                    }
                })
            })
            //console.log(this.datacollection.datasets.data)
        }
    },
    created() {
        this.chartData();
    },
    mounted() {
        this.renderChart(this.datacollection, this.options)
    }
}