<template lang="pug">
div
    .form
        h3 Kullanıcı Bilgileri
        label
            | {{ this.$store.getters.userName }}
        input(type="text" placeholder="İsim" v-model="name" @blur="change(name, 'name')")
        label
            | {{ this.$store.getters.userSurname }}
        input(type="text" placeholder="Soyisim" v-model="surname" @blur="change(surname, 'surname')")

</template>

<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
    };
  },
  methods: {
      change: function(value, where) {
        this.$store.dispatch("changeUserInfo", { id: this.$store.getters.userId, value, where  });
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
