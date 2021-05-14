<template lang="pug">
div
    h4 Branşlar
    .listContainer
        ul
            li( v-for="branch in this.$store.state.branches.branch ")
                .card( @click="hookBranch( branch._id)")
                    p {{ subject._id }}
                    p {{ subject.roleName }}
                    p {{ subject.branch }}
    .updateUser
    label Branş Adı 
    input(type="text" v-model="name")
    br
    label Sınıf 
    input(type="text" v-model="grade")
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
      grade: ""
    };
  },
  methods: {
    ...mapActions("branches", ["getBranches", "addBranch"]),
    throwAddSubject: function(){
      this.addSubject({ subjectName: this.name, grade: this.grade})
    },
    hookSubject: function(id) {
      this.id = this.$store.state.users.role[id]._id;
      this.name = this.$store.state.users.role[id].roleName;
      this.descripton = this.$store.state.users.role[id].roleDescripton;
    }
  },
  mounted() {
    this.getSubjects();
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