<template lang="pug">
div
    .reformative(:style="{top: top + 'px' , left: left + 'px'}" v-show="popup" )
      .close(@click="popup=false") x
      .form 
        input(type="text" v-model="branchName" v-on:keyup.13="updateBranch")
    h4 Branşlar
    .listContainer
        ul
          li( v-for="grade in grade()" )
            .accordionCover
              div(@click="openClose(grade._id)" :class="[collapseGrade[grade._id] ? 'accordionTittle accordionTittleOpen' : 'accordionTittle']")
                | {{ grade.gradeName }} 
              .accordionContent(v-show="collapseGrade[grade._id]")
                ul
                    li( v-for="branch in branch()" v-if="branch.grade == grade._id")
                        .card(@click="move($event, branch._id)")
                           | ·{{ branch.branchName }}
                    li 
                        input(type="text" v-model="name" v-on:keyup.13="throwAddBranch(grade._id)")


   
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      popup: false,
      branchName: "",
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
      "deleteBranch"
    ]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("branches", ["branch"]),
    throwAddBranch: function(gradeId) {
      this.addBranch({ branchName: this.name, grade: gradeId });
      this.name=""
    },
    hookSubject: function(id) {
      this.id = this.$store.state.users.role[id]._id;
      this.name = this.$store.state.users.role[id].roleName;
      this.descripton = this.$store.state.users.role[id].roleDescripton;
    },
    updateBranch: function() {
      if (this.branchName == "") {
        this.deleteBranch(this.changingId);
        this.popup = false;
      } else {
        this.changeBranchInfo({
          id: this.changingId,
          value: this.branchName,
          where: "branchName"
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
      this.top = event.pageY - 40;
      this.left = event.pageX - 180;
      this.popup = true;
      this.branchName = this.branch()[id].branchName;
      this.changingId = id;
    },
    collapseGrades: function(grades) {
      for (var grade in grades) {
        this.collapseGrade[grade] = false;
      }
    },
    openClose: function(id) {
      this.$set(this.collapseGrade, id, !this.collapseGrade[id]);
    }
  },
  created() {
    this.getBranches();
    this.getGrades()
      .then(() => {
        var grades = this.grade();
      })
      .then((grades) => {
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


.reformative
    height: 200px
    width: 200px
    background-color: white
    position: absolute
    z-index: 1

.close
    height: 18px
    width: 18px
    border-radius: 50%
    background-color: $red
    position: relative
    z-index: 1
    float: right
    margin: 2px
    color: white
    padding: 2px


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
