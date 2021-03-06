import { Line } from 'vue-chartjs'
import firebase from 'firebase/app'
import db from '../../firebase.js'

export default {
    extends: Line, 
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets:[{
                    data: [],
                    label: "Points Earned",
                    borderColor: "#E5634F",
                    fill: false
            }]
            },
            options: {
                title: {
                    display: true,
                    text: "Points earned over the past 3 months",
                    fontSize: 17
                },
                responsive: true,
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
    methods: {
        chartData: function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user== null) {
                    console.log("not logged in")
                    this.$router.push('/Login');
                } else {
                    this.email = user.email;
                    db.collection(user.email).doc("Recycling history").get().then((doc) => {
                        var current = new Date()
                        console.log(doc.data())
                        for (let i = current.getMonth(); i < current.getMonth()+3; i++) {
                            var month = i-3
                            var year = current.getFullYear()
                            if (month < 0) {
                                month = 11 + month
                                year = (parseInt(year) - 1).toString()
                            }
                            var base = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
                            var full = base[month] + " " + year
                            this.datacollection.labels.push(full)
                            var monthtotal = 0;
                            Object.values(doc.data()).forEach(minidoc => {
                                var month2 = minidoc.Date.slice(3,5);
                                var year2 = minidoc.Date.slice(6,10)
                                if (year == year2) {
                                    if (month + 1 == month2) {
                                        monthtotal += minidoc.Points
                                    }
                                }
                            })
                            this.datacollection.datasets[0].data.push(monthtotal)
                        }
                        this.renderChart(this.datacollection, this.options)
                    });
                }
            })
        }
    },
    created() {
        this.chartData();
    }
}