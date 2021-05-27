<template lang="pug">
.adminDashboard
    Navbar
    .container
        .adminheader
        .sidebar
            NuxtLink(:to="'/profile/userInfo'", class="nuxt-link") 
                p Kullanıcı Bilgileri
            NuxtLink(:to="'/profile/lessonSchedule'", class="nuxt-link") 
                p Ders Programı
            NuxtLink(:to="'/profile/skillGraph'", class="nuxt-link") 
                p Yetenek Grafikleri
            NuxtLink(:to="'/profile/pastLesson'", class="nuxt-link") 
                p Ders Geçmişi

        .content
            nuxt-child
            
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  middleware : ["session-control", "auth"],
  components:{
    
    Navbar
  },
  data() {
    return {
      name: "",
      surname: "",
    };
  },
  methods: {
    
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
  
.container
    border-radius: 2em
    overflow: hidden
    margin: auto
    height: 90vh
    width: 80vw
    position: relative
    top: 50%
    transform: perspective(1px) translateY(-50%)

.sidebar
    background-color: $gray2
    float: left
    min-height: 800px
    height: 90%
    width: 20%
    padding: 20px

.content
    background-color: $gray6
    height: 90%
    min-height: 800px
    width: 80%
    float: left
    padding: 20px
</style>
