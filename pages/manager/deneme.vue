<template lang="pug">
.main
  .formWrapper
    .enrollmentForm
      .infoLine(v-for="teacher in teacher()")
          label(@click="getSchedule(teacher._id)")
              | {{teacher.name}} {{teacher.surname}} | {{teacher.mainBranch}} 
      .infoLine
      .infoLine
      .infoLine
      .infoLine
  .pop(v-show="id != ''")
    .body 
      .close(@click="id = ''")
        fa-icon(:icon="['fas', 'times']")

      .topBar
        p {{ name }} {{ surname }} | {{mainBranch}}
      .generals  
        .subgenerals(v-for="(n, day) in 7") 
          .title {{days[day]}}
          .container(v-for="(n, hour) in 24"  v-if="teachersLessons()[day+'-'+hour] != undefined && teachersLessons()[day+'-'+hour] != 0")  {{hours[hour]}} 
            .block(v-if="schedule[day+'-'+hour]!= undefined && schedule[day+'-'+hour].branch != undefined")
              .string {{schedule[day+'-'+hour].branch.branchName}}
              .number(v-if="schedule[day+'-'+hour].student != undefined") {{schedule[day+'-'+hour].student.name}} {{schedule[day+'-'+hour].student.surname}}
              .number(v-if="schedule[day+'-'+hour].group != undefined") {{schedule[day+'-'+hour].group.groupName}}
</template>

<script>

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      colors: ["white", "#ffbd44", "#00ca4e"],
      selectedBranch: "none",
      selectedGrade: "none",
      name: "",
      id: "",
      teacherHours: "",
      branches: [],
      days: [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar"
      ],
      hours: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      phoneLength: 11,
      surname: "",
      phone: "",
      date: "",
      photo: "",
      adress: "",
      email: "",
      mainBranch: "",
      ourhost: process.env.OUR_URL,
      selectedGrade: "",
      schedule: {}
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
    ...mapActions("users", [
      "getTeachers",
      "addTeacherLessons",
      "getTeachersLessons"
    ]),
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
    getSchedule: async function(teacher) {
      this.id = teacher;
      try {
        await this.$axios
          .post(`${process.env.OUR_HOST}/teachersSchedule`, {
            teacher: this.id
          })
          .then(res => {
            this.schedule = res.data;
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    id(value) {
      if (value != "") {
        let ta = this.teacher()[value];
        this.name = ta.name;
        this.surname = ta.surname;
        this.mainBranch = ta.mainBranch;
        this.getTeachersLessons(value);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.topBar
  background-color: white
  position: absolute
  z-index: 1
  top: 0
  padding: 10px
  justify-content: space-around
  align-items: center
  border-radius: 8px
  text-align: center
  box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
.subs
  transition: all 0.5s ease
.close
    font-size: 8pt
    text-align: center
    padding: 1px
    position: absolute
    z-index: 4
    margin: -25px
    height: 13px
    width: 13px
    border-radius: 50%
    background-color: white
    &:hover
      height: 15px
      padding: 2px
      width: 15px
.pop
  top:0
  right: 0
  height: 100%
  width: 100%
  position: fixed
  z-index: 3
  background-color: white
  @media screen and (max-width: 1200px)
    flex-direction: column
    overflow: auto
    padding: 9px
.body
  padding: 50px
  width: 100vw
  min-height: 100vh
  justify-content: center
  align-items: center
  background: #EF5350
  font-family: "Lato", Arial
  color: #263238
  transition: all 0.5s ease
  .generals
    transition: all 0.5s ease
    width: 60vw
    display: flex
    gap: 20px
    overflow: auto
    @media screen and (max-width: 1200px)
      flex-direction: column
      gap: 0px
  .subgenerals
    transition: all 0.5s ease
    width: 60vw
    display: flex
    gap: 20px
    overflow: auto
    flex-direction: column
    @media screen and (max-width: 1200px)
      flex-direction: column
      gap: 0px
  .container
    transition: all 0.5s ease
    margin: auto
    margin-bottom: 20px
    display: flex
    flex-direction: column
    justify-content: space-around
    width: 120px
    background: white
    align-items: center
    border-radius: 8px
    text-align: center
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
    @media screen and (min-width: 1200px)
      height: 60px
    @media screen and (max-width: 1200px)
      flex-direction: column
      min-height: 60px
      width: 90%
    .block
      transition: all 0.5s ease
      text-align: center
      height: 100%
      width: 90px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      @media screen and (max-width: 1200px)
        height: 100px
      &:hover
        color: #EF5350
      .number
        font-size: 14px
        font-weight: bold
      .string
        font-size: 12px
        line-height: 24px
        color: gray
.title
  font-size: 14px
  font-weight: bold
::-webkit-scrollbar
  width: 5px
  border-radius: 1em

::-webkit-scrollbar-track
  background: #ffffff
  border-radius: 1em

::-webkit-scrollbar-thumb
  background: #000
  border-radius: 1em

::-webkit-scrollbar-thumb:hover
  background: #555
</style>
