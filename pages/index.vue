<template lang="pug">
div
  .mainImage(v-if="loading")
    Loader
  .other(:style="[loading ? {filter: 'blur(1px)'} : '']")
    .top
      Navbar
    .lockServicePop(v-show="getPackagePop()")
      LockService
    //TeacherList
    //HomePageCharts
    //ServiceList
    .bottom(v-if="this.$store.getters.isAuthenticated")
      Bottombar
    footer
      Footer
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Bottombar from "@/components/Bottombar.vue";
import Footer from "@/components/footer.vue";
import HomePageCharts from "@/components/HomePageCharts.vue";
import ServiceList from "@/components/ServiceList.vue";
import TeacherList from "@/components/TeacherList.vue";
import LockService from "@/components/LockService.vue";
import Loader from "@/components/loader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true
    };
  },
  middleware: ["session-control", "homeAuth"],
  components: {
    HomePageCharts,
    Navbar,
    Footer,
    ServiceList,
    LockService,
    TeacherList,
    Bottombar,
    Loader
  },
  methods: {
    ...mapActions(["setPackagePop"]),
    ...mapGetters(["getPackagePop"]),
  },
  beforeCreate(){
    this.loading = true
  },
  beforeMount() {
    this.loading = false
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
  top: 0
  width: 100vw

.bottom
  position: fixed
  width: 100vw
  bottom: 0

body
  filter: blur(12px)
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
  width: 100vw
  background: rgb(240, 240, 240,0.2)
  height: 100vh
  position: absolute
  z-index: 20

.other
  padding-top: 50px
  padding-bottom: 50px
</style>
