<template>
    <div id="AboutUs">
        <h1>Our Vision</h1>
        <p>Encouraging all Singaporeans to actively recycle</p>
        <h1>Our Mission</h1>
        <p>We aim to promote green movement by making recycling easier for you</p>
    </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
    methods: {
        checkUser: function() {
            var user = firebase.auth().currentUser;
            if (user) {
                //user signed in
            }
            else {
                alert("Please log in to continue.")
                this.$router.push('/Login');
            }
        }
    },
    created() {
        this.checkUser();
    }
}
</script>

<style scoped>
#AboutUs {
    position:absolute;
    width: 100%;
    height: 73%;
    background-color: #E8E1CF;
    text-align: center;
}
h1 {
    padding-top: 6.5%;
    font-size: 40px;
    color: rgb(88, 44, 2);
}
p {
    font-size: 30px;
}
</style>