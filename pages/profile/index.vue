<template lang="pug">
div
    .form
        h3 Kullanıcı Bilgileri
        label
            | {{ userName() }}
        input(type="text" placeholder="İsim" v-model="name" @blur="change(name, 'name')")
        label
            | {{userSurname()}}
        input(type="text" placeholder="Soyisim" v-model="surname" @blur="change(surname, 'surname')")
            
        img(:src="this.$store.getters.userPic" v-show="this.$store.getters.userPic")

        
    
    

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      surname: "",
    };
  },
  methods: {
      ...mapActions("users", ["changeUserInfo"]),
      ...mapActions(["refreshUser"]),
       ...mapGetters(["userName","userSurname"]),

      change: function(value, where) {
        this.changeUserInfo({ id: this.$store.getters.userId, value, where  })
        this.refreshUser()
      }
  }
  
};
</script>

<style lang="sass" scoped>
.form
    margin: auto
    padding: 50px
    width: 1350px
    text-align: center
</style>
