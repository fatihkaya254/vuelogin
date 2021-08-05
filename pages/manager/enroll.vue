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
      input(type="text" placeholder="İsim" v-model="name")
    .infoLine
      label
          | Soyisim
      input(type="text" placeholder="Soyisim" v-model="surname")
    .infoLine
      label
          | Doğum Tarihi
      input(type="date" v-model="date")
    .infoLine
      label
          | Adres
      input(type="text" placeholder="Adres" v-model="adress")
    .infoLine
      label
          | E-Posta
      input(type="text" placeholder="E-Posta" v-model="email")
    .infoLine
      label
          | Okul
      select(v-model="school")
            option(v-for="sc in schoolCourse()" :value="sc._id") {{sc.schoolCourseName}}
    .infoLine
      label
          | Sınıf
      select(v-model="selectedGrade" )
            option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
    .infoLine
      input(type="submit" value="Kaydet" @click="enroll()")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      phoneLength: 11,
      surname: "",
      phone: "",
      date: "",
      adress: "",
      email: "",
      school: "",
      selectedGrade: "",
    };
  },
  mounted() {
    this.getGrades();
    this.getSchoolCourses();
  },
  methods: {
    ...mapActions("students", ["getGrades", "getSchoolCourses"]),
    ...mapActions("users", ["addUser"]),
    ...mapGetters("students", ["grade", "schoolCourse"]),
    enroll: function () {
      let newUser = {}
      if (this.name != "") newUser.name = this.name
      if (this.surname != "") newUser.surname = this.surname
      if (this.phone != "") newUser.phone = this.phone
      if (this.date != "") newUser.birthDay = this.date
      if (this.adress != "") newUser.adress = this.adress
      if (this.email != "") newUser.email = this.email
      if (this.selectedGrade != "") newUser.grade = this.selectedGrade
      if (this.school != "") newUser.school = this.school
      
      this.addUser(newUser)
    }
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
    },
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

  select
    float: right
    margin-right: 20%
    height: 28px
    margin-top: -8px
    border: none
    width: 50%
    padding-left: 16px
    padding-right: 16px
    border-radius: 1em

  option
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
