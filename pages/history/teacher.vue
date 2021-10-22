<template lang="pug">
.body
    input(type="date" v-model="date")
    .teachers
        .teacher(v-for="i in teacher()" @click="setTeacher(i._id)" :class="[i._id != teacherId ? '' : 'aTeacher']") {{i.name}} {{i.surname}}
    .container(v-for="(c,b) in lessonRecords") 
      .block
        .string {{c.hour}}:00
        .block(v-if="c.sms != undefined") 
            .string 
                fa-icon(:icon="['fas', 'sms']")
                label {{c.sms}}
            .number İşlenen Konular
              .string(v-for="t in c.subTopics")
                .string(v-if="branchSubTopics[t] != undefined") {{branchSubTopics[t].subTopicName}}
    div(v-for="c in teachersDaily()")  
      .generals(v-if="c.student != undefined || c.group != undefined")
        .container(v-if="!((c.student != undefined && lessonRecords[c._id+''+c.student._id] != undefined)  || (c.group != undefined && lessonRecords[c._id+''+c.group.student[0]] != undefined))")  
          .block( :style=" {backgroundColor: 'antiquewhite'}")
              .string {{c.hour}}:00
              .block(v-if="c.student != undefined")
                  .string {{c.student.name}} {{c.student.surname}}
              .block(v-if="c.group != undefined") 
                  .string {{c.group.groupName}}

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  imports: [
    {
      set: "@fortawesome/free-solid-svg-icons"
    }
  ],
  data() {
    return {
      colors: ["white", "#ffbd44", "#00ca4e"],
      date: "",
      teacherId: "",
      turkDays: [6, 0, 1, 2, 3, 4, 5],
      lessonRecords: {},
      branchSubjects: [],
      branchSubTopics: []
    };
  },
  methods: {
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
    ...mapActions("branches", ["getBranches", "getSubjects", "getSubTopics"]),
    ...mapGetters("branches", ["branch", "subject", "subTopic"]),
    ...mapGetters("users", ["teacher", "teachersDaily"]),
    ...mapActions("users", ["getTeachers", "getTeachersDaily"]),
    setTeacher: function(id) {
      if (id == "") return;
      this.teacherId = id;
      var date = new Date();
      if (this.date != "") date = new Date(this.date);
      this.getTeachersDaily({ teacher: id, day: this.turkDays[date.getDay()] });
      this.getLessonRecords();
    },
    getSubTopics: function() {
      this.$axios
        .post(`${process.env.OUR_HOST}/branchProcess`, {
          branch: this.userBranch()
        })
        .then(res => {
          this.branchProcess = res.data.branchMap;
          this.branchSubjects = res.data.subjectMap;
          this.branchSubTopics = res.data.branchSubtopics;
          console.log("this.branchProcess");
          console.log(this.branchProcess);
          console.log("this.branchProcess");
        });
    },
    getLessonRecords: function() {
      this.lessonRecords = {}
      if (this.teacherId == "") return;
      const teacher = this.teacherId;
      var now = new Date();
      if (this.date != "") now = new Date(this.date);
      var month = now.getMonth() + 1;
      const date = now.getFullYear() + "-" + month + "-" + now.getDate();
      this.$axios
        .post(`${process.env.OUR_HOST}/dailyTeacherRecords`, {
          teacher,
          date
        })
        .then(res => {
          for (const el in res.data) {
            this.$set(this.lessonRecords, res.data[el].lesson+""+res.data[el].student, res.data[el]);
          }
          console.log(this.lessonRecords);
        });
    }
  },
  watch: {
    date: function() {
      this.getLessonRecords()
      this.setTeacher(this.teacherId);
    }
  },
  mounted() {
    this.getSubTopics()
    this.getTeachers();
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
  overflow: auto
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
    padding: 10px
    border-radius: 8px
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
    @media screen and (max-width: 1200px)
      flex-direction: column
    .block
      transition: all 0.5s ease
      text-align: center
      width: 200px
      display: flex
      gap:20px
      flex-direction: column
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
