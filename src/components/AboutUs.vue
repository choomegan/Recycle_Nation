<template>
    <div id="AboutUs">
        <div class="side">
        <transition name="fade" enter-active-class="animated slideInLeft" appear>
        <div id="vision">
            <h1>Our Vision</h1>
            <p>Encouraging all Singaporeans to actively recycle.</p>
        </div> 
        </transition>
        <transition name="fade" enter-active-class="animated slideInRight" appear>
        <div id="mission">
            <h1>Our Mission</h1>
            <p>We aim to promote green movement by making recycling easier for you.</p>
        </div>
        </transition>
        </div>
        <footer>
            For enquiries, please contact:<br><br>
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
            firebase.auth().onAuthStateChanged((user) => {
                if (user== null) {
                    console.log("not logged in")
                    alert("Please log in to continue.")
                    this.$router.push('/Login');
                } else {
                    console.log(user)
                }
            })
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
    height: 100%;
    text-align: center;
    object-fit: cover;
    background-image: url('~@/assets/forest3.jpg');
    background-size: cover;
    color:#ebe8de;

}
.side {
    display: flex;
    flex-direction: row;
}
h1 {
    padding: 2%;
    padding-bottom: 7px;
    font-size: 26px;
    font-family: Avenir;
}
p {
    font-size: 20px;
    font-family: Avenir, Helvetica;
}

#vision {
    background-color: #ebe8de; 
    color:hsl(76, 33%, 20%);
    padding:160px 190px;
    width:40%;
}
#mission {
    background-color:  hsl(76, 33%, 20%);
    padding: 160px 190px;
    width:40%;
}

footer {
    font-size: 19px;
    color: rgb(228, 163, 78);
    text-align: center;
    padding: 60px;
    font-family:Asap, Avenir;
}
a {
    padding: 30px;
    font-size: 17px;
}

a:link {
  color:rgb(228, 163, 78);
  background-color: transparent; 
  text-decoration: none;
}

a:hover {
  color: rgb(162, 180, 140);;
  background-color: transparent;
  text-decoration: underline;
}

.slideInLeft {
    -webkit-animation-name: slideInLeft;
    animation-name: slideInLeft;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
}

.slideInRight {
    -webkit-animation-name: slideInRight;
    animation-name: slideInRight;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
}
</style>