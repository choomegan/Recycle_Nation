<template>
  <div id="app">
    <h1 id="title">{{title}}</h1>
    <Header v-if="navigation"></Header>
    
    <content><router-view></router-view></content>
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
      } else if (this.$route.path == "/Registration"){
        this.navigation = false;
      
      } else if (this.$route.path == "/IdentifiedItem") {
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
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align:center;
    margin-top: 0;
    padding-top: 0;
    color:black;
  }

  #title {
    background-color: #8FA984;
    color:white;
    margin-top: 0;
    margin-bottom: 0;
    padding: 50px;
    font-weight: bold;
    font-size: 50px;
  }

  content {
    background-color: #E8E1CF;
  }
</style>
