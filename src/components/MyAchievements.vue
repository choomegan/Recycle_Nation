<template>
    <div id="MyAchievements">
        <div class="sideBySide">
            <div class="boxDisplay" v-for="item in data" v-bind:key="item.name"> 
                <div class="box">
                    <img id="star" v-bind:src= "completed(item.completed)"/>
                </div> 
                <br><br>
                <div class="box" id="name">
                    {{item.name}}
                </div>
                <div class="box" id="unlocked" v-if="item.completed">
                    Achievement Unlocked!
                </div>
                <div class="box" id="locked" v-if="!item.completed">
                    {{item.numberRequired}} more to go!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goldStar: require('../assets/goldStar.png'),
            greyStar: require('../assets/greyStar.png'),
            data: [
                {
                    name: "Recycled for 3 days",
                    numberRequired: 0,
                    completed: true
                },
                {
                    name: "Recycled for 30 days",
                    numberRequired: 27,
                    completed: false
                },
                {
                    name: "Reycled 3 plastic items",
                    numberRequired: 3,
                    completed: false
                },
                {
                    name: "Reycled 30 plastic items",
                    numberRequired: 30,
                    completed: false
                },
                {
                    name: "Recycled 3 metal items",
                    numberRequired: 1,
                    completed: false
                },
                {
                    name: "Reycled 30 metal items",
                    numberRequired: 28,
                    completed: false
                },
                {
                    name: "Recycled 3 paper items",
                    numberRequired: 2,
                    completed: false
                },
                {
                    name: "Recycled 30 paper items",
                    numberRequired: 29,
                    completed: false
                },
                {
                    name: "Recycled 3 glass items",
                    numberRequired: 0,
                    completed: true
                },
                {
                    name: "Recycled 30 glass items",
                    numberRequired: 27,
                    completed: false
                },
                {
                    name: "Recycled 10 items in total",
                    numberRequired: 4,
                    completed: false
                },
                {
                    name: "Recycled 100 items in total",
                    numberRequired: 94,
                    completed: false
                },
            ]
        }
    },
    methods: {
        completed: function(complete) {
            if (complete) {
                return this.goldStar;
            } else {
                return this.greyStar;
            }
        }
    }
}
</script>

<style scoped>
#MyAchievements {
    font-size: 25px;
    padding: 100px;
    background-color: #E8E1CF;
}
.sideBySide {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
}
.side {
    padding: 20px;
    align-content:flex-start;
    width: 200px;
}
#star {
    height: 180px;
}
.boxDisplay {
    padding: 40px;
    justify-content: center;
    margin:10px;
    width: 400px;
    height: 400px;
    background-color:rgb(224, 212, 194);
}
.box {
    padding: 10px;
}

#name {
    font-weight: bold;
    font-size: 30px;
}
</style>