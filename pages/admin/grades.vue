<template lang="pug">
div
    h4 Sınıflar
    .listContainer
        ul
            li( v-for="grade in this.$store.state.students.grade ")
                .card( @click="hookGrade( grade._id)")
                    p {{ grade._id }}
                    p {{ grade.gradeName }}
    .updateUser
    label Rol Adı 
    input(type="text" v-model="name")
    br
    input(type="submit" @click="throwAddGrade")
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
  methods: {
    ...mapActions("students", ["getGrades", "addGrade"]),
    throwAddGrade: function(){
      this.addGrade({ gradeName: this.name})
    },
    hookGrade: function(id) {
      this.id = this.$store.state.students.grade[id]._id;
      this.name = this.$store.state.students.grade[id].gradeName;
    }
  },
  mounted() {
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