import { Line } from 'vue-chartjs'
//import firebase from 'firebase/app'
//import db from '../../firebase.js'

export default {
    extends: Line, 
    data: function() {
        return {
            datacollection: {
                labels: ['Apr 2021', 'May 2021', 'Jun 2021'],
                datasets:[{
                    data: [],
                    label: "hi",
                    borderColor: "#3e95cd",
                    fill: false
            }]
            },
            options: {
                title: {
                    display: true,
                    text: "Points earned over time"
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.datacollection, this.options)
    }
}