<template>
  <div id="app">
    <h1>Recycle Nation</h1>
    <Header></Header>
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
    }
  },
  components: {
    Header
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size:20px;
    text-align:center;
    margin-top: 60px;
    color:black;
  }

  h1 {
    background-color: #8FA984;
    color:white;
    padding: 70px;
  }
</style>
