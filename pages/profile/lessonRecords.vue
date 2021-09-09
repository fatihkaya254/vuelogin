<template lang="pug">
.records 
    .infoLine(v-for="sc in mySchedule")
      label {{fixDate(sc.recordDate)}}
      label {{ dayNames[sc.day] }} {{ hours[sc.hour] }} Branş: {{ sc.branch.branchName }} Öğretmen: {{ sc.teacher.name }} {{ sc.teacher.surname }} Konular:
      label(v-for="ss in sc.subTopics") {{ ss.subTopicName}},
      p Ödev: {{ sc.homework}} Ödev Yapılma Durumu: {{homeworkStatus[sc.homeworkStatus]}}
    .infoLine
    .infoLine
    .infoLine
    .infoLine
    .infoLine
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      homeworkStatus: ["", "Yapılmadı", "Eksik", "Tam"],
      file: "",
      name: "",
      surname: "",
      phone: "",
      grade: "",
      code: "",
      mySchedule: [],
      dayNames: [
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
      ]
    };
  },
  methods: {
    ...mapGetters("users", ["getGenerated", "getChangeNumberMessage"]),
    ...mapActions("users", ["changeUserInfo", "changePhoneCheck"]),
    ...mapActions(["refreshUser"]),
    ...mapGetters([
      "userName",
      "userId",
      "userSurname",
      "userPhone",
      "userEmail",
      "userBirthDay",
      "userImage",
      "userBirthDayForInput",
      "userGoogleId",
      "isGoogleConnected"
    ]),
    getStudentSchedule: async function(student) {
      console.log(student);
      await this.$axios
        .post(`${process.env.OUR_HOST}/getStudentRecord`, {
          student
        })
        .then(res => {
          this.mySchedule = res.data;
        });
    },
    fixDate: function(rdate) {
      let datetime = rdate
      let date = datetime.split("-");
      let year = date[0];
      let month = date[1];
      let day = date[2].charAt(0) + date[2].charAt(1);
      return day + "." + month + "." + year;
    }
  },
  mounted() {
    this.getStudentSchedule(this.userId());
  }
};
</script>

<style lang="sass" scoped>
$gray: rgb(142, 142, 147, 0.70)
$gray2: rgb(174, 174, 178, 0.70)
$gray6: rgb(242, 242, 247, 0.70)
$gray6-dark: rgb(28, 28, 30)

.records
    height: 70vh
    overflow: auto

.adminheader
    background-color: $gray
    height: 70px
    width: 100%
.adminDashboard
    height: 100vh
    width: 100vw
    background-color: $gray
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    transform-style: preserve-3d

.outAuth
  height: 40px
  width: 200px
  margin-top: 5%
  font-family: 'Open Sans', sans-serif
  font-weight: 700
  letter-spacing: 1px
  font-size: 9pt
  background-color: black
  color: white
  border: 2px solid black
  border-radius: 1em
  transition: all .1s ease
  padding: 1px 2px
  &:focus
    outline: 0px
    &:hover
      cursor: pointer
      transform: scale(0.95)


.infoLine
  margin-top: 10px
  padding-top: 8px
  min-height: 40px
  border-bottom: 0.75px solid $gray

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

    &:focus
      -webkit-appearance: none



    &[type="submit"]
      background-color: black
      color: white

      &:hover
        cursor: pointer
</style>
