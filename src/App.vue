<template>
  <div id="app">
    <h1 id="title">Recycle Nation</h1>
    <Header v-if="navigation"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  data() {
    return {
      title: 'Header',
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
    }
  },
  created : function() {
    this.showNavigation()
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size:20px;
    text-align:center;
    margin-top: 0;
    padding-top: 0;
    color:black;
  }

  #title {
    background-color: #8FA984;
    color:white;
    margin-top: 0;
    padding: 70px;
  }
</style>
