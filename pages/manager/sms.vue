<template lang="pug">
.container
    p Bakiye: {{balance}} sms
    .schedule
      .column  
        .row(v-for="s in sms" :style="{backgroundColor: colors[s.smsApp]}")
          .infoes
            .lessonInfo {{s.sms}} 
            .lessonInfo(v-if="s.smsApp == 1") 
              p(v-for="number in warnings[s.student]") {{number}} {{whois[number]}}
              .changeRecord(@click="sendSms(s)") Gönder
            .lessonInfo(v-if="s.smsApp == 1") 
              .changeRecord(@click="cancel(s._id)") İptal Et
</template>

<script>
export default {
  data() {
    return {
      colors: ["white", "#ffbd44", "#00ca4e"],
      selectedBranch: "none",
      selectedGrade: "none",
      name: "",
      id: "",
      balance: "",
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
      selectedBranch: "",
      student: "",
      phoneLength: 11,
      surname: "",
      phone: "",
      date: "",
      photo: "",
      whois: {},
      adress: "",
      email: "",
      mainBranch: "",
      selectedGrade: "",
      studentLessons: [],
      settedStudentLessons: {},
      lessonTeachers: {},
      warnings: {},
      sms: {},
      parent: {}
    };
  },
  async mounted() {
    await this.$axios.get(`${process.env.OUR_HOST}/smsBalance`).then(res => {
      this.balance = res.data.sms;
    });
    await this.getAll();
    var phones = {};
    for (const i in this.sms) {
      var student = this.sms[i].student;
      var phones = {};
      for (const j in this.parent) {
        if (this.parent[j].student != undefined) {
          if (student == this.parent[j].student._id) {
            var name =
              this.parent[j].parent.name + " " + this.parent[j].parent.surname;
            var phone = this.parent[j].parent.phone;
            await this.$set(phones, phone, phone);
            this.$set(this.warnings, student, phones);
            this.$set(this.whois, phone, name);
          }
        }
      }
    }
  },
  methods: {
    getAll: async function() {
      await this.$axios
        .get(`${process.env.OUR_HOST}/getParentship`)
        .then(res => {
          this.parent = res.data.todays;
        });
      await this.$axios
        .get(`${process.env.OUR_HOST}/getTodayRecord`)
        .then(res => {
          this.sms = res.data.todays;
        });
    },
    sendSms: async function(s) {
      if (s.smsApp == 1) {
        var dateTime = Date.now();
        var sms = s.sms;
        var student = s.student;
        for (const phone in this.warnings[student]) {
          console.log("sms: " + sms);
          console.log("number: " + phone);
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
        await this.getAll();
        var phones = {};
        for (const i in this.sms) {
          var student = this.sms[i].student;
          var phones = {};
          for (const j in this.parent) {
            if (this.parent[j].student != undefined) {
              if (student == this.parent[j].student._id) {
                var phone = this.parent[j].parent.phone;
                await this.$set(phones, phone, phone);
                this.$set(this.warnings, student, phones);
              }
            }
          }
        }
      }
    },
    cancel: async function(id) {
      await this.$axios
        .put(`${process.env.OUR_HOST}/updateLessonRecord`, {
          id,
          changes: { smsApp: "0" }
        })
        .then(res => {
          console.log(res);
        });
      await this.getAll();
      var phones = {};
      for (const i in this.sms) {
        var student = this.sms[i].student;
        var phones = {};
        for (const j in this.parent) {
          if (this.parent[j].student != undefined) {
            if (student == this.parent[j].student._id) {
              var phone = this.parent[j].parent.phone;
              await this.$set(phones, phone, phone);
              this.$set(this.warnings, student, phones);
            }
          }
        }
      }
    }
  },
  watch: {}
};
</script>

<style lang="sass" scoped>
$darkGreen: #5F9595
$somon: #FFB6A3
$white: #F7F3F0
$greenBlue: #AAB8BB
$ligthGreen: #C4D7D1
.container
    display: flex

.students
    width: 25%
    height: 60vh
    overflow: auto
    display: flex
    flex-direction: column

.names
    margin: 4px
    border-top: 0.75px solid black
    padding: 4px

.schedule
    height: 70vh
    width: 80%
    overflow: auto
    display: flex
    flex-direction: row

.lessons
    height: 30px
    margin-top: 8px
    border-left: 0.75px solid black
    padding: 4px
    transition: all 0.5s ease

.column
    height: 80%
    min-width: 400px
    width: 100%
    margin: 1%
    text-align: center
    float: left
    position: relative
    overflow: auto
    padding-bottom: 16px
    padding-top: 16px
.row
    width: 80%
    border-radius: 1em
    border: 1px solid black
    margin: auto
    margin-top: 16px
    font-size: 14px
    display: flex
    flex-direction: column
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

.infoes
    display: flex
    flex-direction: row
    margin: 8px
.linePhoto
    height: 24px
    width: 24px
    border-radius: 50%
    margin: auto
    & img
        background-color: #69788C
        height: 24px
        width: 24px
        border-radius: 50%
        cursor: pointer
        &:hover
            height: 28px
            width: 28px
.lessonInfo
    width: 70%

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
