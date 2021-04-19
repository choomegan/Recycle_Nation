<template>
  <div id="app">
    <h1 id="title">{{title}}</h1> 
    <Header v-if="navigation" id="head" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  data() {
    return {
      title: 'Recycle Nation',
      navigation: true
    }
  },

  components: {
    Header
  },
  methods: {
    showNavigation: function() {
      console.log(this.$route.path)
      if (this.$route.path == "/") {
        this.navigation = false;
      } 
      else if (this.$route.path == "/Registration" || this.$route.path=="/QR"){
        this.navigation = false;
      } 
      else if (this.$route.path.startsWith("/IdentifiedItem")) {
        this.navigation = false;
      } 
      else if (this.$route.path.startsWith("/Login")) {
        this.navigation = false;
      }
      else if (this.$route.path.startsWith("/ForgotPassword")) {
        this.navigation = false;
      }
      else {
        this.navigation = true;
      }
    },
    updatingHeader: function() {
      if (this.$route.name == "Login" || this.$route.name =="Registration") {
      this.title = 'Recycle Nation';
      } else {
      this.title = this.$route.name;
    }
    }
  },
  
  created : function() {
    this.showNavigation()
    this.updatingHeader()
  },
  updated: function() {
    this.showNavigation();
    this.updatingHeader()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Asap|Lato|Open+Sans|Segoe+UI');
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

  #app {
    font-family: "Segoe UI", Helvetica, Arial, sans-serif;
    text-align:center;
    margin-top: 0;
    padding-top: 0;
    color:black;
  }

  #title {
    background-image: url('~@/assets/forest-bg.jpg');
    object-fit: cover;
    background-size: cover;
    font-family: Asap;
    color:white;
    margin-top: 0;
    margin-bottom: 0;
    padding: 50px;
    font-weight: 600;
    font-size: 47px;
  }

  #head {
    background-color: #d8d4c8;
    padding: 2px;
    font-family: Asap, Avenir;
    font-size: 16px;
  }

</style>
