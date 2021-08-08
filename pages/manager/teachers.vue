<template lang="pug">
.formWrapper
  .enrollmentForm
    .infoLine(v-for="teacher in teacher()")
        label
            | {{teacher.name}}
</template>

<script>
import axios from "axios";

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedBranch: "none",
      selectedGrade: "none",
      name: "",
      id: "",
      branches: [],
      phoneLength: 11,
      surname: "",
      phone: "",
      date: "",
      photo: "",
      adress: "",
      email: "",
      ourhost: process.env.OUR_URL,
      selectedGrade: ""
    };
  },
  mounted() {
    this.getGrades();
    this.getBranches();
    this.getTeachers();
  },
  methods: {
    ...mapActions("users", ["addUser"]),
    ...mapGetters("students", ["grade", "schoolCourse"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("branches", ["branch"]),
    ...mapGetters("users", ["teacher"]),
    ...mapActions("users", ["getTeachers"]),
    getUser: async function() {
      try {
        await axios
          .post(`${process.env.OUR_HOST}/getOneUser`, {
            phone: this.phoneNumber
          })
          .then(res => {
            this.id = res.data.user._id;
            this.name = res.data.user.name;
            this.surname = res.data.user.surname;
            this.photo = res.data.user.profilePic;
            if (res.data.user.branch != undefined)
              this.branches = res.data.user.branch;
          });
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async function() {
      try {
        await axios
          .put(`${process.env.OUR_HOST}/updateProfile`, {
            id: this.id,
            where: "branch",
            value: this.branches
          })
          .then(res => {
            console.log(res.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
    deleteBranch: function(id) {
      const index = this.branches.indexOf(id);
      console.log(index);
      if (index > -1) {
        this.branches.splice(index, 1);
        this.updateUser();
      }
    },
    addBranch: async function() {
      const branch = this.selectedBranch
      this.branches.push(branch)
      await this.updateUser();
      this.getUser()
    },
    onChangeGrade(event) {
      this.selectedGrade = event.target.value;
      this.selectedBranch = "none";
    },
    onChangeBranch(event) {
      this.selectedBranch = this.branch()[event.target.value];
      console.log(this.selectedBranch);
    },
  },
  watch: {
    phone(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        this.getUser();
      }
    }
  }
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
  & img
    float: left
    margin-bottom: 5px
    height: 32px
    width: 32px
    border-radius: 50%
  p
    float: left
    margin-left: 15px
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

.wholeBranches
    height: 400px
    overflow: auto
</style>
