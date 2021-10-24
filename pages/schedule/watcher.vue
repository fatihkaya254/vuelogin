<template lang="pug">
.body
    .generals 
        .container
          select(@change="setTeacher($event.target.value)")
              option(v-for="i in teacher()" :value="i._id") {{i.name}} {{i.surname}}
        .container
            .block
                .string {{userName()}} {{userSurname()}}
        .container(v-for="(n, day) in 7")
            .block
                .string {{days[day]}}
            .container(v-for="(n, hour) in 24"  v-if="teachersLessons()[day+'-'+hour] != undefined && teachersLessons()[day+'-'+hour] != 0" ) 
                .block(v-if="schedule[day+'-'+hour]!= undefined && schedule[day+'-'+hour].branch != undefined")
                  .string  {{hours[hour]}} 
                  .string {{schedule[day+'-'+hour].branch.grade.gradeName}} {{schedule[day+'-'+hour].branch.branchName}}
                  .string(v-if="schedule[day+'-'+hour].student != undefined") {{schedule[day+'-'+hour].student.name}} {{schedule[day+'-'+hour].student.surname}}
                  .string(v-if="schedule[day+'-'+hour].group != undefined") {{schedule[day+'-'+hour].group.groupName}}
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware({ store, redirect, $axios }) {
    return $axios
      .post(`${process.env.OUR_HOST}/auth`, { token: store.getters.getAuthkey })
      .then(res => {
        if (res.data.user.role != undefined) {
          var rank = parseInt(res.data.user.role.rank, 10);
          console.log(rank + "rank");
          if (rank > 20) {
            redirect("/schedule");
          }
        }
      });
  },
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
    ...mapGetters([
      "userId",
      "userName",
      "userSurname",
      "userPhone",
      "userEmail",
      "userBirthDay",
      "userImage",
      "userBirthDayForInput",
      "userGoogleId",
      "isTeacher",
      "userBranch"
    ]),

    getSchedule: async function(teacher) {
      console.log("teacher");
      console.log(teacher);
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
    },
    setTeacher: function(id) {
      this.getSchedule(id);
      let ta = this.teacher()[id];
      this.name = ta.name;
      this.surname = ta.surname;
      this.mainBranch = ta.mainBranch;
      this.getTeachersLessons(id);
    }
  },
  async mounted() {
    await this.getTeachers();
    this.getSchedule(this.userId());
    let ta = this.teacher()[this.userId()];
    this.name = ta.name;
    this.surname = ta.surname;
    this.mainBranch = ta.mainBranch;
    this.getTeachersLessons(this.userId());
  }
};
</script>

<style lang="sass" scoped>
.pop
  height: 60vh
  width: 60vw
  background-color: white
  position: absolute
  z-index: 1
  right: 20vw
  border-radius: 8px
  box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
  overflow: hidden
.chartPop
  height: 60vh
  width: 60vw
  background-color: white
  position: absolute
  z-index: 1
  right: 20vw
  border-radius: 8px
  box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
  overflow: auto
.close
  width: 60vw
  background-color: #EF5350
  color: white
  justify-content: center
  align-items: center
  text-align: center
  font-family: "Lato", Arial
  padding: 12px

.list
  height: 50vh
  overflow: auto
  justify-content: center
  text-align: center
  margin-top: 16px
  ol
    display: table
    margin: 0 auto
    padding: 0
  li
    margin: 10px
.subs
  transition: all 0.5s ease

.body
  transition: all 0.5s ease
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
    width: 100vw
    padding-top: 10px
    display: flex
    gap: 20px
    align-items: center
    @media screen and (max-width: 1200px)
      flex-direction: column
      gap: 0px
  .container
    transition: all 0.5s ease
    margin: auto
    margin-bottom: 20px
    display: flex
    flex-direction: row
    justify-content: space-around
    width: 90vw
    background: white
    align-items: center
    border-radius: 8px
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
    @media screen and (min-width: 1200px)
      height: 100px
    @media screen and (max-width: 1200px)
      flex-direction: column
    &:first-child
      margin-top: 5px
    input[type=date]
      border: none
      outline: none
      width: 60%
    .block
      transition: all 0.5s ease
      text-align: center
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      @media screen and (max-width: 1200px)
        width: 100%
      &:hover
        color: #EF5350
      .number
        font-size: 16px
        font-weight: bold
      .string
        font-size: 12px
        line-height: 24px
        color: gray
        width: 30%
    .changeRecord
        font-size: 9pt
        background-color: #00000033
        padding: 3px
        width: 70%
        border-radius: 6px
    .bottomButtons
        display: none
  .generalsBig
    transition: all 0.5s ease
    width: 100vw
    display: flex
    gap: 20px
    margin: auto
    @media screen and (max-width: 1200px)
      flex-direction: column
      gap: 0px
  .containerBig
    transition: all 0.5s ease
    position: fixed
    height: 80vh
    margin: auto
    margin-bottom: 20px
    display: flex
    flex-direction: row
    justify-content: space-around
    width: 90vw
    background: white
    align-items: center
    border-radius: 18px
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
    overflow: hidden
    @media screen and (min-width: 1200px)
      height: 100px
    @media screen and (max-width: 1200px)
      flex-direction: column
    .blockBig
      flex-grow: 1
      transition: all 0.5s ease
      transition: all 0.5s ease
      text-align: center
      height: 100%
      width: 200px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      padding-top: 20px
      padding-bottom: 36px
      @media screen and (max-width: 1200px)
        height: 200px
        width: 100%

      .number
        font-size: 16px
        flex-grow: 1
        font-weight: bold
      .string
        flex-grow: 1
        font-size: 12px
        line-height: 24px
        color: gray
      .info
        transition: all 0.5s ease
        width: 80%
        flex-grow: 50
        padding-top: 20px
        padding-bottom: 20px
        display: flex
        flex-direction: column
        justify-content: flex-end
        align-items: stretch
        gap: 20px


      .join
        transition: all 0.5s ease
        color: white
        padding: 5px
        border-radius: 6px
        display: flex
        text-align: left
        justify-content: center
        gap: 20px
        width: 100%
        margin-bottom: 6px
      .nextHomework
        margin-bottom: 20px
      .homeworkStatus
        display: flex
        justify-content: center
        align-items: stretch
        gap: 5px
        font-size: 9pt
        .hs
          transition: all 0.5s ease
          width: 33%
          padding: 4px
          border-radius: 6px
      .infoLine
        display: flex
        flex-direction: column
        gap: 5px
        & input
          height: 28px
          border: 0.1px solid gray
          -webkit-appearance: none
          padding-left: 16px
          padding-right: 16px
          border-radius: 6px
          &:focus
            -webkit-appearance: none
      .page
        transition: all 0.5s ease
        position: absolute
        z-index: 4
        bottom: 22px
        font-size: 12px
        line-height: 24px
        color: gray

      .subTopics
        height: 55vh
        overflow: auto
        background-color: #e5e5e5
        border-radius: 1em
      .topics
        text-align: left
        padding: 5px
        line-height: 20px
      .topicsSms
        text-align: center
        padding: 5px
        line-height: 20px
      .mainTopic
        color: Black
        font-weight: 700
        margin-bottom: 5px
      .subjectName
        margin: 15px
        font-size: 10pt
    .bottomButtons
        transition: all 0.5s ease
        position: absolute
        display: flex
        justify-content: center
        align-items: stretch
        width: 100%
        z-index: 4
        bottom: 0
    .cancel
        transition: all 0.5s ease
        background: #ffbd44
        text-align: center
        padding: 5px
        font-size: 9pt
        width: 50%
    .nP
        transition: all 0.5s ease
        background: white
        text-align: center
        padding: 5px
        font-size: 9pt
        width: 50%
    .app
        transition: all 0.5s ease
        font-size: 9pt
        background: #00ca4e
        padding: 5px
        width: 50%
        text-align: center
    .div
        height: 55vh
        display: flex
        flex-direction: column
        justify-content: center
    .groupSms
      height: 40vh
      overflow: auto
      display: flex
      flex-direction: column
      gap: 15px
::-webkit-scrollbar
  width: 0px
  border-radius: 1em

::-webkit-scrollbar-track
  background: #ffffff
  border-radius: 1em

::-webkit-scrollbar-thumb
  background: #000
  border-radius: 1em

::-webkit-scrollbar-thumb:hover
  background: #555



input[type=checkbox].input-checkbox
    transition: all 0.5s ease
    display: none
    & + label
        &.input-label
            border-radius: 8px
            background-color: #cdcdcd
            color: gray
            padding: 4px 8px 4px 8px
            cursor: pointer
    &:checked
        & + label
            &.input-label
                background-color: #3b8070
                color: white
.input-label
    transition: all 0.5s ease
    color: blue
</style>
