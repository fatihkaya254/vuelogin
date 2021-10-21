<template lang="pug">
.body
    .generals
        .container(style="height: 30px;")
            .block() {{id}}
                .string {{dateOfDay}} {{dayNames[day]}} 
        div(:class="[lesson._id == id ? 'containerBig' : 'container']" v-for="lesson in teachersDaily()" v-show="lesson.branch != undefined && lesson.branch != null" :style="[lessonRecords[findMyRecord(lesson._id)] != undefined ? { backgroundColor: colors[lessonRecords[findMyRecord(lesson._id)].smsApp]} : { backgroundColor: colors[0]}]")
            .bottomButtons
                .cancel(@click="close()" v-if="page==0") İptal
                .nP(@click="page -= 1"  v-if="page>0")
                    fa-icon(:icon="['fas', 'chevron-circle-left']")
                .app(v-if="page==3") Onayla
                .nP(@click="page += 1" v-if="page<3")
                    fa-icon(:icon="['fas', 'chevron-circle-right']")
                
            div(:class="[lesson._id == id ? 'blockBig' : 'block']")
                .string {{ hours[lesson.hour] }} 
                .number {{ lessonsStudents[lesson._id] }} {{ lessonsGroups[lesson._id] }}
                .string {{ lessonsBranches[lesson._id] }}
                .changeRecord(@click="clickOnLesson(lesson._id, lesson.hour)" v-if="lesson._id != id" ) {{findMyRecord(lesson._id) ? 'Düzenle' : 'Oluştur'}}      
                div(v-if="lesson._id == id")
                    .subTopics( v-if="lesson._id == id && branchProcess[braid] != undefined")
                        .subjectName(v-for="(topic, index) in branchProcess[braid]") 
                          p(style="color: red; font-weight: 700;") {{branchSubjects[index].subjectName}}
                          .topics( v-for="subtopic in topic")
                            input(type="checkbox" :id="subtopic._id"  class="input-checkbox" :value="subtopic._id" v-model="recordSubtopics" ) 
                            label(:for="subtopic._id" class="input-label") {{subtopic.subTopicName}}
                div(v-if="lesson._id == id")
                    .lastHomework {{preHomework()}}
                    .homeworkStatus
                      .not(:style="[join ? {'background-color': '#00ca4e'} : {'background-color': '#ff605c'}]" @click="join = !join")
                        | Derse Katılım Durumu
                    .homeworkStatus(v-if="preHomework() != ''")
                      .not(:style="[homeworkStatus == 1 ? {'background-color': '#FFB6A3'} : {'background-color': ''}]" @click="homeworkStatus = 1")
                        | Yapılmadı
                      .half(:style="[homeworkStatus == 2 ? {'background-color': '#FFB6A3'} : {'background-color': ''}]" @click="homeworkStatus = 2")
                        | Eksik
                      .done(:style="[homeworkStatus == 3 ? {'background-color': '#FFB6A3'} : {'background-color': ''}]" @click="homeworkStatus = 3")
                        | Tam
                    .nextHomework
                        .infoLine
                            label
                                | Bir Sonraki Ödev
                            input(type="text" placeholder="Ödev" v-model="nextHomework")
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
      page: 0,
      colors: ["white", "#ffbd44", "#00ca4e"],
      homeworkStatus: "",
      nextHomework: "yok",
      preHWL: "Önceki ödev bilgisi yok",
      LGGs: [],
      LGHomeworkStatus: [],
      LGBranchName: "",
      lessonHour: "",
      LGId: "",
      LGPreHomework: "",
      LGBranchId: "",
      smsText: "",
      private: false,
      gPop: false,
      students: [],
      preRecord: {},
      recordId: "",
      profilePop: false,
      studentPhone: "",
      id: "",
      braid: "",
      studentMail: "",
      studentBirthDate: "",
      studentPhoto: "",
      file: "",
      name: "",
      join: true,
      gJoin: [],
      day: "",
      lessons: {},
      groupRecords: {},
      groupPres: [],
      recordSubtopics: [],
      lessonsStudents: [],
      lessonsStudentId: [],
      lessonsGroupId: [],
      lessonsPhotos: [],
      lessonsGroups: [],
      lessonsBranches: [],
      lessonsBranchId: [],
      lessonRecords: [],
      branchProcess: [],
      branchSubjects: [],
      branchSubTopics: [],
      turkDays: [6, 0, 1, 2, 3, 4, 5],
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
      turkMonths: [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ],
      dayNames: [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar"
      ],
      studentName: "",
      dateOfDay: "",
      groupRights: []
    };
  },
  methods: {
    ...mapGetters("users", ["getMyPurchase", "getMyPayment", "teachersDaily"]),
    ...mapActions("users", [
      "getMyPurchases",
      "getMyPayments",
      "getTeachersDaily"
    ]),
    ...mapActions("branches", ["getBranches"]),
    ...mapGetters("branches", ["branch"]),
    ...mapActions("students", ["getGrades", "getGroups"]),
    ...mapGetters("students", ["grade", "group"]),
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
    close: function() {
      this.recordSubtopics = [];
      this.id = "";
      this.homeworkStatus = "";
      this.nextHomework = "";
      this.private = false;
      this.gPop = false;
      this.homeworkStatus = "";
      this.nextHomework = "yok";
      this.LGGs = [];
      this.LGHomeworkStatus = [];
      this.LGBranchName = "";
      this.lessonHour = "";
      this.LGId = "";
      this.LGPreHomework = "";
      this.LGBranchId = "";
      this.smsText = "";
      this.groupPres = [];
      this.join = true;
      this.gJoin = [];
    },
    appSMS: async function(id, stat, lesson) {
      const myLesson = this.teachersDaily()[lesson];
      this.findMyGroupRecords(lesson);
      if (myLesson.group != undefined) {
        for (const stu in this.group()[myLesson.group._id].student) {
          const recordId = this.groupRecords[
            this.group()[myLesson.group._id].student[stu]
          ]._id;
          let newStat = "1";
          if (stat) newStat = "0";
          await this.$axios
            .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
              id: recordId,
              changes: { smsApp: newStat }
            })
            .then(res => {
              console.log(res);
            });
        }
      } else {
        let newStat = "1";
        if (stat) newStat = "0";
        console.log(newStat);
        await this.$axios
          .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
            id,
            changes: { smsApp: newStat }
          })
          .then(res => {
            console.log(res);
          });
      }
      this.start();
    },
    setDates: function() {
      this.teacher = this.userId();
      const now = new Date();
      this.day = this.turkDays[now.getDay()];
      this.dateOfDay =
        now.getDate() +
        " " +
        this.turkMonths[now.getMonth()] +
        " " +
        now.getFullYear();
      var month = now.getMonth() + 1;
    },
    addLessonRecord: function(lesson) {
      const now = new Date();
      const ml = this.teachersDaily()[lesson];
      var record = {};
      record.day = ml.day;
      record.hour = ml.hour;
      record.lesson = lesson;
      record.join = true;
      record.teacher = this.teacher;
      record.student = this.lessonsStudentId[lesson];
      record.branch = this.lessonsBranchId[lesson];
      var month = now.getMonth() + 1;
      record.recordDate = now.getFullYear() + "-" + month + "-" + now.getDate();
      if (this.lessonsGroupId[lesson] != undefined) {
        record.group = this.lessonsGroupId[lesson];
        const groupStudents = this.group()[record.group].student;
        for (const stu in groupStudents) {
          record.student = groupStudents[stu];
          this.$axios
            .post(`${process.env.OUR_HOST}/addLessonRecord`, {
              lessonRecord: record
            })
            .then(res => {
              console.log(res);
            });
        }
      } else {
        this.$axios
          .post(`${process.env.OUR_HOST}/addLessonRecord`, {
            lessonRecord: record
          })
          .then(res => {
            console.log(res);
          });
      }
      console.log(record);
      this.start();
    },
    getLessonRecords: function() {
      const teacher = this.teacher;
      const now = new Date();
      var month = now.getMonth() + 1;
      const date = now.getFullYear() + "-" + month + "-" + now.getDate();
      this.$axios
        .post(`${process.env.OUR_HOST}/dailyTeacherRecords`, {
          teacher,
          date
        })
        .then(res => {
          this.lessonRecords = res.data;
        });
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
    dealCards: function() {
      for (const index in this.teachersDaily()) {
        if (
          this.teachersDaily()[index].branch != undefined &&
          this.teachersDaily()[index].branch["grade"] != undefined
        ) {
          this.$set(
            this.lessonsBranches,
            index,
            this.teachersDaily()[index].branch["grade"].gradeName +
              " " +
              this.teachersDaily()[index].branch.branchName
          );
          this.$set(
            this.lessonsBranchId,
            index,
            this.teachersDaily()[index].branch._id
          );
        }
        if (this.teachersDaily()[index].student != undefined) {
          this.$set(
            this.lessonsStudents,
            index,
            this.teachersDaily()[index].student.name +
              " " +
              this.teachersDaily()[index].student.surname
          );
          this.$set(
            this.lessonsPhotos,
            index,
            this.teachersDaily()[index].student.profilePic
          );
          this.$set(
            this.lessonsStudentId,
            index,
            this.teachersDaily()[index].student._id
          );
        }
        if (this.teachersDaily()[index].group != undefined) {
          this.$set(
            this.lessonsGroups,
            index,
            this.teachersDaily()[index].group.groupName
          );
          this.$set(
            this.lessonsGroupId,
            index,
            this.teachersDaily()[index].group._id
          );
        }
      }
    },
    findMyRecord: function(lesson) {
      for (const index in this.lessonRecords) {
        if (this.lessonRecords[index].lesson == lesson) {
          return index;
        }
      }
    },
    findMyGroupRecords: function(lesson) {
      var indexes = [];
      for (const index in this.lessonRecords) {
        if (this.lessonRecords[index].lesson == lesson) {
          this.$set(this.gJoin, this.lessonRecords[index].student, true);
          if (this.lessonRecords[index].join != undefined) {
            this.$set(
              this.gJoin,
              this.lessonRecords[index].student,
              this.lessonRecords[index].join
            );
          }
          indexes[this.lessonRecords[index].student] = this.lessonRecords[
            index
          ];
        }
      }
      this.groupRecords = indexes;
    },
    clickOnLesson: async function(lesson, h) {
      this.lessonHour = this.hours[h];
      console.log(lesson);
      console.log("basla");
      console.log("basla");
      if (this.findMyRecord(lesson)) {
        if (
          this.lessonRecords[this.findMyRecord(lesson)].student ==
            this.lessonsStudentId[lesson] &&
          this.lessonRecords[this.findMyRecord(lesson)].branch ==
            this.lessonsBranchId[lesson]
        ) {
          const record = this.findMyRecord(lesson);
          this.recordSubtopics = this.lessonRecords[record].subTopics;
          this.nextHomework = this.lessonRecords[record].homework;
          if (this.join != undefined && this.join != null)
            this.join = this.lessonRecords[record].join;
          this.recordId = this.findMyRecord(lesson);
          this.id = lesson;
          this.private = true;
          this.braid = this.lessonsBranchId[lesson];
          console.log(this.branchProcess);
          console.log(this.braid);
          console.log(this.branchProcess[this.braid]);

          console.log("this.id");
          console.log(this.id);
          console.log("this.id");
          this.findPreRecord(lesson);
          console.log("ssda");
        } else if (
          this.lessonRecords[this.findMyRecord(lesson)].group ==
            this.lessonsGroupId[lesson] &&
          this.lessonRecords[this.findMyRecord(lesson)].branch ==
            this.lessonsBranchId[lesson]
        ) {
          this.id = lesson;
          await this.findMyGroupRecords(lesson);
          for (const les in this.groupRecords) {
            await this.findGroupPreRecord(this.groupRecords[les]._id, les);
          }
          for (const pre in this.groupPres) {
            if (
              this.groupPres[pre] != undefined &&
              this.groupPres[pre] != null
            ) {
              this.$set(
                this.LGHomeworkStatus,
                this.groupPres[pre].student,
                this.groupPres[pre].homeworkStatus
              );
            }
          }
          const theRecord = this.groupRecords[
            Object.keys(this.groupRecords)[0]
          ];
          this.recordSubtopics = theRecord.subTopics;
          this.nextHomework = theRecord.homework;
          this.LGId = theRecord.group;
          if (
            this.group()[this.LGId] != undefined &&
            this.group()[this.LGId] != null
          )
            this.LGGs = this.group()[this.LGId].student;
          this.LGBranchId = theRecord.branch;
          this.LGBranchName =
            this.branch()[this.LGBranchId].grade.gradeName +
            " " +
            this.branch()[this.LGBranchId].branchName;
          this.gPop = true;
        } else {
          await this.addLessonRecord(lesson);
          this.start();
          console.log("b");
        }
      } else {
        await this.addLessonRecord(lesson);
        this.start();
        console.log("c");
      }
    },
    preHomework: function() {
      if (this.preRecord == null || this.preRecord == undefined) {
        return "";
      } else {
        return this.preRecord.homework;
      }
    },
    homeworkStatusConvert: async function(stat) {
      if (stat == 1) return "yapılmadı";
      if (stat == 2) return "eksik";
      if (stat == 3) return "tam yapıldı";
      return "-";
    },
    updateRecord: async function() {
      const homeworkS = await this.homeworkStatusConvert(this.homeworkStatus);
      const id = this.recordId;
      var preId = "";
      var join = this.join;
      if (this.preRecord != undefined) preId = this.preRecord._id;
      const subTopics = this.recordSubtopics;
      var homework = "yok";
      if (this.nextHomework != undefined) homework = this.nextHomework;
      var sms =
        this.lessonsStudents[this.id] +
        ", " +
        this.hours[this.teachersDaily()[this.id].hour] +
        ", " +
        this.lessonsBranches[this.id] +
        ", önceki derste verilen ödev: " +
        homeworkS +
        ", bir sonraki ödev: " +
        homework +
        ", " +
        this.userName() +
        " " +
        this.userSurname();
      if (!join) {
        sms =
          this.lessonsStudents[this.id] +
          ", " +
          this.hours[this.teachersDaily()[this.id].hour] +
          ", " +
          this.lessonsBranches[this.id] +
          " öğrenci derse katılmadı" +
          ", " +
          this.userName() +
          " " +
          this.userSurname();
      }
      const homeworkStatus = this.homeworkStatus;
      await this.$axios
        .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
          id,
          changes: { subTopics, homework, sms, join }
        })
        .then(res => {
          console.log(res);
        });
      await this.$axios
        .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
          id: preId,
          changes: { homeworkStatus }
        })
        .then(res => {
          console.log(res);
        });
      this.start();
      this.close();
    },
    updateGroupRecord: async function() {
      for (const student in this.group()[this.LGId].student) {
        const studentId = this.group()[this.LGId].student[student];
        const homeworkStatus = this.LGHomeworkStatus[studentId];
        var preId = "";
        preId = this.groupPres[studentId];
        var join = this.gJoin[studentId];
        console.log(join);
        const recordId = this.groupRecords[studentId]._id;
        const subTopics = this.recordSubtopics;
        const branch = this.LGBranchId;
        var homework = "yok";
        if (this.nextHomework != undefined) homework = this.nextHomework;
        const homeworkS = await this.homeworkStatusConvert(homeworkStatus);
        var sms =
          this.students[studentId] +
          ", " +
          this.lessonHour +
          ", " +
          this.branch()[branch].branchName +
          ", önceki derste verilen ödev: " +
          homeworkS +
          ", bir sonraki ödev: " +
          homework +
          ", " +
          this.userName() +
          " " +
          this.userSurname();
        if (!join) {
          sms =
            this.students[studentId] +
            ", " +
            this.lessonHour +
            ", " +
            this.branch()[branch].branchName +
            " öğrenci derse katılmadı" +
            ", " +
            this.userName() +
            " " +
            this.userSurname();
        }
        await this.$axios
          .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
            id: recordId,
            changes: { subTopics, homework, sms, join }
          })
          .then(res => {
            console.log(res);
          });
        if (preId != undefined && preId != null && preId != "") {
          await this.$axios
            .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
              id: preId._id,
              changes: { homeworkStatus }
            })
            .then(res => {
              console.log(res);
              console.log(homeworkStatus);
              console.log("hw");
            });
        }
      }
      this.start();
      this.close();
    },
    findPreRecord: async function(lesson) {
      const record = this.findMyRecord(lesson);
      const conditions = {};
      const student = this.lessonsStudentId[lesson];
      if (student != "" && student != undefined && student != null)
        conditions.student = student;
      conditions.group = null;
      conditions._id = { $ne: record };
      conditions.branch = this.lessonsBranchId[lesson];
      conditions.teacher = this.userId();
      console.log("co");
      console.log(conditions);
      await this.$axios
        .post(`${process.env.OUR_HOST}/findLessonRecord`, {
          conditions
        })
        .then(res => {
          this.preRecord = res.data.preRecord;
          if (res.data.preRecord != null) {
            this.homeworkStatus = this.preRecord.homeworkStatus;
          }
        });
    },
    findGroupPreRecord: async function(record, student) {
      const now = new Date();
      var month = now.getMonth() + 1;
      var dateToday = now.getFullYear() + "-" + month + "-" + now.getDate();
      const conditions = {};
      if (student != "" && student != undefined && student != null) {
        conditions.student = student;
      }
      conditions.branch = this.groupRecords[student].branch;
      conditions.group = this.groupRecords[student].group;
      conditions.recordDate = { $lt: dateToday };
      conditions.teacher = this.userId();
      await this.$axios
        .post(`${process.env.OUR_HOST}/findLessonRecord`, {
          conditions
        })
        .then(res => {
          this.$set(this.groupPres, student, res.data.preRecord);
        });
    },
    start: async function() {
      this.getGroups();
      this.setDates();
      await this.getTeachersDaily({ teacher: this.teacher, day: this.day });
      this.getLessonRecords();
      this.dealCards();
      this.getSubTopics();
    },
    getRights: async function() {
      console.log("as");
      try {
        await this.$axios
          .get(`${process.env.OUR_HOST}/groupRights`)
          .then(res => {
            this.groupRights = res.data;
            console.log("res");
          });
      } catch (error) {
        console.log(error);
      }
      for (const right in this.groupRights) {
        this.$set(
          this.students,
          this.groupRights[right].student._id,
          this.groupRights[right].student.name +
            " " +
            this.groupRights[right].student.surname
        );
      }
    },
    LGHomeworkStatusChange: function(student, hs) {
      this.$set(this.LGHomeworkStatus, student, hs);
      console.log(this.LGHomeworkStatus);
    },
    changeGroupJoin: function(student) {
      var newStatus = !this.gJoin[student];
      this.$set(this.gJoin, student, newStatus);
    }
  },
  watch: {},
  async mounted() {
    await this.getRights();
    this.getBranches();
    this.start();
  }
  // v-if="lessonRecords[findMyRecord(lesson._id)] == undefined"
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
    width: 60vw
    background: white
    align-items: center
    border-radius: 8px
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
    @media screen and (min-width: 1200px)
      height: 100px
    @media screen and (max-width: 1200px)
      flex-direction: column
    .block
      transition: all 0.5s ease
      text-align: center
      height: 100px
      width: 200px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      @media screen and (max-width: 1200px)
        height: 100px
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
      @media screen and (max-width: 1200px)
        height: 200px
        width: 100%

      .number
        font-size: 16px
        font-weight: bold
      .string
        font-size: 12px
        line-height: 24px
        color: gray
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

.subTopics
  margin: 20px
  height: 300px
  width: 90vw
  overflow: auto
  border: 0.5px solid black
  border-radius: 1em
.topics
    text-align: left
.subjectName
  margin: 15px
  font-size: 10pt

input[type=checkbox].input-checkbox
    transition: all 0.5s ease
    display: none
    & + label
        &.input-label
            cursor: pointer
    &:checked
        & + label
            &.input-label
                color: green
.input-label
    transition: all 0.5s ease
    color: blue
</style>
