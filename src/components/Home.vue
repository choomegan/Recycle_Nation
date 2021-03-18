<template>
    <div id="Home">
        <p>Common Recyclable Items </p>
        <br>
        <div class="recycle-box">
            <div class="recycle" v-for="recycle in this.info" v-bind:key="recycle">
                <p id="item">{{recycle.type}}</p>
                <ul v-for="item in recycle.data" v-bind:key="item[0]">
                    <li>{{item}}</li>
                </ul>
            </div>
        </div>

        
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: [
                {type: 'Paper', data: ['Flyers, Letters, Envelopes', 'Newspaper', 'Flattened tissue box']},
                {type: 'Plastic', data: ['Plastic packaging from food','Empty detergent, soap and condiment bottles', 'Cosmetic bottles and containers']},
                {type: 'Glass', data: ['Empty condiment bottles and containers', 'Glassware']},
                {type: 'Metal', data: ['Aluminum cans (from canned drinks and canned food)', 'Aerosal can']},
            ]
        }
    }
}
</script>

<style scoped>
#Home {
    padding: 60px;
    background-color: #E8E1CF;
    text-align: top;
}
.recycle-box {
    display: flex;
    flex-direction: row;
}
.recycle {
    border:solid;
    border-color: slategray;
    width:400px;
    text-align: left;
    font-size: 20px;
    border-width: 2px;
    padding:5px;
}
#item {
    font-weight:bold;
    color:darkgreen;
    font-size:25px;
    text-align: center;
}
p {
    font-size: 25px;
    font-weight:bold;
}
</style>