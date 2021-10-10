<template lang="pug">
.adminDashboard
    .accountancyContainer
        .adminheader
            .profilePhoto
                img(:src=" ourhost + this.$store.getters.userPic" v-show="this.$store.getters.userPic")
            .profileName
                p {{userName()}} {{userSurname()}}
        .sidebar
            NuxtLink(:to="'/accountancy/purchases'", class="nuxt-link") 
                p Satın Alımlar
            NuxtLink(:to="'/accountancy/purchase'", class="nuxt-link") 
                p Satın Alım Ekle
            NuxtLink(:to="'/accountancy/installments'", class="nuxt-link") 
                p Taksitler
            NuxtLink(:to="'/accountancy/exports'", class="nuxt-link") 
                p Çıktı
        .content
            nuxt-child
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: ["session-control", "accountantAuth"],
  data() {
    return {
      ourhost: process.env.OUR_URL
    };
  },
  methods: {
    ...mapActions("users", ["changeUserInfo"]),
    ...mapGetters([
      "userId",
      "userName",
      "userSurname",
      "userImage",
    ])
  },
  mounted() {}
};
</script>

<style lang="sass" scoped>
$gray: rgb(142, 142, 147)
$gray2: rgb(174, 174, 178)
$gray6: rgb(242, 242, 247)
$gray6-dark: rgb(28, 28, 30)
.adminheader
    background-color: $gray6
    height: 70px
    width: 100%
    display: flex
    flex-direction: row
    align-items: center
    justify-content: flex-start
    padding-left: 50px
    gap: 20px
.sidebar
    background-color: $gray6
    float: left
    min-height: 800px
    height: 90vh
    width: 20%
    padding: 20px
.content
    background-color: $gray6
    height: 90vh
    width: 80%
    float: left
    padding: 30px
    padding-top: 50px
    overflow: hidden

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

.adminDashboard
    height: 100vh
    width: 100vw
    background-color: #EF5350
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    transform-style: preserve-3d
.accountancyContainer
    border-radius: 2em
    overflow: hidden
    margin: auto
    height: 90vh
    width: 80vw
    position: relative
    top: 50%
    transform: perspective(1px) translateY(-50%)
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
.profilePhoto
    height: 48px
    width: 48px
    border-radius: 50%
    cursor: pointer
    & img
        height: 48px
        width: 48px
        border-radius: 50%
.profileName
    font-size: 16pt
</style>
