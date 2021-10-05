<template lang="pug">
.infoes 
    .infoLine
      label
          | {{ userName() }}
      input(type="text" placeholder="İsim" v-model="name" @change="change(name, 'name')")
    .infoLine
      label
          | {{userSurname()}}
      input(type="text" placeholder="Soyisim" v-model="surname" @change="change(surname, 'surname')")
    .infoLine
      label
          | {{userPhone()}}
      input(type="text" placeholder="Telefon numarası" v-model="phone" :maxlength="phoneLength")
    .infoLine(v-if="getGenerated()")
      label(style="color: red")
          | {{getChangeNumberMessage()}}
      input(type="text" placeholder="_ _ _ _ _" v-model="code")
    .infoLine
      label
          | {{userBirthDay()}}
      input(type="date" v-model="date" @change="change(date, 'birthDay')")
    .infoLine
      label 
        | {{userEmail()}}
      input(type="text" disabled="true" value="Yanlızca Apple veya Google Hesabı Bağlayarak Değiştirilebilir")
    .infoLine
      label(v-if="isGoogleConnected()")
        | Google Bağlı
      label(v-if="!isGoogleConnected()")
        | Google Bağlı Değil
      input(type="submit" value="Google Hesabınızı Bağlayın" @click="googleRemote()" v-if="!isGoogleConnected()")
      input(type="submit" value="Google Bağlantınızı Kaldırın" @click="googleDisconnect()" v-if="isGoogleConnected()")
      GoogleLogin(
          style="opacity: 0;"
          ref="googleA",
          type="submit",
          :params="params",
          :renderParams="renderParams",
          :onSuccess="onSuccess",
          :onFailure="onFailure"
      )
    .infoLine
      label
        | Apple Bağlı Değil
      input(type="submit" value="Apple Hesabınızı Bağlayın" @click="")


</template>

<script>
import Dropzone from "@/components/Dropzone.vue";
import GoogleLogin from "vue-google-login";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      file: "",
      name: "",
      surname: "",
      phone: "",
      grade: "",      
      phoneLength: 11,
      selectedFile: null,
      code: "",
      date: this.userBirthDayForInput(),
      params: {
        client_id:
          "1062958103241-4o0u00itp4jpccd36l9rjrq3iltopdi4.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  methods: {
    ...mapGetters("users", ["getGenerated","getChangeNumberMessage"]),
    ...mapActions("users", ["changeUserInfo", "changePhoneCheck"]),
    ...mapActions(["refreshUser"]),
    ...mapGetters([
      "userName",
      "userSurname",
      "userPhone",
      "userEmail",
      "userBirthDay",
      "userImage",
      "userBirthDayForInput",
      "userGoogleId",
      "isGoogleConnected"
    ]),
    googleRemote() {
      var el = this.$refs.googleA;
      el.handleClick();
    },
    onFailure(googleUser) {
      console.log(googleUser);
    },
    selectFile: function() {
      const file = this.$refs.file.files[0];
      if (file != undefined) {
        console.log(file);
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        const MAX_SIZE = 10000000;
        const tooLarge = MAX_SIZE < file.size;
        if (allowedTypes.includes(file.type) && !tooLarge) {
          this.file = file;
        } else {
          alert("Sadece Resim Dosyaları Kabul Edilmektedir");
          this.$refs.file.value = null;
        }
      }
    },
    sendFile: async function() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await this.$axios
          .post(`${process.env.OUR_HOST}/dropzone`, formData)
          .then(res => {
            let profilePic = process.env.OUR_URL + res.data.file;
            this.change(profilePic, "profilePic");
          });
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: function(googleUser) {
      var profile = googleUser.getBasicProfile();
      if (
        this.userName() == "" ||
        this.userName() == undefined ||
        this.userName() == null
      ) {
        this.change(profile.getGivenName(), "name");
      }
      if (
        this.userSurname() == "" ||
        this.userSurname() == undefined ||
        this.userSurname() == null
      ) {
        this.change(profile.getFamilyName(), "surname");
      }
      if (
        this.userEmail() == "" ||
        this.userEmail() == undefined ||
        this.userEmail() == null
      ) {
        this.change(profile.getEmail(), "email");
      }
      if (
        this.userImage() == "" ||
        this.userImage() == undefined ||
        this.userImage() == null
      ) {
        this.change(profile.getImageUrl(), "profilePic");
      }
      if (
        this.userGoogleId() == "" ||
        this.userGoogleId() == undefined ||
        this.userGoogleId() == null
      ) {
        this.change(profile.getId(), "googleId");
      }
      console.log(profile);
    },
    googleDisconnect() {
      this.change(null, "googleId");
    },
    change: async function(value, where) {
      if (value != "" && value != " ") {
        this.changeUserInfo({ id: this.$store.getters.userId, value, where });
      }
    }
  },
  watch: {
    phone(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        this.change(value, "phone");
      }
    },
    code(value) {
      this.enteredCode = value.replace(/\D/g, "");
      console.log(value.length);
      if (value.length == 5) {
        this.changePhoneCheck({
          id: this.$store.getters.userId,
          code: value,
          phone: this.phone
        });
      }
    }
  },
  components: {
    GoogleLogin,
    Dropzone
  }
};
</script>

<style lang="sass" scoped>
$gray: rgb(142, 142, 147, 0.70)
$gray2: rgb(174, 174, 178, 0.70)
$gray6: rgb(242, 242, 247, 0.70)
$gray6-dark: rgb(28, 28, 30)
.adminheader
    background-color: $gray
    height: 70px
    width: 100%
.adminDashboard
    height: 100vh
    width: 100vw
    background-color: $gray
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    transform-style: preserve-3d
.infoes
  overflow: auto
  @media screen and (max-width: 1200px)
    height: 40vh

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


.infoLine
  margin-top: 10px
  padding-top: 8px
  height: 40px
  border-bottom: 0.75px solid $gray
  @media screen and (max-width: 1200px)
    height: 60px
    
  & input
    float: right
    margin-right: 20%
    height: 28px
    margin-top: -8px
    border: none
    min-width: 50%
    -webkit-appearance: none
    padding-left: 16px
    padding-right: 16px
    border-radius: 1em
    @media screen and (max-width: 1200px)
      margin-top: 0px

    &:focus
      -webkit-appearance: none



    &[type="submit"]
      background-color: black
      color: white

      &:hover
        cursor: pointer
</style>
