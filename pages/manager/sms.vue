<template lang="pug">
.container
    .schedule
      .column  
        .row(v-for="s in sms")
          .infoes
            .lessonInfo {{s.sms}} 

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
      adress: "",
      email: "",
      mainBranch: "",
      ourhost: process.env.OUR_URL,
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
    await this.getAll()
    var phones = {}
    for (const i in this.sms) {
      var student = this.sms[i].student;
      for (const j in this.parent) {
        if (this.parent[j].student != undefined) {
          if (student == this.parent[j].student._id) {
            var phone = this.parent[j].parent.phone
            phones[phone] = phone
            this.warnings[student] = phones
            console.log(this.warnings);
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
    }
  },
  watch: {}
};
</script>

<style lang="sass" scoped>

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
