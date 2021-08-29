<template lang="pug">
div
  Navbar
  .lockServicePop(v-show="getPackagePop()")
    LockService
  img(:src=" ourhost + '/logo.png'" v-show="this.$store.getters.userPic")
  //TeacherList
  //HomePageCharts
  //ServiceList
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import HomePageCharts from "@/components/HomePageCharts.vue";
import ServiceList from "@/components/ServiceList.vue";
import TeacherList from "@/components/TeacherList.vue";
import LockService from "@/components/LockService.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      ourhost: process.env.OUR_URL
    };
  },
  middleware: ["session-control", "homeAuth"],
  components: {
    HomePageCharts,
    Navbar,
    ServiceList,
    LockService,
    TeacherList
  },
  methods: {
    ...mapActions(["setPackagePop"]),
    ...mapGetters(["getPackagePop"]),
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

</style>
