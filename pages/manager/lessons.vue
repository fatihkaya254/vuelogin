<template lang="pug">
.container
    .students
        .names(v-for="lesson in studentLessons" v-show="isExist(lesson.branch)") 
            p(v-if="lesson.student") {{lesson.student.name}} {{lesson.student.surname}}
            p(v-if="lesson.student") {{lesson.packageName}} 
            .lessons(v-for="branch in lesson.branch" @click="getBranchLessons(branch._id, lesson.student._id)")
                | {{branch.grade.gradeName}} {{branch.branchName}}
    .schedule
      .options
        input(type="text" v-model="opDay"  placeholder="Salı ✔ 1 ✔ salı x")
        input(type="text" v-model="opTeacher" placeholder="Esra ✔ Uçar ✔ Esra Uçar x esra x uçar x")
      .column  
        .row(v-for="lesson in lessonTeachers" v-show="lesson.status != 0 && (days[lesson.day] == opDay || opDay =='' || lesson.day == opDay) && (lesson.teacher.name == opTeacher || opTeacher =='' || lesson.teacher.surname == opTeacher)" )
          .infoes(@click="setLesson(lesson._id)")
            .lessonInfo {{lesson.status}} {{days[lesson.day]}} {{hours[lesson.hour]}} {{lesson.teacher.name}} {{lesson.teacher.surname}} 
            .linePhoto
              img(:src="lesson.teacher.profilePic" v-show="lesson.teacher.profilePic")
              img(src="../../assets/basic-profile.png" v-show="!lesson.teacher.profilePic")
          .infoes(v-if="lesson.student != undefined && lesson.student != null" :style="{ color: warnings[lesson._id] }")
            .lessonInfo  {{lesson.branch.grade.gradeName}} {{lesson.branch.branchName}} {{lesson.student.name}} {{lesson.student.surname}} 
            .linePhoto
              img(:src="lesson.student.profilePic" v-show="lesson.student.profilePic" @click="emptyLesson(lesson._id)")
              img(src="../../assets/basic-profile.png" v-show="!lesson.student.profilePic" @click="emptyLesson(lesson._id)")
          .infoes(v-if="lesson.group != undefined && lesson.group != null")
            .lessonInfo  {{lesson.branch.grade.gradeName}} {{lesson.branch.branchName}} {{lesson.group.groupName}}
            .linePhoto
              img(src="../../assets/basic-profile.png" @click="emptyLesson(lesson._id)")
</template>

<script>

import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      opDay: "",
      opTeacher: "",
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
      selectedGrade: "",
      studentLessons: [],
      settedStudentLessons: {},
      lessonTeachers: {},
      warnings: {}
    };
  },
  async mounted() {
    await this.getBranchLessons(undefined, undefined);
    await this.getAllLessons();
    await this.getAllSettedLessons();
  },
  methods: {
    ...mapActions("branches", ["getBranches"]),
    ...mapGetters("branches", ["branch"]),
    getAllLessons: async function() {
      try {
        await this.$axios.get(`${process.env.OUR_HOST}/studentLessons`).then(res => {
          this.studentLessons = res.data;
          console.log("res.data");
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getAllSettedLessons: async function() {
      try {
        await this.$axios 
          .get(`${process.env.OUR_HOST}/allStudentLessons`)
          .then(res => {
            this.settedStudentLessons = res.data;
          })
          .then(() => {
            for (const collector in this.settedStudentLessons) {
              var judge = this.removeRigth(
                this.settedStudentLessons[collector].student,
                this.settedStudentLessons[collector].branch
              );
              this.warnings[collector] = judge;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    isExist: function(a){
      if (a.length == 0) {
        return false
      } else {
        return true
      }
    },
    removeRigth: function(student, branch) {
      console.log(student + " " + branch);
      for (const lesson in this.studentLessons) {
        if (this.studentLessons[lesson].student._id == student) {
          for (const branches in this.studentLessons[lesson].branch) {
            if (this.studentLessons[lesson].branch[branches]._id == branch) {
              Vue.delete(this.studentLessons[lesson].branch, branches);
              console.log(this.studentLessons);
              return "green";
            }
          }
        }
      }
      return "red";
    },
    getBranchLessons: async function(branchId, studentId) {
      if (branchId == undefined) {
        try {
          await this.$axios 
            .post(`${process.env.OUR_HOST}/wholeBranchLessons`, {})
            .then(res => {
              console.log(res.data);
              for (const index in res.data) {
                Vue.set(this.lessonTeachers, index, res.data[index]);
              }
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.selectedBranch = branchId;
        this.student = studentId;
        this.lessonTeachers = {};
        this.lessonStatus = {};
        try {
          await this.$axios 
            .post(`${process.env.OUR_HOST}/branchLessons`, {
              branch: branchId
            })
            .then(res => {
              console.log(res.data);
              for (const index in res.data) {
                Vue.set(this.lessonTeachers, index, res.data[index]);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    setLesson: function(lessonId) {
      var branch = this.selectedBranch;
      var id = lessonId;
      var student = this.student;
      this.changeLesson({ id, branch, student });
      this.removeRigth(student, branch);
      this.selectedBranch = "";
      this.student = "";
    },
    emptyLesson: async function(lessonId) {
      var branch = undefined;
      var id = lessonId;
      var student = undefined;
      await this.changeLesson({ id, branch, student });
      await this.getAllLessons();
      await this.getAllSettedLessons();
    },
    changeLesson: async function(changes) {
      console.log("chang");
      console.log(changes);
      try {
        await this.$axios 
          .put(`${process.env.OUR_HOST}/updateLesson`, changes)
          .then(res => {
            Vue.set(this.lessonTeachers, res.data._id, res.data);
            console.log("res");
            console.log(res);
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
.options
    display: flex
    flex-direction: row
    gap: 20px
    width: 100%
    padding: 12px
    input
      width: 100%
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
    width: 40%
    overflow: auto
    display: flex
    flex-direction: column

.lessons
    height: 30px
    margin-top: 8px
    border-left: 0.75px solid black
    padding: 4px
    transition: all 0.5s ease
    color: purple
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

::-webkit-input-placeholder 
  font-size: 8pt

::-moz-placeholder 
  font-size: 8pt

:-ms-input-placeholder 
  font-size: 8pt

::placeholder 
  font-size: 8pt

</style>
