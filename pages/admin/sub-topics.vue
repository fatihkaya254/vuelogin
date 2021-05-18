<template lang="pug">
div
    h4 Alt Konular
    .listContainer
        ul
            li( v-for="subTopic in this.$store.state.branches.subTopic ")
                .card( @click="hookSubTopic( subTopic._id)")
                    p {{ subTopic._id }}
                    p {{ subTopic.subTopicName }}
                    p {{ subjectName(subTopic.subject) }} - {{branchName(subjectBranch(subTopic.subject)) }} - {{ gradeName(branchGrade(subjectBranch(subTopic.subject))) }}
    .updateUser
    label Alt Konu Adı 
    input(type="text" v-model="name")
    br
    label Açıklama
    input(type="text" v-model="stat")
    br
    label Konu 
    select(v-model="subjectId")
        option(v-for="subject in this.$store.state.branches.subject" :value="subject._id") {{subject.subjectName}} - {{ branchName(subject.branch) }} - {{ gradeName(branchGrade(subject.branch))}}
    br
    input(type="submit" @click="throwAddSubTopic")
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      subjectId: "",
      stat: "",
    };
  },
  methods: {
    ...mapActions("branches", ["getSubTopics", "addSubTopic"]),
    ...mapActions("branches", ["getSubjects"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapActions("students", ["getGrades"]),
    throwAddSubTopic: function() {
      this.addSubTopic({ subTopicName: this.name, subTopicStat: this.stat, subject: this.subjectId });
    },
    hookSubTopic: function(id) {
      this.id = this.$store.state.branches.subTopic[id]._id;
      this.name = this.$store.state.branches.subTopic[id].subTopicName;
      this.stat = this.$store.state.branches.subTopic[id].subTopicStat;
      this.subjectId = this.$store.state.branches.subTopic[id].subject;
    },
    gradeName: function(id) {
      if (
        this.$store.state.students.grade[id] != null ||
        this.$store.state.students.grade[id] != undefined
      ) {
        return this.$store.state.students.grade[id].gradeName;
      } else {
        return "Sınıf Yok";
      }
    },
    branchName: function(id) {
      if (
        this.$store.state.branches.branch[id] != null ||
        this.$store.state.branches.branch[id] != undefined
      ) {
        return this.$store.state.branches.branch[id].branchName;
      } else {
        return "Branş Yok";
      }
    },
    branchGrade: function(id) {
      if (
        this.$store.state.branches.branch[id] != null ||
        this.$store.state.branches.branch[id] != undefined
      ) {
        return this.$store.state.branches.branch[id].grade;
      } else {
        return "Sınıf Yok";
      }
    },
    subjectName: function(id) {
      if (
        this.$store.state.branches.subject[id] != null ||
        this.$store.state.branches.subject[id] != undefined
      ) {
        return this.$store.state.branches.subject[id].subjectName;
      } else {
        return "Konu Yok";
      }
    },
    subjectBranch: function(id) {
      if (
        this.$store.state.branches.subject[id] != null ||
        this.$store.state.branches.subject[id] != undefined
      ) {
        return this.$store.state.branches.subject[id].branch;
      } else {
        return "Branş Yok";
      }
    }
  },

  mounted() {
    this.getSubTopics();
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
