<template lang="pug">
.container
    .students 
        .names(v-for="right in groupRights" @click="selectedStudent = right.student._id")
            p {{right.student.name}} {{right.student.surname}}
            p {{right.grade[0].gradeName}}
    .schedule
      .column  
        .row            
            .packageSubBranch()
                input(type="text" placeholder="Grup Adı" v-model="groupName")
                select(v-model="mygrade" )
                    option(value="") Sınıf
                    option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
                input(type="submit" value="ekle" @click="addGroup()")
        .row(v-for="groups in group()")
          .infoes(@click="addStu(groups._id)")
            .lessonInfo {{groups.groupName}} 
          .infoes(v-for="student in groups.student" @click="removeStu(groups._id, student)")
            .lessonInfo {{students[student]}}
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      colors: ["white", "#ffbd44", "#00ca4e"],
      selectedBranch: "none",
      selectedStudent: "",
      selectedGrade: "none",
      name: "",
      mygrade: "",
      groupName: "",
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
      students: [],
      groupRights: {},
      lessonTeachers: {},
      warnings: {}
    };
  },
  async mounted() {
    await this.getGrades();
    await this.getRights();
    await this.getGroups();
    this.judge();
  },
  methods: {
    ...mapActions("branches", ["getBranches"]),
    ...mapGetters("branches", ["branch"]),
    ...mapActions("students", ["getGrades", "getGroups"]),
    ...mapGetters("students", ["grade", "group"]),
    addStu: async function(group) {
      var groupStudents = [];
      for (const stuid in this.group()[group].student) {
        groupStudents.push(this.group()[group].student[stuid]);
      }
      if (this.selectedStudent != "") {
        groupStudents.push(this.selectedStudent);
        try {
          await this.$axios 
            .put(`${process.env.OUR_HOST}/addStudentToGroup`, {
              student: groupStudents,
              id: group
            })
            .then(res => {
              console.log(res.data);
            });
        } catch (error) {
          console.log(error);
        }
        await this.getGroups();
        this.judge();
      }
    },
    judge: function() {
      for (const gr in this.group()) {
        var students = this.group()[gr].student;
        for (const st in students) {
          this.$delete(this.groupRights, students[st]);
          console.log(students[st]);
        }
      }
    },
    removeStu: async function(group, student) {
      var groupStudents = [];
      for (const stuid in this.group()[group].student) {
        groupStudents.push(this.group()[group].student[stuid]);
      }
      const index = groupStudents.indexOf(student);
      console.log(index);
      if (index > -1) {
        groupStudents.splice(index, 1);
      }
      try {
        await this.$axios 
          .put(`${process.env.OUR_HOST}/addStudentToGroup`, {
            student: groupStudents,
            id: group
          })
          .then(res => {
            console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
      await this.getGroups();
      await this.getRights();
      this.judge();
    },
    addGroup: async function() {
      try {
        await this.$axios 
          .post(`${process.env.OUR_HOST}/addGroup`, {
            group: { groupName: this.groupName, grade: this.mygrade }
          })
          .then(res => {
            console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
      await this.getGroups();
    },
    getRights: async function() {
      try {
        await this.$axios .get(`${process.env.OUR_HOST}/groupRights`).then(res => {
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
      var branch = null;
      var id = lessonId;
      var student = null;
      await this.changeLesson({ id, branch, student });
      await this.getAllLessons();
      await this.getAllSettedLessons();
    },
    changeLesson: async function(changes) {
      try {
        await this.$axios 
          .put(`${process.env.OUR_HOST}/updateLesson`, changes)
          .then(res => {
            Vue.set(this.lessonTeachers, res.data._id, res.data);
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
    cursor: pointer
    &:hover
        font-weight: 700
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
    transition: all 0.5s ease
    & img
        height: 24px
        width: 24px
        border-radius: 50%
        transition: all 0.5s ease

.packageSubBranch
    width: 60%
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 11pt
    display: inline-grid
    margin: auto
    & select
        margin-bottom: 12px
        outline: none
        height: 27px
        text-align: center
        border: 1px solid black
        border-radius: 1em
        text-align-last: center
        max-width: 260px
        background-color: rgb(0, 0, 0,0)

        &:hover
            background-color: black
            color: white

    & input

        margin-bottom: 12px
        outline: none
        height: 27px
        text-align: center
        border: 1px solid black
        border-radius: 1em
        text-align-last: center
        max-width: 260px
        background-color: rgb(0, 0, 0,0)

        &:hover
            background-color: black
            color: white

.lessonInfo
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
