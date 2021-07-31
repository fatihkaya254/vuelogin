<template lang="pug">
.adminDashboard
    .container
        .adminheader
        .sidebar
            NuxtLink(:to="'/admin/users'", class="nuxt-link") 
                p Kullanıcılar
            NuxtLink(:to="'/admin/roles'", class="nuxt-link") 
                p Roller
            NuxtLink(:to="'/admin/students'", class="nuxt-link") 
                p Öğrenciler
            NuxtLink(:to="'/admin/parentship'", class="nuxt-link") 
                p Ebeveynlik
            NuxtLink(:to="'/admin/teachers'", class="nuxt-link") 
                p Öğretmenler
            NuxtLink(:to="'/admin/grades'", class="nuxt-link") 
                p Sınıflar
            NuxtLink(:to="'/admin/subject-process'", class="nuxt-link") 
                p Konu Bazlı Süreç
            NuxtLink(:to="'/admin/branch-process'", class="nuxt-link") 
                p Branş Bazlı Süreç   
            NuxtLink(:to="'/admin/branches'", class="nuxt-link") 
                p Branşlar
            NuxtLink(:to="'/admin/subjects'", class="nuxt-link") 
                p Konular
            NuxtLink(:to="'/admin/sub-topics'", class="nuxt-link") 
                p Alt Konular
            NuxtLink(:to="'/admin/exams'", class="nuxt-link") 
                p Sınavlar
            NuxtLink(:to="'/admin/tests'", class="nuxt-link") 
                p Testler
            NuxtLink(:to="'/admin/questions'", class="nuxt-link") 
                p Sorular
            NuxtLink(:to="'/admin/packages'", class="nuxt-link") 
                p Paketler
            NuxtLink(:to="'/admin/purchases'", class="nuxt-link") 
                p Satın Alımlar
            NuxtLink(:to="'/admin/payments'", class="nuxt-link") 
                p Ödemeler
            NuxtLink(:to="'/admin/schools-courses'", class="nuxt-link") 
                p Okul ve Kurslar
            NuxtLink(:to="'/admin/groups'", class="nuxt-link") 
                p Gruplar
            NuxtLink(:to="'/admin/sms'", class="nuxt-link") 
                p Smsler   
        .content
            nuxt-child
</template>

<script>
export default {
  middleware: ["session-control", "masterAuth"],
  components: {}
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
.nuxt-link
  color: $gray6-dark
  text-decoration: none
  font-size: 13pt
  font-weight: 500
  line-height: 30px
  &:hover
    text-decoration: underline
.adminDashboard
    height: 100vh
    width: 100vw
    background-color: $gray
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
</style>
