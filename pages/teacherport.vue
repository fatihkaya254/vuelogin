<template lang="pug">
div
    .top
      Navbar
    #content
        form
            #loginArea
                .part
                    label Telefon Numarası
                    input(type="tel" v-model="phoneNumber" :maxlength="phoneLength" suggested="user-name")
                .part
                    label Şifre
                    input(type="password" v-model="pass" maxlength="8" suggested="current-password" autocomplete="on")
                #enter(@click="enter()") {{loading ? 'Yükleniyor..' : 'Giriş'}}
                label(class="warn") {{this.$store.getters.canPass ? 'Numara veya Şifre Hatalı' : ''}}
    .bottom(v-if="this.$store.getters.isAuthenticated")
      Bottombar
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Bottombar from "@/components/Bottombar.vue";
export default {
  data() {
    return {
      pass: "",
      phoneNumber: "",
      phoneLength: 11,
      loading: true
    };
  },
  middleware: ["session-control", "teacherPort"],
  components: {
    Navbar,
    Bottombar
  },
  methods: {
    enter: function() {
      const _this = this;
      _this.$store.dispatch("enterPass", {
        phone: _this.phoneNumber,
        code: _this.pass
      });
    }
  },
  beforeCreate() {
    this.loading = true;
  },
  beforeMount() {
    this.loading = false;
  },
  watch: {
    phoneNumber(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
    },
    pass(value) {
      var pass = value.length;
      if (pass == 8) this.enter();
    }
  }
};
</script>

<style lang="sass" scoped>
#content
    background: antiquewhite
    height: 100vh
    display: flex
    justify-content: center
    align-items: center
#loginArea
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px
    border-radius: 1em
    width: 300px
    height: 300px
    background-color: white
    display: flex
    flex-direction: column
    gap: 20px
    justify-content: center
    align-items: center
    .part
        width: 80%
        display: flex
        flex-direction: column
        gap: 5px
        align-items: center
    #enter
        transition: all 0.5s ease
        height: 40px
        width: 80%
        color: white
        background-color: black
        text-align: center
        padding: 8px
        border-radius: 1em
        cursor: pointer
        &:hover
            color: black
            background-color: white
            border: 1px solid black
    input
        height: 40px
        width: 100%
        border-radius: 1em
        outline: none
        border: 0.5px solid black
        text-align: center
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
.warn
    font-size: 9pt
    color: red
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
</style>
