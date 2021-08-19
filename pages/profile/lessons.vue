<template lang="pug">
div
  .aboutDay {{dateOfDay}} {{dayNames[day]}}
  .lessonCard(v-for="lesson in teachersDaily()" v-show="lesson.branch != undefined && lesson.branch != null") 
    .linePhoto
      img(:src=" ourhost + lessonsPhotos[lesson._id]" v-show="lessonsPhotos[lesson._id]")
    .lessonInfoes
      .clock {{ hours[lesson.hour] }} 
      .branch {{ lessonsBranches[lesson._id] }}
      .student {{ lessonsStudents[lesson._id] }} {{ lessonsGroups[lesson._id] }}
    input(type="submit" @click="addLessonRecord(lesson._id)" v-if="lessonRecords[findMyRecord(lesson._id)] == undefined") 

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      profilePop: false,
      studentPhone: "",
      studentMail: "",
      studentBirthDate: "",
      studentPhoto: "",
      file: "",
      name: "",
      day: "",
      lessons: {},
      lessonsStudents: [],
      lessonsStudentId: [],
      lessonsGroupId: [],
      lessonsPhotos: [],
      lessonsGroups: [],
      lessonsBranches: [],
      lessonRecords: [],
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
      ourhost: process.env.OUR_URL
    };
  },
  methods: {
    ...mapGetters("users", ["getMyPurchase", "getMyPayment", "teachersDaily"]),
    ...mapActions("users", [
      "getMyPurchases",
      "getMyPayments",
      "getTeachersDaily"
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
      "isTeacher"
    ]),
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
      record.teacher = this.teacher;
      record.student = this.lessonsStudentId[lesson];
      if (this.lessonsGroupId[lesson] != undefined)
        record.group = this.lessonsGroupId[lesson];
      var month = now.getMonth() + 1;
      record.recordDate = now.getFullYear() + "-" + month + "-" + now.getDate();
      console.log(record);
      this.$axios
        .post(`${process.env.OUR_HOST}/addLessonRecord`, {
          lessonRecord: record
        })
        .then(res => {
          console.log(res);
        });
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
            this.teachersDaily()[index].student.groupName
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
    }
  },
  watch: {},
  async mounted() {
    this.setDates();
    await this.getTeachersDaily({ teacher: this.teacher, day: this.day });
    this.getLessonRecords();
    this.dealCards();
  }
};
</script>

<style lang="sass" scoped>
$darkGreen: #5F9595
$somon: #FFB6A3
$white: #F7F3F0
$greenBlue: #AAB8BB
$ligthGreen: #C4D7D1

.lessonInfoes
  display: flex
  flex-direction: row

.clock
  background-color: $darkGreen
  color: $white
  text-align: center
  padding: 5px
  border-radius: 1em

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
  background-color: $ligthGreen
  padding: 36px
  margin: auto
  margin-top: 15px
  border-radius: 1em

.aboutDay
  background-color: $darkGreen
  color: $white
  text-align: center
  padding: 5px

.linePhoto
  position: fixed
  z-index: 1
  margin-top: -48px
  margin-left: -48px
  height: 48px
  width: 48px
  border-radius: 50%
  transition: all 0.5s ease
  & img
      height: 48px
      width: 48px
      border-radius: 50%
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
</style>
