<template lang="pug">
.bar
    NuxtLink(:to="'/profile/'", class="nuxt-link") 
        fa-icon(:icon="['fas', 'bell']")
    NuxtLink(:to="'/history/'", class="nuxt-link") 
        fa-icon(:icon="['fas', 'history']")
    NuxtLink(:to="'/schedule/'", class="nuxt-link") 
        fa-icon(:icon="['fas', 'calendar']")
    NuxtLink(:to="'/myrecords/'", class="nuxt-link") 
        fa-icon(:icon="['fas', 'bookmark']")
    NuxtLink(:to="'/profile/userInfo'", class="nuxt-link")     
        img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")
        img(src="../assets/basic-profile.png" v-show="!this.$store.getters.userPic && this.$store.getters.isAuthenticated")

</template>

<script>
export default {
  imports: [
    {
      set: "@fortawesome/free-solid-svg-icons"
    }
  ],
  data() {
    return {
    };
  },
  methods: {}
};
</script>

<style lang="sass" scoped>
.bar
    display: flex
    justify-content: space-around
    height: 48px
    background-color: #fefefe
    align-items: stretch
    @media screen and (min-width: 1200px)
      display: none



a.nuxt-link
    font-size: 22px
    display: flex
    align-items: center
    text-decoration: none
    color: black
    &:hover
        text-decoration: none
        font-weight: bold
    & img
        height: 26px
        width: 26px
        border-radius: 50%

a.nuxt-link-active
    color: #D93644
    text-decoration: none
    &:hover
        text-decoration: none
    & img
        outline: 2px solid #D93644
</style>
