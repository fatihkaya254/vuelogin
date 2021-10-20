<template lang="pug">
.main
  .formWrapper
    .enrollmentForm
      .infoLine(v-for="teacher in teacher()")
          label(@click="id = teacher._id ")
              | {{teacher.name}} {{teacher.surname}} | {{teacher.mainBranch}} 
  .changeHours(v-show="id != ''")
    .close(@click="id = ''")
    .topBar
      p {{ name }} {{ surname }} | {{mainBranch}}
    .column(v-for="(n, day) in 7") {{days[day]}}
      .row(v-for="(n, hour) in 24"  :style="{backgroundColor: colors[teachersLessons()[day+'-'+hour]]}" @click="updateHour(day, hour)")  {{hours[hour]}}
</template>

<script>

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      colors: ["white","#ffbd44","#00ca4e"],
      selectedBranch: "none",
      selectedGrade: "none",
      name: "",
      id: "",
      teacherHours: "",
      branches: [],
      days: ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],
      hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", ],
      phoneLength: 11,
      surname: "",
      phone: "",
      date: "",
      photo: "",
      adress: "",
      email: "",
      mainBranch:"",
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
    ...mapGetters("users", ["teacher", "teachersLessons"]),
    ...mapActions("users", ["getTeachers", "addTeacherLessons", "getTeachersLessons"]),
    getUser: async function() {
      try {
        await this.$axios
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
    updateHour: async function(day, hour){
      const lesson = {day, hour, teacher: this.id}
      let status = 1
      if (this.teachersLessons()[day+'-'+hour] != undefined && this.teachersLessons()[day+'-'+hour] != 2) {
         status = this.teachersLessons()[day+'-'+hour] + 1
      }
      if (this.teachersLessons()[day+'-'+hour] == 2) {
        status = 0
      }
      await this.addTeacherLessons({lesson, status})
    },
    updateUser: async function() {
      try {
        await this.$axios
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
    }
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
    },
    id(value){
      if (value != "") {  
        let ta = this.teacher()[value]
        this.name = ta.name
        this.surname = ta.surname
        this.mainBranch = ta.mainBranch
        this.getTeachersLessons(value)
      }
      
    }
  }
};
</script>

<style lang="sass" scoped>
.formWrapper
  text-align: center

.enrollmentForm
  height: 66vh
  overflow: auto
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

.changeHours
    top:0
    right: 0
    height: 100%
    width: 100%
    position: fixed
    z-index: 3
    background-color: white
    
.close
    margin: 15px
    position: absolute
    z-index: 4
    height: 13px
    width: 13px
    border-radius: 50%
    background-color: #ff605c
    &:hover
      height: 15px
      width: 15px
      
.topBar
    width: 100%
    height: 60px
    text-align: center
    padding: 20px
    
.column
    height: 80%
    width: 12%
    margin: 1%
    text-align: center
    float: left
    position: relative
    overflow: auto
    padding-bottom: 16px
    padding-top: 16px
.row
    height: 20px
    width: 80%
    border-radius: 1em
    border: 1px solid black
    margin: auto
    margin-top: 16px
    font-size: 14px
::-webkit-scrollbar
    height: 10px
    width: 2px
    border-radius: 1em
::-webkit-scrollbar-track
    background: #ffffff
    border-radius: 1em

::-webkit-scrollbar-thumb
    background: #555
    border-radius: 1em

::-webkit-scrollbar-thumb:hover
    background: #555
</style>
