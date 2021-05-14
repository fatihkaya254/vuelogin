<template lang="pug">
.user
    h3 Okullar ve Kurslar
    .listContainer
        ul
            li( v-for="course in this.$store.state.users.schoolCourse ")
                .card( @click="hookUser(course._id)")
                    p {{ course._id }}
                    p {{ course.SchoolCourseName }}
    .updateUser
        h4 {{ id }}
        label İsim 
        input(type="text" v-model="name")
        br
        input(type="submit" @click="addSchool(name, 'name')")
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
    };
  },
  mounted() {
    this.getEducationBacks()
  },
  methods: {
    ...mapActions("users", ["getEducationBacks", "addSchoolCourse"]),
    hookUser: function(id) {
      this.id = this.$store.state.users.user[id]._id;
      this.name = this.$store.state.users.user[id].name;
    },
    throwAddSchoolCourse: function(){
      this.addRole({ SchoolCourseName: this.name})
    },
    roleName: function(id){
        if (this.$store.state.users.role[id] != null || this.$store.state.users.role[id] != undefined) {
            return this.$store.state.users.role[id].roleName
        } else {
            return "Rol Yok"
        }
    }
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
