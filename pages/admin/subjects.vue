<template lang="pug">
div
    h4 Konular
    .listContainer
        ul
            li( v-for="subject in this.$store.state.branches.subject ")
                .card( @click="hookSubject( subject._id)")
                    p {{ subject._id }}
                    p {{ subject.roleName }}
                    p {{ subject.branch }}
    .updateUser
    label Konu Adı 
    input(type="text" v-model="name")
    br
    label Branş 
    input(type="text" v-model="branch")
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
      branch: ""
    };
  },
  methods: {
    ...mapActions("branches", ["getSubjects", "addSubject"]),
    throwAddSubject: function(){
      this.addSubject({ subjectName: this.name, branch: this.branch})
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