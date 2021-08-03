<template lang="pug">
.formWrapper
  .enrollmentForm
    .infoLine
      label
          | Telefon Numarası
      input(type="text" placeholder="Telefon numarası" v-model="phone" :maxlength="phoneLength")
    .infoLine
      label
          | İsim
      input(type="text" placeholder="İsim" v-model="phone")
    .infoLine
      label
          | Soyisim
      input(type="text" placeholder="İsim" v-model="phone")
    .infoLine
      label
          | İsim
      input(type="text" placeholder="İsim" v-model="phone")
    .infoLine
      label
          | İsim
      input(type="text" placeholder="İsim" v-model="phone")
    .infoLine
      label
          | İsim
      input(type="text" placeholder="İsim" v-model="phone")
    .infoLine
      label
          | İsim
      input(type="text" placeholder="İsim" v-model="phone")
    .infoLine
      label
          | İsim
      input(type="text" placeholder="İsim" v-model="phone")
</template>

<script>
export default {
  data() {
    return {
      id: null,
      name: "",
      phoneLength: 11,
      surname: "",
      phone: "",
      roleId: null,
    };
  },
  mounted() {

  },
  methods: {

  },
  watch: {
    phone(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        alert(this.phoneNumber);
      }
    }
  },
};
</script>

<style lang="sass" scoped>
  .formWrapper
    text-align: center

  .infoLine
    margin-top: 10px
    padding-top: 8px
    height: 40px
    border-bottom: 0.75px solid gray

  input
    float: right
    margin-right: 20%
    height: 28px
    margin-top: -8px
    border: none
    min-width: 50%
    -webkit-appearance: none
    padding-left: 16px
    padding-right: 16px
    border-radius: 1em

    &:focus
      -webkit-appearance: none



    &[type="submit"]
      background-color: black
      color: white

      &:hover
        cursor: pointer
</style>
