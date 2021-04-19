<template>
<transition name="fade" enter-active-class="animated fadeIn" appear>
    <div id="Home">
        <p id="header">Common Recyclable Items </p>
        <br>
        <div class="recycle-box">
            <div class="recycle" v-for="recycle in this.info" v-bind:key="recycle[0]">
                <p id="item">{{recycle.type}}</p>
                <ul v-for="item in recycle.data" v-bind:key="item">
                    <li>{{item}}</li>
                </ul>
            </div>
        </div><br><br> 
        <div id="disclaimer">Check out  
            <a href="https://www.nea.gov.sg/docs/default-source/our-services/waste-management/list-of-items-that-are-recyclable-and-not.pdf">NEA's guide</a> 
            to common recyclables
        </div> 
    </div>
</transition>
</template>

<script>
import firebase from 'firebase/app'
export default {
    data() {
        return {
            info: [
                {type: 'Paper',      data: ['Flyers, Letters, Envelopes', 'Newspaper', 'Flattened tissue box']},
                {type: 'Plastic',    data: ['Plastic packaging from food','Empty detergent, soap and condiment bottles', 'Cosmetic bottles and containers']},
                {type: 'Glass',      data: ['Empty condiment bottles and containers', 'Glassware']},
                {type: 'Metal',      data: ['Aluminum cans (from canned drinks and canned food)', 'Aerosal can']}
            ],
            email:"",
            data:{}
        }
    },
    methods: {
        checkUser: function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user== null) {
                    console.log("not logged in")
                    alert("Please log in to continue.")
                    this.$router.push('/Login');
                } else {
                    this.email = user.email;
                }
            })
            console.log(this.email);
        }
    },
    created() {
        this.checkUser();
    }
}
</script>

<style scoped>
#Home {
    padding: 40px 100px 60px;
    padding-top:110px;
    padding-bottom: 100px;
    background-image: url('~@/assets/forest-full2.jpg');
    background-size: cover;
    text-align: center;
    min-height: 500px;
    color:white;
}
.recycle-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.recycle {
    font-family: Avenir, Helvetica;
    border:solid;
    border-color: #b1a68c;
    width:400px;
    text-align: left;
    font-size: 20px;
    border-width: 1px;
    padding:30px;
}
#item {
    font-family: Avenir, Helvetica;
    font-weight:bold;
    color: rgb(204, 149, 46); 
    font-size:25px;
    font-style: italic;
    text-align:center;
}
p {
    font-size: 25px;
    font-weight:bold;
    padding-bottom:20px;
}

#header {
    font-family: Avenir;
    font-weight: bold;
}

#disclaimer {
    font-family: Asap,Avenir, Helvetica;
    font-weight: bold;
    font-size: 19px;
    color:  rgb(204, 149, 46);
    letter-spacing: 0.0625em;
}

a {
    color: rgb(204, 149, 46);
}

a:hover {
    color:  rgb(224, 201, 152);
}
</style>