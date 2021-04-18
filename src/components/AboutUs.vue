<template>
    <div id="AboutUs">
        <div id="vision">
            <h1>Our Vision</h1>
            <p>Encouraging all Singaporeans to actively recycle.</p>
        </div> 
        <transition name="fade" enter-active-class="animated slideInRight"> 
        <div id="mission">
            <h1>Our Mission</h1>
            <p>We aim to promote green movement by making recycling easier for you.</p>
        </div>
        </transition>
        <footer>
            Feel free to drop us a message!<br><br>
            <a href="tel:+65 67583827">+65 67583827</a> 
            <a href="mailto:recyclenation@gmail.com">recyclenation@gmail.com</a> 
        </footer> 
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
    color:hsl(76, 33%, 20%);
    padding-bottom: 110px;
    padding-top: 20px;
}
#mission {
    background-color:  hsl(76, 33%, 20%);
    margin-top: 0;
    padding-top: 20px;
    padding-bottom: 110px;
}

footer {
    font-size: 19px;
    color: rgb(228, 200, 148);
    text-align: center;
    padding: 50px;
    object-fit: cover;
    background-image: url('~@/assets/forest-full.jpg');
    font-family:Asap, Avenir;
}
a {
    padding: 30px;
    font-size: 17px;
}

a:link {
  color: rgb(228, 163, 78); 
  background-color: transparent; 
  text-decoration: none;
}

a:hover {
  color: rgb(162, 180, 140);
  background-color: transparent;
  text-decoration: underline;
}



</style>