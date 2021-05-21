                                   | &nbsp;&nbsp;&nbsp;{{ subject.subjectOrder }} - {{ subject.subjectName }}  
<template lang="pug">
div
    .reformative(:style="{top: top + 'px' , left: left + 'px'}" v-show="popup" )
      .close(@click="popup=false") x
      .form 
        input(type="text" v-model="subTopicName" v-on:keyup.13="updateSubTopic")
    h4 Alt Konular
    .listContainer
        ul
          li( v-for="grade in grade()" )
            .accordionCover
              div(@click="openClose(grade._id)" :class="[collapseGrade[grade._id] ? 'accordionTittle accordionTittleOpen' : 'accordionTittle']")
                | {{ grade.gradeName }} 
              .accordionContent(v-show="collapseGrade[grade._id]")
                    li( v-for="branch in branch()" v-if="branch.grade == grade._id")
                        div(@click="openCloseBranch(branch._id)" :class="[collapseBranch[branch._id] ? 'accordionTittle accordionTittleOpen' : 'accordionTittle']")
                           | ·{{ branch.branchName }}
                        .accordionContent(v-show="collapseBranch[branch._id]")
                            li( v-for="subject in subject()" v-if="subject.branch == branch._id")
                                div(@click="openCloseSubject(subject._id)" :class="[collapseSubject[subject._id] ? 'accordionTittle accordionTittleOpen' : 'accordionTittle']")
                                  | &nbsp;&nbsp;&nbsp;{{ subject.subjectOrder }} - {{ subject.subjectName }}  
                                .accordionContent(v-show="collapseSubject[subject._id]")
                                    ul
                                      li( v-for="subTopic in subTopic()" v-if="subTopic.subject == subject._id")
                                        .card(@click="move($event, subTopic._id)")
                                         | &nbsp;&nbsp;&nbsp;{{ subTopic.subTopicOrder }} - {{ subTopic.subTopicName }}
                                      li &nbsp;&nbsp;&nbsp;{{ getSubTopicOrder(subject._id) }} - 
                                          input(type="text" v-model="name" v-on:keyup.13="throwAddSubTopic(subject._id)")
                            
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      popup: false,
      subTopicName: "",
      changingId: "0",
      id: null,
      name: "",
      gradeId: "",
      top: 0,
      left: 0,
      collapseGrade: [],
      collapseBranch: [],
      collapseSubject: [],
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
      "deleteSubject",
      "getSubTopics",
      "addSubTopic",
      "changeSubTopicInfo",
      "deleteSubTopic"
    ]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("branches", ["branch", "subject","subTopic"]),
    throwAddSubTopic: function(subjectId) {
      let order = this.getSubTopicOrder(subjectId);
      this.addSubTopic({
        subTopicName: this.name,
        subject: subjectId,
        subTopicOrder: order
      });
      this.name = "";
    },
   
    updateSubTopic: function() {
      if (this.subTopicName == "") {
        this.deleteSubTopic(this.changingId);
        this.popup = false;
      } else {
        this.changeSubTopicInfo({
          id: this.changingId,
          value: this.subTopicName,
          where: "subTopicName"
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
      this.subTopicName = this.subTopic()[id].subTopicName;
      this.changingId = id;
    },
    collapseGrades: function(grades) {
      for (var grade in grades) {
        this.collapseGrade[grade] = false;
      }
    },
    collapseBranches: function(branches) {
      for (var branch in branches) {
        this.collapseBranch[branch] = false;
      }
    },
    collapseSubjects: function(subjects) {
      for (var subject in subjects) {
        this.collapseSubject[subject] = false;
      }
    },
    openClose: function(id) {
      this.$set(this.collapseGrade, id, !this.collapseGrade[id]);
    },
    openCloseBranch: function(id) {
      this.$set(this.collapseBranch, id, !this.collapseBranch[id]);
    },
    openCloseSubject: function(id) {
      this.$set(this.collapseSubject, id, !this.collapseSubject[id]);
    },
    getSubTopicOrder: function(subjectId) {
      var subTopic = this.subTopic();
      var order = 1;
      for (var element in subTopic) {
        if (subTopic[element].subject == subjectId) {
          order = subTopic[element].subTopicOrder + 1;
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
    this.getSubTopics()
    this.getSubjects()
    .then(() => {
        var subjects = this.subject();
      })
      .then(subjects => {
        this.collapseSubjects(subjects);
      });
    this.getBranches()
      .then(() => {
        var branches = this.branch();
      })
      .then(branches => {
        this.collapseBranches(branches);
      });
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
