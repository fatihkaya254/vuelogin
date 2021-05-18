<template lang="pug">
div
    h4 Konular
    .listContainerr
        ul
            li( v-for="subject in this.$store.state.branches.subject ")
                .card( @click="hookSubject(subject._id)")
                    p {{ subject._id }}
                    p {{ subject.subjectName }}
                    p {{ branchName(subject.branch)}} - {{ gradeName(branchGrade(subject.branch))}}
    .updateUser
    label Konu Adı 
    input(type="text" v-model="name")
    br
    label branch 
    select(v-model="branchId")
        option(v-for="branch in this.$store.state.branches.branch" :value="branch._id") {{branch.branchName}} - {{ gradeName(branch.grade) }}
    br
    input(type="submit" @click="throwAddSubject")
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      branchId: ""
    };
  },
  methods: {
    ...mapActions("branches", ["getSubjects", "addSubject"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapActions("students", ["getGrades"]),
    throwAddSubject: function() {
      this.addSubject({ subjectName: this.name, branch: this.branchId });
    },
    hookSubject: function(id) {
      this.id = this.$store.state.users.role[id]._id;
      this.name = this.$store.state.users.role[id].roleName;
      this.descripton = this.$store.state.users.role[id].roleDescripton;
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
    branchName: function(id) {
      if (
        this.$store.state.branches.branch[id] != null ||
        this.$store.state.branches.branch[id] != undefined
      ) {
        return this.$store.state.branches.branch[id].branchName;
      } else {
        return "Rol Yok";
      }
    },
    branchGrade: function(id) {
      if (
        this.$store.state.branches.branch[id] != null ||
        this.$store.state.branches.branch[id] != undefined
      ) {
        return this.$store.state.branches.branch[id].grade;
      } else {
        return "Rol Yok";
      }
    }
  },
  mounted() {
    this.getSubjects();
    this.getBranches();
    this.getGrades();
  }
};
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
.card
    width: 240px
    height: 120px
    border: 1px solid black
    border-radius: 1em
    margin: 20px
    padding: 10px
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
</style>
