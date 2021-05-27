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



    

    img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")

</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  
  data() {
    return {
      name: "",
      surname: "",
      phone:"",
      grade:""
    };
  },
  methods: {
      ...mapActions("users", ["changeUserInfo"]),
      ...mapActions(["refreshUser"]),
       ...mapGetters(["userName","userSurname","userPhone",]),

      change: function(value, where) {
        this.changeUserInfo({ id: this.$store.getters.userId, value, where  })
        this.refreshUser()
      }
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
  


</style>
