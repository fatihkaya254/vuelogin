<template lang="pug">
.tearcherCards
  .maincard
    .teacherCard()
      .cardHead
        .profilePhoto
          img(:src=" ourhost + photo" v-show="photo != ''")
          img(src="../assets/basic-profile.png" v-show="photo == ''")
      .infoes
        p {{ name }} {{ surname }}
      .getLesson
        | Özel Ders Al
    .schedule
      .days(v-for="(n, day) in 7")
        p {{days[day]}}
        .row(v-for="(n, hour) in 24" @click="" v-show="teachersLessons()[day+'-'+hour] == 2")  {{hours[hour]}}
  .teacherLine
    div(v-for="teacher in teacher()" @click="lockTeacher(teacher._id)"  :class="[(teacher._id == id) ? 'linePhotoSelected' : 'linePhoto', 'linePhoto']")
      img(:src=" ourhost + teacher.profilePic" v-show="teacher.profilePic")
      img(src="../assets/basic-profile.png" v-show="photo == ''")

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  async mounted() {
    await this.getTeachers();
    this.lockTeacher(0);
  },
  data() {
    return {
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
      selectedGrade: ""
    };
  },
  methods: {
    ...mapGetters("users", ["teacher", "teachersLessons"]),
    ...mapActions("users", [
      "getTeachers",
      "addTeacherLessons",
      "getTeachersLessons"
    ]),
    lockTeacher: function(who) {
      if (who == 0) {
        var myTeacher = this.teacher()[Object.keys(this.teacher())[who]];
      } else {
        var myTeacher = this.teacher()[who];
      }
      this.id = myTeacher._id;
      this.name = myTeacher.name;
      this.surname = myTeacher.surname;
      if (myTeacher.profilePic) this.photo = myTeacher.profilePic;
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

.tearcherCards
  align-items: center
  justify-content: center
  min-height: 75vh
  line-height: 1.5
  font-family: "Lato"
  -webkit-font-smoothing: antialiased
  display: flex
  flex-direction: column
.teacherCard
  height: 100%
  width: 20%
  overflow: auto
  position: absolute

.schedule
  height: 100%
  width: 80%
  float: right
  display: flex
  flex-direction: row


.days
    height: 100%
    width: 100%
    margin-left: 5px
    text-align: center
    padding: 10px

.maincard
  height: 400px
  width: 60%
  border: 1px solid black
  position: relative
  border-radius: 1em

.cardHead
  height: 120px
  width: 100%


.profilePhoto
    height: 102px
    width: 102px
    border-radius: 50%
    margin: auto

    & img
        margin-top: 70px
        height: 102px
        width: 102px
        border-radius: 50%

.linePhoto
    height: 60px
    width: 60px
    border-radius: 50%
    margin: auto
    transition: all 0.5s ease
    & img
        height: 60px
        width: 60px
        border-radius: 50%
        transition: all 0.5s ease

.linePhotoSelected
    height:72px
    width: 72px
    border-radius: 50%
    margin: auto
    transition: all 0.5s ease
    & img
        height: 72px
        width: 72px
        border-radius: 50%
        transition: all 0.5s ease
.infoes
    color: black
    margin-top: 70px
    text-align: center

.getLesson
    padding-top: 14px
    height: 48px
    width: 100%
    position: absolute
    bottom: 0
    text-align: center
    cursor: pointer

.teacherLine
    height: 80px
    margin-top: 28px
    width: 60%
    display: flex

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
