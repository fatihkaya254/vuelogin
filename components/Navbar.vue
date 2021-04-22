<template lang="pug">
header
  .header
    .logo
      a(href="/") 
        img(src="../assets/logo.png", :title="iz", alt="İzders")
    .account 
      div(:class="[login, this.$store.state.toForm ? form : '']")
        input#login(type="submit", :value="this.$store.state.loginText", @click="clickSubmit")
        transition-group(
          v-on:before-enter="beforeEnter",
          v-on:enter="enter",
          v-bind:css="false"
        ) 
          input#phone(
            type="tel",
            v-model="phoneNumber",
            v-if="this.$store.state.toForm",
            :key="phone",
            placeholder="Telefon Numarası",
            :disabled="this.$store.state.disabled == 1",
            :maxlength="phoneLength"
          )
          .error(v-if="this.$store.state.numberInvalid") 
            | Telefon numarası hatalı.
          input.outAuth(
            type="submit",
            v-if="this.$store.state.toForm",
            value="Google",
            :key="google",
            v-show="!this.$store.state.phoneIsValid && !this.$store.state.smsValid"
          )
          input.outAuth(
            type="submit",
            v-if="this.$store.state.toForm",
            value="Apple",
            :key="apple",
            v-show="!this.$store.state.phoneIsValid && !this.$store.state.smsValid"
          )
          input.pass(
            type="tel",
            maxlength=5,
            name="phone"
            v-model="enteredCode",
            v-if="this.$store.state.smsValid",
            ref="pass",
            :key="pass",
            placeholder="_____"
          )
          #code(
            :disabled="this.$store.state.disabled == 1",
            v-show="this.$store.state.phoneIsValid",
            :v-model="enteredCode"
            :key="'code'",
          )
            transition(
              v-on:before-enter="startProgress",
              v-on:enter="finishProgress",
              v-on:after-enter="afterFinishProgress",
              v-bind:css="false"
            ) 
              .codeLoad(:disabled="this.$store.state.disabled == 1", v-show="this.$store.state.phoneIsValid")
          input#cancel(
            type="submit",
            v-if="this.$store.state.toForm",
            v-show="this.$store.state.phoneIsValid",
            value="Vazgeç"
            :key="cancel",
          ) 
          input#accept(
            type="submit",
            v-if="this.$store.state.toForm",
            v-show="this.$store.state.smsValid",
            :key="accept",
            value="Onayla"
          ) 
</template>

<script>
export default {
  data() {
    return {
      form: "loginForm",
      login: "login",
      phoneNumber: "",
      phoneLength: 11,
      enteredCode: "",
      apple: "aplle",
      google: "google",
      cancel: "cancel",
      phone: "phone",
      pass: "pass",
      accept: "accept",
      iz: "iz",
    };
  },
  methods: {
    clickSubmit: function () {
      if (this.$store.getters.isAuthenticated) {
        this.$store.commit("clearAuthkey", this.$store.commit("changeButton", "Giriş Yap"))
        this.$router.push('/');
      } else {
        this.$store.state.toForm = !this.$store.state.toForm;
        this.smsValid = false;
        this.phoneNumber = "";
      }
    },
    beforeEnter: function (el) {
      el.style.opacity = 0;
    },
    enter: function (el, done) {
     el.style.opacity =1;
     done();
    },
    startProgress: function (el) {
      el.style.width = "0%";
    },
    finishProgress: async function (el, done) {
      let _this = this;
      el.style.width = "100%"
      done()
    },
    afterFinishProgress: function (){
      console.log('aldattın mı beniiiiii bunu yaptın mı banaaaa');
      this.$store.dispatch("generatePasscode", { phone: this.phoneNumber});
    }
  },
  watch: {
    phoneNumber(value) {
      "";
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        this.$store.state.phoneIsValid = true;
        this.$store.state.numberInvalid = false;
        this.$store.state.disabled = 0;
      } else {
        this.$store.state.phoneIsValid = false;
        this.$store.state.smsValid = false;
      }
    },
    enteredCode(value) {
      const _this = this;
      this.enteredCode = value.replace(/\D/g, "");
      console.log(value.length);
      if (value.length == 5) {
        console.log('a');
        _this.$store.dispatch("enterCode", { phone: _this.phoneNumber, code: _this.enteredCode})
      }
    },
  },
  components: {},
};
</script>

<style lang="sass">
input
  -webkit-appearance: none

header
  top: 0
  left: 0
  height: 90px
  width: 100%
  background-color: black

.header
  margin: auto
  height: 90px
  max-width: 1350px
  -webkit-appearance: none

.logo
  height: 90px
  width: 90px
  margin: 0
  margin-left: 2%
  float: left
  border: 0px solid black
  & img
    margin: 0
    margin-top: 16px
.account
  height: 90px
  width: 150px
  float: right
  margin: 0
  margin-right: 2%
.buttonIcon
  margin-left: -165px
  transition: all .1s ease
  color: white
#login
  height: 36px
  width: 96px
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  float: right
  background-color: white
  border-radius: 1em
  border: 0px solid black
  &:focus
    outline: 0px
    cursor: pointer

#phone
  height: 40px
  width: 200px
  margin-top: 5%
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  background-color: white
  border: 2px solid black
  border-radius: 1em
  text-align: center
  &:focus
    outline: 0px
    cursor: pointer
    & input[type="text"]

.pass
  height: 34px
  width: 192px
  margin-top: 5%
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  background-color: white
  border: 2px solid black
  border-radius: 1em
  text-align: center
  &:focus
    outline: 0px
    cursor: pointer
    & input[type="tel"]

#cancel
  height: 40px
  width: 200px
  margin-top: 5%
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  background-color: #ff6262
  border: 2px solid black
  border-radius: 1em
  text-align: center
  color: white
  &:focus
    outline: 0px
    cursor: pointer
  &:active
    transform: scale(0.95)

#accept
  height: 40px
  width: 200px
  margin-top: 5%
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  background-color: black
  border: 2px solid black
  border-radius: 1em
  text-align: center
  color: white
  &:focus
    outline: 0px
    cursor: pointer
  &:active
    transform: scale(0.95)

#code
  height: 36px
  width: 196px
  margin-left: 36px
  margin-top: 5%
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  background-color: white
  border: 2px solid black
  border-radius: 1em
  text-align: center

.codeLoad
  height: 100%
  width: 0%
  background-color: #71ec71
  border-radius: 10px
  transition: all .6s
  position: relative
  z-index: 1
.outAuth
  height: 40px
  width: 200px
  margin-top: 5%
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  background-color: black
  color: white
  border: 2px solid black
  border-radius: 1em
  transition: all .1s ease
  padding: 1px 2px
  &:focus
    outline: 0px
    &:hover
      cursor: pointer
      transform: scale(0.95)
.login
  height: 36px
  width: 96px
  margin: 0
  margin-top: 23px
  float: right
  background-color: white
  border-radius: 1em
  border: 0px solid black
  transition: all .3s ease
.loginForm
  height: 220px
  width: 272px
  position: relative
  z-index: 100
.error
  margin-left: 36px
  width: 180px
  color: white
  font-size: 10pt
  font-weight: bold
  font-family: 'Open Sans', sans-serif
  background-color: red
  margin-top: 120px
  padding: 4px 8px
  border-radius: 12px
  position: absolute
  z-index: 1
</style>
