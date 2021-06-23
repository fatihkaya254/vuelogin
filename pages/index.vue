<template lang="pug">
div
  Navbar
  .lockServicePop(v-show="getPackagePop()")
    .close(@click="closePop()") x
    LockService
  HomePageCharts
  ServiceList
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import HomePageCharts from "@/components/HomePageCharts.vue";
import ServiceList from "@/components/ServiceList.vue";
import LockService from "@/components/LockService.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  middleware: ["session-control", "homeAuth"],
  components: {
    HomePageCharts,
    Navbar,
    ServiceList,
    LockService
  },
  methods: {
    ...mapActions(["setPackagePop"]),
    ...mapGetters(["getPackagePop"]),
    closePop(){
      this.setPackagePop(false)
    }
  }
};
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

.close
  position: absolute
  right: 0
  margin-right: 18px
  margin-top: 10px
  cursor: pointer
</style>
