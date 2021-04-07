import { Line } from 'vue-chartjs'
//import firebase from 'firebase/app'
//import db from '../../firebase.js'

export default {
    extends: Line, 
    data: function() {
        return {
            datacollection: {
                labels: ['Jan 2021', 'Feb 2021', 'Mar 2021'],
                datasets:[{
                    data: [5,10,7],
                    label: "Points Earned",
                    borderColor: "#E5634F",
                    fill: false
            }]
            },
            options: {
                title: {
                    display: true,
                    text: "Points earned over the past 3 months",
                    fontSize: 20
                },
                responsive: false,
                maintainAspectRatio: false, 
                scales : {
                    yAxes: [{
                        ticks:{
                            min:0,
                            precision: 0
                        }
                    }]
                }
            }
        }
    },
    mounted() {
        this.renderChart(this.datacollection, this.options)
    }
}