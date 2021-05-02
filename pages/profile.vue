<template lang="pug">
div
    Navbar
    nuxt-child
</template>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  middleware : ["session-control", "auth"],
  components:{
    
    Navbar
  },
}
</script>
