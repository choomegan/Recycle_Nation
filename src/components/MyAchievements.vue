<template>
    <div id="MyAchievements">
        <div class="sideBySide">
            <div class="side" v-for="item in data" v-bind:key="item.name"> 
                <a v-if="item.completed">
                    <img id="star" v-bind:src="goldStar" v-tooltip.bottom="item.name"/>
                </a>
                <a v-if="!item.completed">
                    <img id="star" v-bind:src="greyStar" v-tooltip.bottom="item.name"/>                      
                </a>
            </div>
        </div>
        <!-- <div class="boxDisplay" v-for="item in data" v-bind:key="item.name"> 
            <div class="box">
                {{item.name}}
            </div>
            <div class="box">
                <img id="star" v-bind:src="greyStar"/>
            </div>     
        </div> -->
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
                    name: "Recycled 3 days in a row",
                    numberRequired: 0,
                    completed: true,
                    hover: false
                },
                {
                    name: "Reycled 3 plastic items",
                    numberRequired: 3,
                    completed: false,
                    hover: false
                },
                {
                    name: "Recycled 3 metal items",
                    numberRequired: 1,
                    completed: false,
                    hover: false
                },
                {
                    name: "Recycled 3 paper items",
                    numberRequired: 2,
                    completed: false,
                    hover: false
                },
            ]
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
    height: 120px;
}
.boxDisplay {
    padding: 10px;
    border: 1px solid; 
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    box-shadow:turquoise;
    margin:10px;
}
.box{
    padding: 40px;
    margin: 10px;
}
</style>