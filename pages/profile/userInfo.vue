<template lang="pug">
div
    label
        | {{ userName() }}
    input(type="text" placeholder="İsim" v-model="name" @blur="change(name, 'name')")
    br
    label
        | {{userSurname()}}
    input(type="text" placeholder="Soyisim" v-model="surname" @blur="change(surname, 'surname')")
    br
    label
        | {{userPhone()}}
    input(type="text" placeholder="Telefon numarası" v-model="phone" @blur="change(phone, 'phone')")
    br
    label
        | {{userBirthDay()}}
    input(type="date" v-model="date" @change="change(date, 'birthDay')")
    br   
    p 
      | {{userEmail()}}
    GoogleLogin(
        class="outAuth"
        type="submit",
        :params="params",
        :renderParams="renderParams",
        :onSuccess="onSuccess",
        :onFailure="onFailure"
    )
    img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")

    form(@submit.prevent="sendFile" enctype="multipart/form-data")
        input(
            type="file" 
            @change="selectFile"
            ref="file"
        )
        button send
</template>

<script>
import Dropzone from "@/components/Dropzone.vue";
import axios from "axios";
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
      selectedFile: null,
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
    ...mapActions("users", ["changeUserInfo"]),
    ...mapActions(["refreshUser"]),
    ...mapGetters([
      "userName",
      "userSurname",
      "userPhone",
      "userEmail",
      "userBirthDay",
      "userImage",
      "userBirthDayForInput",
      "userGoogleId"
    ]),
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
        await axios
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
      if (this.userName() == "" || this.userName() == undefined || this.userName() == null) {
        this.change(profile.getGivenName(), "name");
      }
      if (this.userSurname() == "" || this.userSurname() == undefined || this.userSurname() == null) {
        this.change(profile.getFamilyName(), "surname");
      }
      if (this.userEmail() == "" || this.userEmail() == undefined || this.userEmail() == null) {
        this.change(profile.getEmail(), "email");
      }
      if (this.userImage() == "" || this.userImage() == undefined || this.userImage() == null) {
        this.change(profile.getImageUrl(), "profilePic");
      }
      if (this.userGoogleId() == "" || this.userGoogleId() == undefined || this.userGoogleId() == null) {
        this.change(profile.getId(), "googleId");
      }
      console.log(profile);
    },
    change: function(value, where) {
      this.changeUserInfo({ id: this.$store.getters.userId, value, where });
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
    background-image: url("https://source.unsplash.com/1600x900/?woman-sexy")
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
  &  > *
    opacity: 0
    margin-left: -30px
    margin-top: -10px
</style>
