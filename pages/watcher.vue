<template lang="pug">
.adminDashboard
    .navWrapper
        Navbar
    .container
        .sidebar
            .profileInfo
                .profilePhoto(@click="$refs.file.click()")
                    img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")
                h4
                    | {{ userName() }} {{ userSurname() }}
            .links
                NuxtLink(:to="'/watcher/records'", class="nuxt-link active" active) 
                    p Ders Girişleri

        .content
            nuxt-child
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: ["session-control", "watch"],
  components: {
    Navbar
  },
  data() {
    return {
      name: "",
      surname: "",
      file: "",
    };
  },
  methods: {
    ...mapActions("users", ["changeUserInfo"]),
    ...mapActions(["refreshUser"]),
    ...mapGetters([
      "userId",
      "userName",
      "userSurname",
      "userPhone",
      "userEmail",
      "userBirthDay",
      "userImage",
      "userBirthDayForInput",
      "userGoogleId"
    ]),
    sendFile: async function() {
      const file = this.$refs.file.files[0];
      this.file = file;
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("who", this.userId());
      try {
        await this.$axios
          .post(`${process.env.OUR_HOST}/dropzone`, formData)
          .then(res => {
            let profilePic = res.data.file;
            this.change(profilePic, "profilePic");
          });
      } catch (error) {
        console.log(error);
      }
    },
    change: function(value, where) {
      this.changeUserInfo({ id: this.userId(), value, where });
    }
  }
};
</script>

<style lang="sass" scoped>
$gray: rgb(142, 142, 147)
$gray2: rgb(174, 174, 178)
$gray6: rgb(242, 242, 247)
$gray4: rgb(209, 209, 214)
$gray6-dark: rgb(28, 28, 30)

a.nuxt-link
    color: $gray6-dark
    text-align: center
    font-size: 11pt
    margin: auto
    margin-bottom: 16px
    text-decoration: none
    display: block
    &:hover
        text-decoration: none
        font-weight: bold

a.nuxt-link-active
    color: $gray
    text-decoration: none
    font-weight: bold
    display: block
    &:hover
        text-decoration: none
        font-weight: bold

.navWrapper
    position: fixed
    width: 100%

.adminheader
    background-color: $gray
    height: 70px
    width: 100%

.adminDashboard
    height: 100vh
    width: 100vw
    background-color: black
    //background-image: url("http://192.168.1.54:8000/profileBackground.jpg")
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    transform-style: preserve-3d

.container
    border-radius: 1em
    overflow: hidden
    margin: auto
    height: 80vh
    width: 70vw
    background-color: $gray6
    position: relative
    top: 55%
    transform: perspective(1px) translateY(-50%)
    @media screen and (max-width: 1200px)
        width: 90vw

.sidebar
    float: left
    min-height: 800px
    height: 90%
    width: 20%
    padding: 12px
    @media screen and (max-width: 1200px)
        width: 100%
        float: none
        min-height: 140px
        height: 25vh
        border-bottom: 1px solid black


.profileInfo
    padding-top: 10px
    height: 280px
    text-align: center
    & h4, h5
        color: $gray6-dark
        margin: 2px
    @media screen and (max-width: 1200px)
        height: 7vh
        display: flex
        
.content
    height: 90vh
    width: 80%
    float: left
    padding: 30px
    padding-top: 50px
    @media screen and (max-width: 1200px)
        width: 100%
        padding: 5px

.profilePhoto
    height: 144px
    width: 144px
    border-radius: 50%
    margin: auto
    margin-bottom: 6px
    cursor: pointer
    @media screen and (max-width: 1200px)
        height: 32px
        width: 100px
        margin: 0
    & img
        height: 144px
        width: 144px
        border-radius: 50%
        @media screen and (max-width: 1200px)
            height: 32px
            width: 32px
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

.input-field
    width: 100%
    height: 200px
    position: absolute
    cursor: pointer
    display: none

.links
    height: 32vh
    overflow: auto
    @media screen and (max-width: 1200px)
        height: 16vh
::-webkit-scrollbar
    width: 1px
    border-radius: 1em

::-webkit-scrollbar-track
    background: #ffffff
    border-radius: 1em

::-webkit-scrollbar-thumb
    background: #000
    border-radius: 1em

::-webkit-scrollbar-thumb:hover
    background: #555
</style>
