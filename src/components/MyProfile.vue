<template>
    <div id="MyProfile">
        <img v-bind:src="image" id="icon"/>
        <span>Username <br> Joined 40 days ago</span>
        <br><br>
        <div>
            Total Points earned: 0
            <span v-on:click="rewards">Rewards Shop</span>
            <br><br>
            Achievements
            <span v-on:click="achievements">View All</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            image:require('../assets/holding_plants.png')
        }
    },
    methods: {
        rewards: function() {
            this.$router.push({path:"/MyRewards"})
        },
        achievements: function() {
            this.$router.push({path:"/MyAchievements"})
        }
    }
}
</script>

<style scoped>
#MyProfile {
    font-size: 25px;
    padding: 170px;
    background-color: #E8E1CF;
    text-align: left;
}
#icon{
    width: 108px;
    height: 85px;
    left: 206px;
    top: 397px;
    background: './assets/5680_-_Holding_Plants-512.png';
    mix-blend-mode: difference;

}

</style>