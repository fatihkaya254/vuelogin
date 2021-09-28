<template lang="pug">
header
  .header
    .logo
      a(href="/") 
        img(src="../assets/logo.png", :title="iz", alt="İzders")
    .account 
      #user
        .nuxt-link-cover
          NuxtLink(:to="'/profile/'", class="nuxt-link") 
            img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")
            img(src="../assets/basic-profile.png" v-show="!this.$store.getters.userPic && this.$store.getters.isAuthenticated")
            p {{ this.$store.getters.userMerhaba }}
      div(:class="[login, this.$store.state.toForm ? form : '']")
        input#login(type="submit", value="Çıkış Yap", v-show="this.$store.getters.isAuthenticated", @click="clickSubmit")
        input#login(type="submit", value="Giriş Yap", v-show="!this.$store.getters.isAuthenticated", @click="clickSubmit")
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
            :disabled="this.$store.state.disabled",
            :maxlength="phoneLength"
          )
          .error(v-if="this.$store.state.numberInvalid") 
            | Telefon numarası hatalı.
          div(
            class="outAuth"
            type="submit",
            v-if="this.$store.state.toForm",
            value="Google",
            key="apple2",
            v-show="!this.$store.state.phoneIsValid && !this.$store.state.smsValid"
          )
            GoogleLogin(
              style="opacity: 0;",
              ref="googleAuth"
              type="submit",
              v-if="this.$store.state.toForm",
              :key="google",
              v-show="!this.$store.state.phoneIsValid && !this.$store.state.smsValid",
              :params="params",
              :renderParams="renderParams",
              :onSuccess="onSuccess",
              :onFailure="onFailure"
            )
          .googleText(
            v-show="!this.$store.state.phoneIsValid && !this.$store.state.smsValid",
            v-if="this.$store.state.toForm",
            :key="'googleText'"
            ) 
            | Google
          input(
            class="outAuth"
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
            v-show="this.$store.state.smsValid",
            ref="pass"
            :key="pass",
            placeholder="_____"
          )
          #code(
            :disabled="this.$store.state.disabled",
            v-show="this.$store.state.phoneIsValid",
            :v-model="enteredCode",
             ref="code",
            :key="'code'"
          )
            transition(
              v-on:before-enter="startProgress",
              v-on:enter="finishProgress",
              v-on:after-enter="afterFinishProgress",
              v-on:before-leave="stopProgress",
              v-bind:css="false"
            ) 
              .codeLoad(:disabled="this.$store.state.disabled", v-show="this.$store.state.phoneIsValid")
          input#cancel(
            type="submit",
            v-if="this.$store.state.toForm",
            v-show="this.$store.state.phoneIsValid",
            @click="cancelToGenerateCode",
            value="Vazgeç",
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
import GoogleLogin from "vue-google-login";


import { gsap } from "gsap";
export default {
  data() {
    return {
      ourhost:  process.env.OUR_URL,
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
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id:
          "711011716160-5p2kb7qb71duf9oljo11ohsbkva425dq.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  head: {
    title: "izders.com",
    meta: [
      { charset: "utf-8" },
      { name: "google-signin-scope", content: "profile email" },
      { name:"viewport", content:"width=device-width, initial-scale=1, maximum-scale=1" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  methods: {



    clickSubmit: function() {
      if (this.$store.getters.isAuthenticated) {
        this.$store.commit("clearAuthkey");
        this.$router.push("/");
      } else {
        this.$store.commit("changeToForm", !this.$store.state.toForm);
        this.smsValid = false;
        this.userPhone = this.$store.getters.userPhone;
        this.phoneNumber = "";
      }
    },
    onSuccess2(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
    onFailure(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
    onSuccess: function(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      this.$store.dispatch("authGoogle", {
        googleId: profile.getId(),
        name: profile.getGivenName(),
        surname: profile.getFamilyName(),
        email: profile.getEmail(),
        profilePic: profile.getImageUrl()
      });
    },
    cancelToGenerateCode: function() {
      this.$store.commit("changePhoneIsValid", !this.$store.phoneIsValid);
      this.phoneNumber = "";
    },
    beforeEnter: function(el) {
      gsap.set(el, {
        opacity: 0
      });
    },
    enter: function(el, done) {
      gsap.to(el, {
        duration: 0.4,
        opacity: 1,
        ease: "elastic.inOut(2.5, 1)",
        onComplete: done
      });
    },
    startProgress: function(el) {
      gsap.set(el, {
        width: "0%"
      });
    },
    finishProgress: async function(el, done) {
      gsap.to(el, {
        duration: 2,
        width: "100%",
        ease: "Power4.easeOut",
        onComplete: done
      });
    },
    stopProgress: async function(el, done) {
      gsap.set(el, {
        width: "0%"
      });
    },
    afterFinishProgress: function() {


      this.$store.dispatch("generatePasscode", { phone: this.phoneNumber }).then(()=>{
        this.$refs.pass.focus()
      })

    }
  },
  watch: {
    phoneNumber(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        this.$store.commit("changePhoneIsValid", true);
        this.$store.commit("changeNumberInvalid", false);
        this.$store.commit("changeDisabled", false);
      } else {
        this.$store.commit("changePhoneIsValid", false);
        this.$store.commit("changeSmsValid", false);
      }
    },
    enteredCode(value) {
      const _this = this;
      this.enteredCode = value.replace(/\D/g, "");
      console.log(value.length);
      if (value.length == 5) {
        console.log("a");
        _this.$store.dispatch("enterCode", {
          phone: _this.phoneNumber,
          code: _this.enteredCode
        });
      }
    }
  },
  computed: {},
  components: {
    GoogleLogin,

  },
  mounted() {}
};
</script>

<style lang="sass" scoped>
$ortadaKuyuVar: 36px
input
  -webkit-appearance: none
img
  width: 100%
header
  top: 0
  left: 0
  height: 90px
  width: 100%
  background-color: black
  @media screen and (max-width: 1200px)
    height: 70px

.header
  margin: auto
  height: 90px
  max-width: 1350px
  -webkit-appearance: none
  @media screen and (max-width: 1200px)
    height: 60px

.logo
  height: 70px
  width: 70px
  margin: 0
  margin-left: 2%
  float: left
  border: 0px solid black
  @media screen and (max-width: 1200px)
    height: 60px
    width: 60px
  & img
    margin: 0
    margin-top: 16px
    @media screen and (max-width: 1200px)
      margin-top: 12px
      margin-left: 12px

.account
  height: 90px
  width: 50%
  float: right
  margin: 0
  margin-right: 2%
  display: block
  @media screen and (max-width: 1200px)
    height: 60px
    width: 50%
    margin-right: 12px
    margin-top: -6px
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
  position: relative
  z-index: 2
  &:focus
    outline: 0px
    cursor: pointer
#user
  margin-top: 35px
  margin-left: -200px
  font-family: 'Open Sans', sans-serif
  font-size: 9pt
  color: white
  float: left
  height: 40px
  width: 200px
  float: right
  position: relative
  z-index: 1
  @media screen and (max-width: 1200px)
    font-size: 0pt

  &input[type=text]
    background-color: rgba(0, 0, 0, 0)
    height: 40px

  & img
    height: 32px
    width: 32px
    border-radius: 50%
    position: absolute
    z-index: 1
    margin-left: -48px
    margin-top: -6px
    background-color: white
    @media screen and (max-width: 1200px)
      margin-left: 20px
      height: 52px
      width: 52px
      margin-top: -16px
#phone
  height: 40px
  width: 200px
  margin-top: 5%
  margin-left: $ortadaKuyuVar
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

.pass
  height: 34px
  width: 192px
  margin-top: 5%
  margin-left: $ortadaKuyuVar
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

#cancel
  height: 40px
  width: 200px
  margin-top: 5%
  margin-left: $ortadaKuyuVar
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
  margin-left: $ortadaKuyuVar
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
  margin-top: 5%
  margin-left: $ortadaKuyuVar
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
  margin-left: $ortadaKuyuVar
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
  &  > *
    opacity: 0
    margin-left: -30px
    margin-top: -10px

.googleText
  font-family: 'Open Sans', sans-serif
  letter-spacing: 1px
  font-size: 9pt
  color: white
  font-weight: 700
  position: absolute
  margin-top: -28px
  margin-left: $ortadaKuyuVar + 75
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

  & button
    height: 40px
    width: 200px
    margin-top: 5%
    margin-left: $ortadaKuyuVar
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
  @media screen and (max-width: 1200px)
    border: 1px solid black

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


.nuxt-link
  color: white
  text-decoration: none
  &:hover
    text-decoration: underline

</style>
