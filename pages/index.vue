<template lang="pug">
div
  Navbar
  router-view
  HomePageCharts
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Cookie from "js-cookie";
import HomePageCharts from "@/components/HomePageCharts.vue";
export default {
  middleware : ["session-control", "auth"],
  components:{
    HomePageCharts,
    Navbar
  },
    created(){
      //let cookie = Cookie.get("jwt")
      //console.log('cookie: ' + cookie);
      //this.$store.dispatch("initAuth", cookie)
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Lemon/Milk light Regular'
  font-style: normal
  font-weight: normal
  src: local('Lemon/Milk light Regular'), url('assets/LemonMilklight.woff') format('woff')
  src: url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap')
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50


body
  font-family: 'Lemon/Milk light Regular'
  letter-spacing: 1px
  font-size: 12pt
  margin: 0px
  background-color: antiquewhite
  -webkit-appearance: none
</style>
