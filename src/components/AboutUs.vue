<template>
    <div id="AboutUs">
        <div id="vision">
            <h1>Our Vision</h1>
            <p>Encouraging all Singaporeans to actively recycle.</p>
        </div> 
        <div id="mission">
            <h1>Our Mission</h1>
            <p>We aim to promote green movement by making recycling easier for you.</p>
        </div> 
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
    text-align: center;
    background-color: #61756b;
    color:  #ebe8de;

}
h1 {
    padding-top: 6.5%;
    font-size: 30px;
    font-family: Avenir;
}
p {
    font-size: 22px;
    font-family: Avenir, Helvetica;
}

#vision {
    background-color: #ebe8de;
    color: hsla(76, 33%, 20%);
    padding-bottom: 100px;
    padding-top: 10px;
}
#mission {
    background-color:  hsl(76, 33%, 20%);
    margin-top: 0;
    padding-top: 10px;
    padding-bottom: 100px;
}
</style>