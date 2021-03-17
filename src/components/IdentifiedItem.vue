<template>
  <div id="content">
    <p>Item recycled: </p>
    <p>Points Earned: </p>
    <button v-on:click="directed()">Back to Home</button>
  </div>
</template>

<script>
//import Header from './components/Header.vue'
export default {
  methods: {
      directed: function() {
          this.$router.push({ path: '/Home' })
      }
  }
}
</script>

<style>
button {
    background-color: #7D6558;
    color: white;
    font-size: 20px;

}
#content {
    background-color: #E8E1CF;
    padding: 50px;
}
</style>
