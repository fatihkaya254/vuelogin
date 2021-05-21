<template lang="pug">
div
    .reformative(:style="{top: top + 'px' , left: left + 'px'}" v-show="popup" )
      .close(@click="popup=false") x
      .form 
        input(type="text" v-model="subjectName" v-on:keyup.13="updateSubject")
    h4 Konular
    .listContainer
        ul
          li( v-for="grade in grade()" )
            .accordionCover
              div(@click="openClose(grade._id)" :class="[collapseGrade[grade._id] ? 'accordionTittle accordionTittleOpen' : 'accordionTittle']")
                | {{ grade.gradeName }} 
              .accordionContent(v-show="collapseGrade[grade._id]")
                    li( v-for="branch in branch()" v-if="branch.grade == grade._id")
                        .refresh(@click="refreshList(branch._id)")
                          span R
                        .card
                           | ·{{ branch.branchName }}
                        .accordionContent
                          ul
                            li( v-for="subject in subject()" v-if="subject.branch == branch._id")
                                .card(@click="move($event, subject._id)")
                                   | &nbsp;&nbsp;&nbsp;{{ subject.subjectOrder }} - {{ subject.subjectName }}  
                            li &nbsp;&nbsp;&nbsp;{{ getSubjectOrder(branch._id) }} - 
                                input(type="text" v-model="name" v-on:keyup.13="throwAddSubject(branch._id)")
                            
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      popup: false,
      subjectName: "",
      changingId: "0",
      id: null,
      name: "",
      gradeId: "",
      top: 0,
      left: 0,
      collapseGrade: []
    };
  },
  methods: {
    ...mapActions("branches", [
      "getBranches",
      "addBranch",
      "changeBranchInfo",
      "deleteBranch",
      "getSubjects",
      "addSubject",
      "changeSubjectInfo",
      "deleteSubject"
    ]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("branches", ["branch", "subject"]),
    throwAddSubject: function(branchId) {
      let order = this.getSubjectOrder(branchId);
      this.addSubject({
        subjectName: this.name,
        branch: branchId,
        subjectOrder: order
      });
      this.name = "";
    },
    hookSubject: function(id) {
      this.id = this.$store.state.users.role[id]._id;
      this.name = this.$store.state.users.role[id].roleName;
      this.descripton = this.$store.state.users.role[id].roleDescripton;
    },
    updateSubject: function() {
      if (this.subjectName == "") {
        this.deleteSubject(this.changingId);
        this.popup = false;
      } else {
        this.changeSubjectInfo({
          id: this.changingId,
          value: this.subjectName,
          where: "subjectName"
        });
      }
    },
    gradeName: function(id) {
      if (
        this.$store.state.students.grade[id] != null ||
        this.$store.state.students.grade[id] != undefined
      ) {
        return this.$store.state.students.grade[id].gradeName;
      } else {
        return "Rol Yok";
      }
    },
    move: function(event, id) {
      this.top = event.pageY - 20;
      this.left = event.pageX - 160;
      this.popup = true;
      this.subjectName = this.subject()[id].subjectName;
      this.changingId = id;
    },
    collapseGrades: function(grades) {
      for (var grade in grades) {
        this.collapseGrade[grade] = false;
      }
    },
    openClose: function(id) {
      this.$set(this.collapseGrade, id, !this.collapseGrade[id]);
    },
    getSubjectOrder: function(branchId) {
      var subject = this.subject();
      var order = 1;
      for (var element in subject) {
        if (subject[element].branch == branchId) {
          order = subject[element].subjectOrder + 1;
        }
      }
      return order;
    },
    refreshList: function(branchId) {
      var subject = this.subject();
      let index = 1;
      for (var element in subject) {
        if (subject[element].branch == branchId) {
          if (index != subject[element].subjectOrder) {
            console.log(
              "index: " +
                index +
                " order: " +
                subject[element].subjectOrder +
                " id: " +
                element +
                " name: " +
                subject[element].subjectName
            );
            this.changeSubjectInfo({
              id: element,
              value: index,
              where: "subjectOrder"
            });
          }
          index++;
        }
      }
    }
  },
  created() {
    this.getSubjects();
    this.getBranches();
    this.getGrades()
      .then(() => {
        var grades = this.grade();
      })
      .then(grades => {
        this.collapseGrades(grades);
      });
  }
};
</script>

<style lang="sass" scoped>
$red : #D95F69
$softRed : #d0ded3
$green : #3EB595
ul
    list-style-type: none
.card
  cursor: pointer
  & input[type=text]
    -webkit-appearance: none
    background-color: red

.refresh
  border: 1px solid black
  border-radius: 50%
  width: 20px
  height: 20px
  line-height: 18px
  text-align: center
  font-size: 9pt
  font-weight: bold
  position: absolute
  margin-top: 28px
  margin-left: 8px
  z-index: 1
  cursor: pointer

.reformative
    height: 200px
    width: 200px
    background-color: white
    position: absolute
    z-index: 1

.close
    height: 18px
    width: 18px
    line-height: 12px
    font-size: 9pt
    border-radius: 50%
    background-color: $red
    position: relative
    z-index: 1
    float: right
    margin: 2px
    color: white
    padding: 2px
    text-align: center
    cursor: pointer

.listContainer
    margin-top: 50px
    overflow: auto
    width: 400px
    height: 600px
    float: left
    margin: 20px
    padding: 10px
.updateUser
    float: left
    margin: 20px
    padding: 10px
.accordionTittle
    background-color: $red
    cursor: pointer
    padding: 5px
    user-select: none

.accordionTittleOpen
    background-color: $green

.accordionContent
    background-color: $softRed
    padding: 5px
    user-select: none
    & li
      border-bottom: 1px solid white
</style>
