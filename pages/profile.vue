<template lang="pug">
div    
    .navWrapper
        Navbar
    .adminDashboard
        .container
            .sidebar
                .profileInfo
                    .profilePhoto(@click="$refs.file.click()")
                        img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")
                        img(src="../assets/basic-profile.png" v-show="!this.$store.getters.userPic")
                        input(
                            type="file"
                            class="input-field"
                            ref="file"
                            @change="sendFile"
                        )
                        .changeText
                            p
                                | Değiştir
                    h4
                        | {{ userName() }} {{userSurname()}}

                NuxtLink(:to="'/profile/lessons'", class="nuxt-link", v-if="isTeacher()") 
                    p( v-if="isTeacher()") Günlük Program
                NuxtLink(:to="'/profile/userInfo'", class="nuxt-link") 
                    p Kullanıcı Bilgileri
                NuxtLink(:to="'/profile/myPackages'", class="nuxt-link") 
                    p Paketler
                NuxtLink(:to="'/profile/lessonSchedule'", class="nuxt-link") 
                    p Dersler
                NuxtLink(:to="'/profile/lessonRecords'", class="nuxt-link") 
                    p Ders Kayıtları
            .content
                nuxt-child
    .bottom(v-if="this.$store.getters.isAuthenticated")
        Bottombar
    Bottombar(v-if="this.$store.getters.isAuthenticated")    
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Bottombar from "@/components/Bottombar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: ["session-control", "auth"],
  components: {
    Navbar,
    Bottombar
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
      "userGoogleId",
      "isTeacher"
    ]),
    sendFile: async function() {
      const file = this.$refs.file.files[0];
      this.file = file;
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("who", this.userId())
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
    top: 0
    z-index: 1
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
    
.container
    border-radius: 1em
    overflow: hidden
    margin: auto
    height: 80vh
    width: 70vw
    background-color: $gray6
    position: relative
    top: 15vh
    @media screen and (max-width: 1200px)
        width: 100vw
        top: 10vh
        padding: 5px
        height: 70vh
        border-radius: 0em
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
        overflow: auto
        border-bottom: 1px solid black

.profileInfo
    padding-top: 10px
    height: 280px
    text-align: center
    & h4, h5
        color: $gray6-dark
        margin: 2px
    @media screen and (max-width: 1200px)
        height: 120px
.content
    height: 90vh
    width: 80%
    float: left
    padding: 30px
    padding-top: 50px
    @media screen and (max-width: 1200px)
        width: 100%
        padding: 0
        height: 90vh
        
.profilePhoto
    height: 144px
    width: 144px
    border-radius: 50%
    margin: auto
    margin-bottom: 6px
    cursor: pointer
    @media screen and (max-width: 1200px)
        height: 60px
        width: 60px
    & img
        height: 144px
        width: 144px
        border-radius: 50%
        @media screen and (max-width: 1200px)
            height: 60px
            width: 60px
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
.bottom
  position: fixed
  z-index: 5
  width: 100vw
  bottom: 0
  @media screen and (min-width: 1200px)
    display: none
</style>
