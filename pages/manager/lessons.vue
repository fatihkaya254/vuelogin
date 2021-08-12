<template lang="pug">
.container
    .students
        .names(v-for="lesson in studentLessons")
            p {{lesson.student.name}} {{lesson.student.surname}}
            p {{lesson.packageName}}
            .lessons(v-for="branch in lesson.branch" @click="getBranchLessons(branch._id)")
                | {{branch.grade.gradeName}} {{branch.branchName}}
    .schedule
        .column(v-for="(n, day) in 7") {{days[day]}}
          .row(v-for="(n, hour) in 24" v-show="branchLessons[day+"-"+hour] == 2") {{branchLessons[day+"-"+hour]}}

</template>

<script>
import axios from "axios";
import Vue from 'vue'
import { mapActions, mapGetters } from "vuex";
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
      branchLessons: {}
    };
  },
  mounted() {
    this.getAllLessons();
  },
  methods: {
    ...mapActions("users", ["addUser"]),
    ...mapGetters("students", ["grade", "schoolCourse"]),
    getAllLessons: async function() {
      try {
        await axios.get(`${process.env.OUR_HOST}/studentLessons`).then(res => {
          this.studentLessons = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    getBranchLessons: async function(branchId) {
      try {
        await axios
          .post(`${process.env.OUR_HOST}/branchLessons`, {
            branch: branchId
          })
          .then(res => {
            this.branchLessons = {}
            for (const property in res.data) {
              Vue.set( this.branchLessons, property,  res.data[property].status);
            }
            console.log(this.branchLessons);
          });
      } catch (error) {
        console.log(error);
      }
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
    height: 60vh
    overflow: auto
    display: flex
    flex-direction: row

.lessons
    height: 30px
    margin-top: 8px
    border-left: 0.75px solid black
    padding: 4px

.column
    height: 80%
    width: 12%
    margin: 1%
    text-align: center
    float: left
    position: relative
    overflow: auto
    padding-bottom: 16px
    padding-top: 16px
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
