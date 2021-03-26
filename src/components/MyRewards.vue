<template>
    <div id="MyRewards">
        <div class="split">
            <div class="halves">
                <div class="sideBySide">
                    <div class="side" v-for="item in rewards" v-bind:key ="item.name">
                        <img id="icon" v-bind:src="item.image"/>
                        <br>
                        {{item.points}} points
                        <br>
                        <button>Exchange</button>
                        <br><br>
                    </div>
                </div>
            </div>
            <div class="halves">
                My Rewards
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rewards: [
                {
                    name: 'tree',
                    image: require('../assets/tree.png'),
                    points: 0,
                },
                {
                    name: 'grabFood',
                    image: require('../assets/grabFood.png'),
                    points: 0,
                },
                {
                    name: "grabGifts",
                    image: require('../assets/grabGifts.png'),
                    points: 0,
                },
                {
                    name: "donate",
                    image: require('../assets/donate.png'),
                    points: 0,
                },
            ]
        }
    }
}
</script>

<style scoped>
#MyRewards {
    font-size: 25px;
    padding: 50px;
    background-color: #E8E1CF;
}
.split {
    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
    
}
.sideBySide {
    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
    flex-flow: wrap;
}
.halves {
    padding: 20px 100px 20px 100px;
    background-color:oldlace;
    align-content:flex-start;
}

.side {
    background-color:oldlace;
    padding: 10px 40px 10px 40px;
}

#icon {
    height: 120px;
    width: 150px;
}
</style>