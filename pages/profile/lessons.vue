<template lang="pug">
div
  p {{dateOfDay}} {{dayNames[day]}}
  div(v-for="lesson in lessons" v-show="lesson.branch != undefined && lesson.branch != null") {{ lesson.hour}} {{ lessonsBranches}}

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
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
      lessonsGroups: [],
      lessonsBranches: [],
      turkDays: [6, 0, 1, 2, 3, 4, 5],
      hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", ],
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
    ...mapGetters("users", ["getMyPurchase", "getMyPayment"]),
    ...mapActions("users", ["getMyPurchases", "getMyPayments"]),
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
      const now = new Date();
      this.day = this.turkDays[now.getDay()];
      this.dateOfDay =
        now.getDate() +
        " " +
        this.turkMonths[now.getMonth()] +
        " " +
        now.getFullYear();
    },
    getTodayLessons: async function() {
      try {
        await axios
          .post(`${process.env.OUR_HOST}/getTeacherToday`, {
            teacher: this.userId(),
            day: this.day
          })
          .then(res => {
            for (const index in res.data) {
              this.lessons = res.data
              console.log(res.data[index].branch);
              this.$set(this.lessonsBranches, index, res.data[index].branch);
              this.$set(this.lessonsStudents, index, res.data[index].student);
              this.$set(this.lessonsGroups, index, res.data[index].group);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {},
  mounted() {
    this.setDates()
    this.getTodayLessons()
  }
};

// Developer Tricks For Eysa
// Hi Babe!
/*
      There are some standards in variable naming
      This makes it easy for multiple developers
      to work on projects.
      Btw i miss you a 1/8 byte ( 8 bit = 1 byte)
      */
//lets start
// firs example is the most popular naming style "camelCase"
// whole words start capital size except first word: eysaLovesFatih (iPhone, eBay)
// The second one is "PascalSize", whole words start capital size: EysaLovesFatih
// The horrible one is "snake_case" :o . this is incluedes underscores between words: eysa_loves_fatih
// And the last and tasty one is "kebab-case". Looks like kebab no need description: eysa-loves-fatih
// thats all! iLoveYouSoMuchMyLove
</script>

<style lang="sass" scoped>


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
