<template lang="pug">
div
    .grades
        ul
            li(v-for="grade in grade()")
                button(@click="setOurBranches(grade._id)") {{ grade.gradeName }} 
    .branches
        ul
            li(v-for="branch in getOurBranches()")
                button {{ branch.branchName }} 
            
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      ourBranches:[]
    };
  },
  methods: {
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students",["grade"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapGetters("branches",["branch"]),
    getOurBranches: function(){
        return this.ourBranches
    },
    setOurBranches: function(id){
       var branches = this.branch()
        for (var element in branches) {
            if (branches[element].grade == id) {
                this.ourBranches.push(branches[element])
            }
        }
        console.log(this.ourBranches)   
    }
  },
  mounted() {
    this.getGrades();
    this.getBranches();
  }
};
</script>

<style lang="sass" scoped>
.grades
    height: 50px
    width: 100

    & ul
        
        list-style-type: none
        & li
            display: inline

.branches
    height: 50px
    width: 100

    & ul
        
        list-style-type: none
        & li
            display: inline


</style>