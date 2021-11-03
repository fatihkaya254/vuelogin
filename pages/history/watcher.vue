<template lang="pug">
.body
    .container(@click="sendAll()")
      .block
        .number {{balance}}
        .string ({{counter}}) Tüm SMS'leri Gönder
    .container(v-for="(c,b) in lessons" @click="wp(c)") 
      .block 
        .string {{c.hour}}:00
        .string {{c.teacher.name}} {{c.teacher.surname}}
        .string(v-if="c.student != undefined") {{c.student.name}} {{c.student.surname}}
        .string(v-if="c.group != undefined") {{c.group.groupName}}
        .block(v-if="lessonRecords[b]") 
          div(v-for="sub in lessonRecords[b]" :style="{backgroundColor: colors[sub.smsApp]}")
            .string 
                fa-icon(:icon="['fas', 'sms']")
            .string(v-if="lessonRecords[b] != undefined") {{sub.sms}}
            .string(v-if="lessonRecords[b] != undefined") {{sub.subTopics.length}}
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
            redirect("/history");
          }
        }
      });
  },
  imports: [
    {
      set: "@fortawesome/free-solid-svg-icons"
    }
  ],
  data() {
    return {
      counter: 0,
      parent: {},
      colors: ["white", "#ffbd44", "#00ca4e"],
      balance: "",
      date: "",
      teacherId: "",
      turkDays: [6, 0, 1, 2, 3, 4, 5],
      lessonRecords: {},
      branchSubjects: [],
      whois: {},
      warnings: {},
      branchSubTopics: [],
      lessons: {}
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
    wp: function(lesson) {
      const phone = lesson.teacher.phone;
      const hour = lesson.hour + ":00";
      var student = "";
      if (lesson.student != undefined)
        student = lesson.student.name + " " + lesson.student.surname;
      if (lesson.group != undefined) student = lesson.group.groupName;
      var text = hour + "%20";
      text +=
        student +
        "%20ile%20olan%20dersin%20kaydını%20kontrol%20eder%20misiniz?";
      if (
        this.lessonRecords[lesson._id] != undefined &&
        lesson.student != undefined
      ) {
        const record = this.lessonRecords[lesson._id][lesson.student._id];
        if (record.homework == "") text += " Yeni ödev girilmemiş.";
        if (record.subTopics.length == 0)
          text += " İşlenen konular girilmemiş.";
      } else if (lesson.group != undefined) {
        for (const [key, value] of Object.entries(
          this.lessonRecords[lesson._id]
        )) {
          if (value.homework == "") text += " Yeni ödev girilmemiş.";
          if (value.subTopics.length == 0)
            text += " İşlenen konular girilmemiş.";
          break
        }
      } else {
        text = "Girilmeyen ders kayıtları var.";
      }
      window.open(`https://wa.me/90${phone}?text=${text}`, "_blank");
    },
    getLessonRecords: function() {
      this.$axios.get(`${process.env.OUR_HOST}/getTodayRecord`).then(res => {
        console.log(res);
        for (const el in res.data.todays) {
          if (this.lessonRecords[res.data.todays[el].lesson] == undefined)
            this.lessonRecords[res.data.todays[el].lesson] = {};
          this.$set(
            this.lessonRecords[res.data.todays[el].lesson],
            res.data.todays[el].student,
            res.data.todays[el]
          );
          if(res.data.todays[el].smsApp == 1) this.counter++
        }
        console.log("this.lessonRecords");
        console.log(this.lessonRecords);
      });
    },
    sendSms: async function(s) {
      if (s.smsApp == 1) {
        var dateTime = Date.now();
        var sms = s.sms;
        var student = s.student;
        for (const phone in this.warnings[student]) {
          var info = {
            sms,
            phone,
            dateTime,
            student
          };
          console.log(info);
          await this.$axios
            .post(`${process.env.OUR_HOST}/sendSms`, info)
            .then(res => {
              console.log(res);
            });
        }
        await this.$axios
          .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
            id: s._id,
            changes: { smsApp: "2" }
          })
          .then(res => {
            console.log(res);
          });
      }
    },
    sendAll: function() {
      console.log("warn");
      console.log(this.warnings);
      console.log(this.whois);
      const lr = this.lessonRecords;
      var sublr = {};
      for (const el in lr) {
        sublr = lr[el];
        for (const sub in sublr) {
          this.sendSms(sublr[sub]);
        }
      }
      this.$router.push("/myrecords");
    }
  },
  async mounted() {
    await this.getLessonRecords();
    this.getSubTopics();
    this.getTeachers();
    await this.$axios.get(`${process.env.OUR_HOST}/getAllToday`).then(res => {
      this.lessons = res.data;
    });
    await this.$axios.get(`${process.env.OUR_HOST}/smsBalance`).then(res => {
      this.balance = res.data.sms;
    });
    await this.$axios.get(`${process.env.OUR_HOST}/getParentship`).then(res => {
      this.parent = res.data.todays;
    });
    var phones = {};
    for (const i in this.lessonRecords) {
      for (const s in this.lessonRecords[i]) {
        var student = this.lessonRecords[i][s].student;
        var phones = {};
        for (const j in this.parent) {
          if (this.parent[j].student != undefined) {
            if (student == this.parent[j].student._id) {
              var name =
                this.parent[j].parent.name +
                " " +
                this.parent[j].parent.surname;
              var phone = this.parent[j].parent.phone;
              await this.$set(phones, phone, phone);
              this.$set(this.warnings, student, phones);
              this.$set(this.whois, phone, name);
            }
          }
        }
      }
    }
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
    &:first-child
      margin-top: 5px
    input[type=date]
      border: none
      outline: none
      width: 60%
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
select
  height: 28px
  border: none
  width: 60%
  border-radius: 1em

option
  height: 28px
  border: none
  min-width: 60%
  -webkit-appearance: none
  border-radius: 1em
</style>
