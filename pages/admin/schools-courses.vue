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
        input(type="text" v-model="name" @blur="updateUser(name, 'name')")
        br
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
    this.getUsers()
  },
  methods: {
    ...mapActions("users", ["getEducationBacks"]),
    hookUser: function(id) {
      this.id = this.$store.state.users.user[id]._id;
      this.name = this.$store.state.users.user[id].name;
      this.surname = this.$store.state.users.user[id].surname;
      this.phone = this.$store.state.users.user[id].phone;
      this.roleId = this.$store.state.users.user[id].role;
    },
    updateUser: function(value, where){
        this.$store.dispatch("changeUserInfo", { id: this.id, value, where  });
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
