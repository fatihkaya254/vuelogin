<template lang="pug">
div
  Navbar
  .top
    Navbar
  nuxt-child  
  .bottom(v-if="this.$store.getters.isAuthenticated")
    Bottombar
  Bottombar
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Bottombar from "@/components/Bottombar.vue";
export default {
  data() {
    return {};
  },
  middleware: ["session-control", "myRecords"],
  components: {
    Navbar,
    Bottombar
  },
};
</script>

<style lang="sass" scoped>
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
.top
  position: fixed
  z-index: 5
  top: 0
  width: 100vw

.bottom
  position: fixed
  z-index: 5
  width: 100vw
  bottom: 0
  @media screen and (min-width: 1200px)
    display: none
body
  font-family: 'Lemon/Milk light Regular'
  letter-spacing: 1px
  font-size: 12pt
  margin: 0px
  // background-color: antiquewhite
  background-color: white
  -webkit-appearance: none
.lspWrapper
  width: 100vw
  height: 100vh
  position: absolute
  z-index: 1

.lockServicePop
  position: fixed
  background-color: rgb(199, 199, 204)
  border-radius: 1em
  display: inline-block
  height: 80vh
  width: 60vw
  z-index: 2
  margin-left: 20vw
  margin-top: 2vh

img
  width: 100%

.mainImage
  width: 80%
  margin: auto
  text-align: center
  @media screen and (max-width: 1200px)
    width: 100%
</style>
