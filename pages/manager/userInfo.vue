<template lang="pug">
div 
    .profileInfo
      .profilePhoto(@click="$refs.file.click()")
          img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")
          input(
              type="file"
              class="input-field"
              ref="file"
              @change="sendFile"
          )
          .changeText
              p
                  | Değiştir
    .infoLine
      label
          | {{ name }}
      input(type="text" placeholder="İsim" v-model="name" @change="change(name, 'name')")
    .infoLine
      label
          | {{ surname }}
      input(type="text" placeholder="Soyisim" v-model="surname" @change="change(surname, 'surname')")
    .infoLine
      label
          | {{ phone }}
      input(type="text" placeholder="Telefon numarası" v-model="phone" :maxlength="phoneLength")
    .infoLine
      label
          | {{ birthDay }}
      input(type="date" v-model="date" @change="change(date, 'birthDay')")
    .infoLine
      label 
        | {{ email }}
      input(type="text" disabled="true" value="Yanlızca Apple veya Google Hesabı Bağlayarak Değiştirilebilir")



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
      birthDay: "",
      email: "",
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
    ...mapGetters("users", ["getGenerated", "getChangeNumberMessage"]),
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
    },
    getUser: async function() {
      try {
        await this.$axios
          .post(`${process.env.OUR_HOST}/getOneUser`, {
            phone: this.phoneNumber
          })
          .then(res => {
            this.id = res.data.user._id;
            if (res.data.user.name != undefined) this.name = res.data.user.name;
            if (res.data.user.surname != undefined)
              this.surname = res.data.user.surname;
            if (res.data.user.profilePic != undefined)
              this.photo = res.data.user.profilePic;
            if (res.data.user.mainBranch != undefined)
              this.mainBranchLabel = res.data.user.mainBranch;
            if (res.data.user.branch != undefined)
              this.branches = res.data.user.branch;
          });
      } catch (error) {
        console.log(error);
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
        this.getUser();
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

    &:focus
      -webkit-appearance: none



    &[type="submit"]
      background-color: black
      color: white

      &:hover
        cursor: pointer


.profileInfo
    padding-top: 10px
    height: 280px
    text-align: center
    & h4, h5
        color: $gray6-dark
        margin: 2px
.content
    height: 90vh
    width: 80%
    float: left
    padding: 30px
    padding-top: 50px

.profilePhoto
    height: 144px
    width: 144px
    border-radius: 50%
    margin: auto
    margin-bottom: 6px
    cursor: pointer
    & img
        height: 144px
        width: 144px
        border-radius: 50%

    .changeText
        margin-top: 22px
        height: 144px
        width: 144px
        padding-top: 62px
        border-radius: 50%
        background-color: rgb(0, 0, 0, 0.3)
        color: white
        font-weight: bold
        position: absolute
        z-index: 2
        top: 0
        visibility: hidden

    &:hover .changeText
        visibility: visible
</style>
