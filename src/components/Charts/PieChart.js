import { Pie } from 'vue-chartjs'
import firebase from 'firebase/app'
import db from '../../firebase.js'

export default {
    extends: Pie,
    data: function() {
        return {
            datacollection: {
                labels: ["Glass", "Plastic", "Paper", "Metal"],
                datasets: [{
                    label: "Overview of materials recycled",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                    data:[0,0,0,0]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Distribution of all items recycled',
                    fontSize: 20
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        chartData: function() {
            var user = firebase.auth().currentUser;
            db.collection(user.email).doc("Recycling history").get().then((doc) => {
                var index;
                var item = doc.data()
                for(index = 0; index < Object.keys(item).length; index++) {
                    if (item[index].Item == "glass") { 
                        this.datacollection.datasets[0].data[0] += 1;
                    } else if (item[index].Item == "plastic") {
                        this.datacollection.datasets[0].data[1] += 1;
                    } else if (item[index].Item == "paper") {
                        this.datacollection.datasets[0].data[2] += 1;
                    } else {
                        this.datacollection.datasets[0].data[3] += 1;
                    }       
                }
                this.renderChart(this.datacollection, this.options)
            });
            
            
        }
    },
    created() {
        this.chartData();
    },
}