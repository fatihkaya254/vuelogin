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
      .changeRecord(@click="clickOnLesson(lesson._id)") Düzenle

  .changeHours(v-show="id != ''")
    .close(@click="close()")
    .topBar 
      .branch {{ lessonsBranches[id] }}
      .student {{ lessonsStudents[id] }} {{ lessonsGroups[id] }}
      .backgroundPhotoOverlay
      .backgroundPhoto
        img(:src=" ourhost + lessonsPhotos[id]" v-show="lessonsPhotos[id]")
    .subTopics
      .subjectName(v-for="(topic, index) in this.branchProcess[braid]") {{branchSubjects[index].subjectName}}
        div( v-for="subtopic in topic" )
          label(:for="subtopic._id" class="rounded-checkbox") 
            input(type="checkbox" :id="subtopic._id" :value="subtopic._id" v-model="recordSubtopics" ) 
            span(class="rounded-checkbox__outer")
              span(class="rounded-checkbox__inner")
            p {{subtopic.subTopicName}}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      profilePop: false,
      studentPhone: "",
      id: "",
      braid: "",
      studentMail: "",
      studentBirthDate: "",
      studentPhoto: "",
      file: "",
      name: "",
      day: "",
      lessons: {},
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
      "isTeacher",
      "userBranch"
    ]),
    close: function () {
      this.recordSubtopics =[]
      this.id = ""
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
      this.getLessonRecords();
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
          branch : this.userBranch()
        })
        .then(res => {
          this.branchProcess = res.data.branchMap;
          this.branchSubjects = res.data.subjectMap;
          this.branchSubTopics = res.data.branchSubtopics;
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
    },
    clickOnLesson: function(lesson) {
      if (this.findMyRecord(lesson)) {
        this.id = lesson
        this.braid = this.lessonsBranchId[lesson]
        console.log(this.id);
      } else {
        this.addLessonRecord(lesson)
      }
    }
  },
  watch: {},
  async mounted() {
    this.setDates();
    await this.getTeachersDaily({ teacher: this.teacher, day: this.day });
    this.getLessonRecords();
    this.dealCards();
    this.getSubTopics()
  }
  // v-if="lessonRecords[findMyRecord(lesson._id)] == undefined"
};
</script>

<style lang="sass" scoped>
$darkGreen: #5F9595
$somon: #FFB6A3
$white: #F7F3F0
$greenBlue: #AAB8BB
$ligthGreen: #C4D7D1

.subTopics
  margin: 20px
  height: 300px
  overflow: auto
  border: 0.5px solid black
  border-radius: 1em

.subjectName
  margin: 15px

.lessonInfoes
  display: flex
  flex-direction: row

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
  background-color: $ligthGreen
  padding: 36px
  margin: auto
  margin-top: 15px
  border-radius: 1em
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
