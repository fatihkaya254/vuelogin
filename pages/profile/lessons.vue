<template lang="pug">
.mainContainer
  .aboutDay {{dateOfDay}} {{dayNames[day]}} 
  .lessonContainer  
    .lessonCard(v-for="lesson in teachersDaily()" v-show="lesson.branch != undefined && lesson.branch != null" :style="[lessonRecords[findMyRecord(lesson._id)] != undefined ? { backgroundColor: colors[lessonRecords[findMyRecord(lesson._id)].smsApp]} : { backgroundColor: colors[0]}]")
      .linePhoto
        img(:src="'/' + lessonsPhotos[lesson._id]" v-if="lessonsPhotos[lesson._id] != undefined")
        img(src="../../assets/basic-profile.png" v-if="lessonsPhotos[lesson._id] == undefined")
      .lessonInfoes
        .clock {{ hours[lesson.hour] }} 
        .branch {{ lessonsBranches[lesson._id] }}
        .student {{ lessonsStudents[lesson._id] }} {{ lessonsGroups[lesson._id] }}
        .changeRecord(@click="clickOnLesson(lesson._id, lesson.hour)" ) {{findMyRecord(lesson._id) ? 'Düzenle' : 'Oluştur'}}
      .lessonInfoesSMS
        .student(v-if="lessonRecords[findMyRecord(lesson._id)] != undefined") {{ lessonRecords[findMyRecord(lesson._id)].sms }} 
        .changeRecord(v-if="lessonRecords[findMyRecord(lesson._id)] != undefined && lessonRecords[findMyRecord(lesson._id)].smsApp != undefined && lessonRecords[findMyRecord(lesson._id)].smsApp != 2" @click="appSMS(findMyRecord(lesson._id), lessonRecords[findMyRecord(lesson._id)].smsApp, lesson._id )" ) {{lessonRecords[findMyRecord(lesson._id)].smsApp ? 'SMS Onay Kaldır' : 'SMS Onayla'}}
    .lessonCard {{dateOfDay}} {{dayNames[day]}} 
  .changeHours(v-show="private")
    .close(@click="close()")
    .topBar 
      .branch {{ lessonsBranches[id] }}
      .student {{ lessonsStudents[id] }} {{ lessonsGroups[id] }}
    .subTopics
      .subjectName(v-for="(topic, index) in this.branchProcess[braid]") 
       p(style="color: red; font-weight: 700;") {{branchSubjects[index].subjectName}}
        div( v-for="subtopic in topic" style="border-bottom: 1px solid black;")
          label(:for="subtopic._id" class="rounded-checkbox") 
            input(type="checkbox" :id="subtopic._id" :value="subtopic._id" v-model="recordSubtopics" ) 
            span(class="rounded-checkbox__outer")
              span(class="rounded-checkbox__inner")
            p {{subtopic.subTopicName}}
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
    .apply
      .infoLine
        input(type="submit" value="Onayla" @click="updateRecord()")
  // --------------------------------- Grup Kartı Bundan Sonra
  .changeHours(v-show="gPop")
    .close(@click="close()")
    .topBar 
      .branch {{ LGBranchName }}
      .student {{ lessonsStudents[id] }} {{ lessonsGroups[id] }}
    .subTopics
      .subjectName(v-for="(topic, index) in this.branchProcess[LGBranchId]") 
       p(style="color: red; font-weight: 700;") {{branchSubjects[index].subjectName}}
        div( v-for="subtopic in topic" style="border-bottom: 1px solid black;")
          label(:for="subtopic._id" class="rounded-checkbox") 
            input(type="checkbox" :id="subtopic._id" :value="subtopic._id" v-model="recordSubtopics" ) 
            span(class="rounded-checkbox__outer")
              span(class="rounded-checkbox__inner")
            p {{subtopic.subTopicName}}
    .lastHomework(v-if="groupPres[Object.keys(groupPres)[0]]") {{groupPres[Object.keys(groupPres)[0]].homework}}
    .homeworkStatus(v-for="stua in LGGs")
      .not(:style="[gJoin[stua] ? {'background-color': '#00ca4e'} : {'background-color': '#ff605c'}]" @click="changeGroupJoin(stua)")
        | {{students[stua]}} Katılım
    .homeworkStatus(v-for="stua in LGGs" v-if="groupPres[Object.keys(groupPres)[0]]")  {{students[stua]}}
      .not(:style="[LGHomeworkStatus[stua] == 1 ? {'background-color': '#FFB6A3'} : {'background-color': ''}]" @click="LGHomeworkStatusChange(stua, 1)")
        | Yapılmadı
      .half(:style="[LGHomeworkStatus[stua] == 2 ? {'background-color': '#FFB6A3'} : {'background-color': ''}]" @click="LGHomeworkStatusChange(stua, 2)")
        | Eksik
      .done(:style="[LGHomeworkStatus[stua] == 3 ? {'background-color': '#FFB6A3'} : {'background-color': ''}]" @click="LGHomeworkStatusChange(stua, 3)")
        | Tam
    .nextHomework
      .infoLine
        label
            | Bir Sonraki Ödev
        input(type="text" placeholder="Ödev" v-model="nextHomework")
    .apply
      .infoLine
        input(type="submit" value="Onayla" @click="updateGroupRecord()")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      colors: ["#ff605c", "#ffbd44", "#00ca4e"],
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
        "23:00",
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
        "Aralık",
      ],
      dayNames: [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar",
      ],
      studentName: "",
      dateOfDay: "",
      groupRights: [],
    };
  },
  methods: {
    ...mapGetters("users", ["getMyPurchase", "getMyPayment", "teachersDaily"]),
    ...mapActions("users", [
      "getMyPurchases",
      "getMyPayments",
      "getTeachersDaily",
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
      "userBranch",
    ]),
    close: function () {
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
    appSMS: async function (id, stat, lesson) {
      const myLesson = this.teachersDaily()[lesson];
      this.findMyGroupRecords(lesson);
      if (myLesson.group != undefined) {
        for (const stu in this.group()[myLesson.group._id].student) {
          console.log(
            this.groupRecords[this.group()[myLesson.group._id].student[stu]]._id
          );
          const recordId =
            this.groupRecords[this.group()[myLesson.group._id].student[stu]]
              ._id;
          let newStat = "1";
          if (stat) newStat = "0";
          await this.$axios
            .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
              id: recordId,
              changes: { smsApp: newStat },
            })
            .then((res) => {
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
            changes: { smsApp: newStat },
          })
          .then((res) => {
            console.log(res);
          });
      }
      this.start();
    },
    setDates: function () {
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
    addLessonRecord: function (lesson) {
      const now = new Date();
      const ml = this.teachersDaily()[lesson];
      var record = {};
      record.day = ml.day;
      record.hour = ml.hour;
      record.lesson = lesson;
      record.join = true
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
              lessonRecord: record,
            })
            .then((res) => {
              console.log(res);
            });
        }
      } else {
        this.$axios
          .post(`${process.env.OUR_HOST}/addLessonRecord`, {
            lessonRecord: record,
          })
          .then((res) => {
            console.log(res);
          });
      }
      console.log(record);
      this.start();
    },
    getLessonRecords: function () {
      const teacher = this.teacher;
      const now = new Date();
      var month = now.getMonth() + 1;
      const date = now.getFullYear() + "-" + month + "-" + now.getDate();
      this.$axios
        .post(`${process.env.OUR_HOST}/dailyTeacherRecords`, {
          teacher,
          date,
        })
        .then((res) => {
          this.lessonRecords = res.data;
        });
    },
    getSubTopics: function () {
      this.$axios
        .post(`${process.env.OUR_HOST}/branchProcess`, {
          branch: this.userBranch(),
        })
        .then((res) => {
          this.branchProcess = res.data.branchMap;
          this.branchSubjects = res.data.subjectMap;
          this.branchSubTopics = res.data.branchSubtopics;
        });
    },
    dealCards: function () {
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
    findMyRecord: function (lesson) {
      for (const index in this.lessonRecords) {
        if (this.lessonRecords[index].lesson == lesson) {
          return index;
        }
      }
    },
    findMyGroupRecords: function (lesson) {
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
          indexes[this.lessonRecords[index].student] =
            this.lessonRecords[index];
        }
      }
      this.groupRecords = indexes;
    },
    clickOnLesson: async function (lesson, h) {
      this.lessonHour = this.hours[h];
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
          console.log(this.id);
          this.findPreRecord(lesson);
          console.log("a");
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
          const theRecord =
            this.groupRecords[Object.keys(this.groupRecords)[0]];
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
    preHomework: function () {
      if (this.preRecord == null || this.preRecord == undefined) {
        return "";
      } else {
        return this.preRecord.homework;
      }
    },
    homeworkStatusConvert: async function (stat) {
      if (stat == 1) return "yapılmadı";
      if (stat == 2) return "eksik";
      if (stat == 3) return "tam yapıldı";
      return "-";
    },
    updateRecord: async function () {
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
          this.lessonsStudents[this.id]+
          ", " +
          this.hours[this.teachersDaily()[this.id].hour] +
          ", " +
          this.lessonsBranches[this.id]+
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
          changes: { subTopics, homework, sms, join },
        })
        .then((res) => {
          console.log(res);
        });
      await this.$axios
        .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
          id: preId,
          changes: { homeworkStatus },
        })
        .then((res) => {
          console.log(res);
        });
      this.start();
      this.close();
    },
    updateGroupRecord: async function () {
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
            changes: { subTopics, homework, sms, join },
          })
          .then((res) => {
            console.log(res);
          });
        if (preId != undefined && preId != null && preId != "") {
          await this.$axios
            .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
              id: preId._id,
              changes: { homeworkStatus },
            })
            .then((res) => {
              console.log(res);
              console.log(homeworkStatus);
              console.log("hw");
            });
        }
      }
      this.start();
      this.close();
    },
    findPreRecord: async function (lesson) {
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
          conditions,
        })
        .then((res) => {
          this.preRecord = res.data.preRecord;
          if (res.data.preRecord != null) {
            this.homeworkStatus = this.preRecord.homeworkStatus;
          }
        });
    },
    findGroupPreRecord: async function (record, student) {
      const now = new Date();
      var month = now.getMonth() + 1;
      var dateToday = now.getFullYear() + "-" + month + "-" + now.getDate();
      console.log(dateToday);
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
          conditions,
        })
        .then((res) => {
          this.$set(this.groupPres, student, res.data.preRecord);
          console.log(this.groupPres);
        });
    },
    start: async function () {
      this.getGroups();
      this.setDates();
      await this.getTeachersDaily({ teacher: this.teacher, day: this.day });
      this.getLessonRecords();
      this.dealCards();
      this.getSubTopics();
    },
    getRights: async function () {
      console.log("as");
      try {
        await this.$axios
          .get(`${process.env.OUR_HOST}/groupRights`)
          .then((res) => {
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
      console.log("this.students");
      console.log(this.students);
    },
    LGHomeworkStatusChange: function (student, hs) {
      this.$set(this.LGHomeworkStatus, student, hs);
      console.log(this.LGHomeworkStatus);
    },
    changeGroupJoin: function (student) {
      var newStatus = !this.gJoin[student];
      this.$set(this.gJoin, student, newStatus);
    },
  },
  watch: {},
  async mounted() {
    await this.getRights();
    this.getBranches();
    this.start();
  },
  // v-if="lessonRecords[findMyRecord(lesson._id)] == undefined"
};
</script>

<style lang="sass" scoped>
$darkGreen: #5F9595
$somon: #FFB6A3
$white: #F7F3F0
$greenBlue: #AAB8BB
$ligthGreen: #C4D7D1

.apply
  padding: 1px
.infoLine
  margin: auto
  margin-top: 10px
  padding-top: 8px
  height: 40px
  border-bottom: 0.75px solid gray
  width: 80%
  @media screen and (max-width: 1200px)
    display: flex
    flex-direction: column
    height: 100px
  & input
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
    @media screen and (max-width: 1200px)
      margin-top: 10px
      height: 40px
      width: 100%
      border: 0.5px solid black
    &:focus
      -webkit-appearance: none



    &[type="submit"]
      background-color: black
      color: white

      &:hover
        cursor: pointer

.homeworkStatus
  width: 100%
  display: flex
  gap: 20px
  padding: 20px

.lastHomework
  text-align: center
  padding-left: 20px
  padding-right: 20px
.not
  border: 0.5px solid gray
  border-radius: 1em
  width: 100%
  text-align: center
  height: 30px
  padding: 5px
  cursor: pointer
.half
  border: 0.5px solid gray
  width: 100%
  border-radius: 1em
  text-align: center
  padding: 5px
  height: 30px
  cursor: pointer
.done
  border: 0.5px solid gray
  width: 100%
  border-radius: 1em
  text-align: center
  height: 30px
  padding: 5px
  cursor: pointer

.mainContainer
  overflow: auto
  height: 60vh
  padding-bottom: 200px
.lessonContainer
  height: 400px
  padding: 50px
  height: 60vh
  @media screen and (max-width: 1200px)
    padding: 0
    height: 100vh

.subTopics
  margin: 20px
  height: 300px
  width: 90vw
  overflow: auto
  border: 0.5px solid black
  border-radius: 1em

.subjectName
  margin: 15px

.lessonInfoes
  display: flex
  flex-direction: row
  @media screen and (max-width: 1200px)
    flex-direction: column

.lessonInfoesSMS
  display: flex
  flex-direction: column

.clock
  background-color: $darkGreen
  color: $white
  text-align: center
  padding: 5px
  border-radius: 1em

.changeRecord
  width: 100px
  background-color: $darkGreen
  color: $white
  text-align: center
  padding: 5px
  border-radius: 1em
  margin-left: 20px
  cursor: pointer
  @media screen and (max-width: 1200px)
    margin: auto
  &:hover
    color: black
    background-color: $somon

.branch
  text-align: center
  padding: 5px
  border-radius: 1em
  margin-left: 10px

.student
  text-align: center
  margin-left: 10px
  padding: 5px
  border-radius: 1em

.lessonCard
  //background-color: $ligthGreen
  padding: 36px
  margin: auto
  margin-top: 15px
  border-radius: 1em
  min-height: 200px
  @media screen and (max-width: 1200px)
    padding: 10px
    margin-bottom: 40px
    display: flex
    flex-direction: column

.changeHours
    bottom:0
    right: 0
    height: 100%
    overflow: auto
    width: 100%
    position: absolute
    z-index: 3
    background-color: white
    @media screen and (max-width: 1200px)
      bottom: 0
      left: 0
      height: 100%

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
.aboutDay
  background-color: $darkGreen
  color: $white
  text-align: center
  padding: 5px



.linePhoto
  position: relative
  z-index: 1
  margin-top: -48px
  margin-left: -48px
  height: 48px
  width: 48px
  border-radius: 50%
  transition: all 0.5s ease
  @media screen and (max-width: 1200px)
    margin: 0px
    z-index: 2
    margin-bottom: -40px
  & img
      height: 48px
      width: 48px
      border-radius: 50%
      transition: all 0.5s ease

.backgroundPhotoOverlay
  position: fixed
  z-index: -1
  width: 100%
  height: 100%
  top: 0
  left: 0
  background-color: rgba(252, 252, 252, 0.8)

.backgroundPhoto
  position: fixed
  z-index: -2
  width: 100%
  border-radius: 50%
  transition: all 0.5s ease
  top: 0
  left: 0
  & img
      width:100%
      transition: all 0.5s ease
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

@mixin box-shadow($shad)
  -webkit-box-shadow: $shad
  -moz-box-shadow: $shad
  box-shadow: $shad

@mixin transition($transition)
  -moz-transition:    $transition
  -o-transition:      $transition
  -webkit-transition: $transition
  transition:         $transition



.rounded-checkbox
  $heigth: 22px

  display: flex
  flex-wrap: wrap
  gap: 12px
  padding: 3px
  border-radius: $heigth
  input[type="checkbox"]
    display: none
    &:checked + .rounded-checkbox__outer
      background-color: green
      .rounded-checkbox__inner
        left: 38%



  &__outer
    width: $heigth*2
    height: $heigth
    border-radius: $heigth
    background-color: #f67676
    display: block
    @include box-shadow(inset 0 0 10px rgba(#000, 0.4))
    position: relative
    @include transition(background-color 0.3s)

  &__inner
    position: absolute
    left: 2%
    top: 4%
    height: 92%
    width: 60%
    background-color: #efedea
    border-radius: $heigth
    @include transition(left 0.3s)
    @include box-shadow(inset 0 -1px 2px rgba(#000, 0.4))
</style>
