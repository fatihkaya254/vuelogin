<template lang="pug">
.container
    .students
        .row(v-for="groups in group()")
          .infoes 
            .lessonInfo {{groups.groupName}} 
          .infoes(v-for="branch in branch()" v-show="branch.grade._id == groups.grade")
            .lessonInfoL(@click="setGroup(groups._id, branch._id)") {{branch.grade.gradeName}}  {{branch.branchName}}
          .infoes(v-for="student in groups.student" @click="removeStu(groups._id, student)")
            .lessonInfo(style="color: #88B0BF") {{students[student]}}
    .schedule
      .column  
        .row(v-for="lesson in lessonTeachers" v-show="lesson.status != 0" :style="{ backgroundColor: colorsofhour[lesson.hour % 2] }")
          .infoes(@click="setLesson(lesson._id)")
            .lessonInfo {{lesson.status}} {{days[lesson.day]}} {{hours[lesson.hour]}} {{lesson.teacher.name}} {{lesson.teacher.surname}} 
            .linePhoto
              img(:src=" ourhost + lesson.teacher.profilePic" v-show="lesson.teacher.profilePic")
          .infoes(v-if="lesson.student != undefined && lesson.student != null" :style="{ color: warnings[lesson._id] }")
            .lessonInfo  {{lesson.branch.grade.gradeName}} {{lesson.branch.branchName}} {{lesson.student.name}} {{lesson.student.surname}} 
            .linePhoto
              img(:src=" ourhost + lesson.student.profilePic" v-show="lesson.student.profilePic" @click="emptyLesson(lesson._id)")
          .infoes(v-if="lesson.group != undefined && lesson.group != null")
            .lessonInfo  {{lesson.branch.grade.gradeName}} {{lesson.branch.branchName}} {{lesson.group.groupName}}
            .linePhoto
              img(@click="emptyLesson(lesson._id)")
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      colors: ["white", "#ffbd44", "#00ca4e"],
      colorsofhour: ["#F7F3F0", "#EAE4F2"],
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
      mygroup: "",
      phoneLength: 11,
      surname: "",
      phone: "",
      date: "",
      photo: "",
      adress: "",
      email: "",
      addingGroup: "",
      addingBranch: "",
      mainBranch: "",
      ourhost: process.env.OUR_URL,
      selectedGrade: "",
      studentLessons: [],
      students: [],
      settedStudentLessons: {},
      lessonTeachers: {},
      warnings: {}
    };
  },
  async mounted() {
    await this.getBranchLessons(undefined, undefined);
    await this.getAllLessons();
    await this.getAllSettedLessons();
    await this.getGroups();
    await this.getRights();
    await this.getGrades();
    await this.getBranches();
  },
  methods: {
    ...mapActions("branches", ["getBranches"]),
    ...mapGetters("branches", ["branch"]),
    ...mapActions("students", ["getGrades", "getGroups"]),
    ...mapGetters("students", ["grade", "group"]),
    setGroup: function (group, branch) {
      this.addingGroup = group
      this.addingBranch = branch
    },
    getAllLessons: async function() {
      try {
        await axios.get(`${process.env.OUR_HOST}/studentLessons`).then(res => {
          this.studentLessons = res.data;
          console.log("res.data");
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getRights: async function() {
      try {
        await axios.get(`${process.env.OUR_HOST}/groupRights`).then(res => {
          this.groupRights = res.data;
        });
      } catch (error) {
        console.log(error);
      }
      for (const right in this.groupRights) {
        Vue.set(
          this.students,
          this.groupRights[right].student._id,
          this.groupRights[right].student.name +
            " " +
            this.groupRights[right].student.surname
        );
      }
    },
    getAllSettedLessons: async function() {
      try {
        await axios
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
          await axios
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
          await axios
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
      var branch = this.addingBranch;
      var id = lessonId;
      var group = this.addingGroup;
      this.changeLesson({ id, branch, group });
      this.addingGroup = "";
      this.addingBranch = "";
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
        await axios
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

.lessonInfoL
    width: 70%
    cursor: pointer
    &:hover
        font-weight: 700
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
