<template lang="pug">
.lockingContainer
    .packageName
        | Haftada 1 Gün Özel Ders
    .packageDescription
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis posuere arcu, nec mattis massa interdum eget. Nam eleifend eros a velit suscipit, bibendum condimentum augue maximus. Quisque egestas massa in arcu tincidunt, et ullamcorper est hendrerit. Nunc quis metus quis sem egestas aliquam. In convallis luctus tincidunt. Cras ut libero sit amet turpis scelerisque pellentesque ac id justo. Phasellus semper eget massa at vulputate. Donec et iaculis mi, sit amet pulvinar ex. Vivamus ac nunc vel mauris fermentum ultricies. Integer a neque vehicula, tincidunt orci nec, convallis tellus. Suspendisse semper blandit nisi vitae cursus. Morbi sit amet neque sit amet turpis volutpat consequat. Praesent et enim nec ante euismod hendrerit sed et nibh.
    .packagePrice
        | 900₺
    .packageBranch
        | Branş Seçiminizi Yapınız
        select(@change="onChangeGrade($event)")
            option Sınıf
            option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
        select(@change="onChangeBranch($event)")
            option Branş
            option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade == selectedGrade") {{branch.branchName}}
    .getIt
        | Eğitimi Al
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LockService",

  data() {
    return {
        selectedBranch: "none",
        selectedGrade: "none",
        ourhost:  process.env.OUR_URL,
    };
  },
  methods: {
    ...mapActions("economics", ["getPackages"]),
    ...mapGetters("economics", ["package"]),
    ...mapActions("branches", [ "getBranches"]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("branches", ["branch"]),
    onChangeGrade(event) {
        this.selectedGrade = event.target.value
    },
    onChangeBranch(event) {
        this.selectedBranch = event.target.value
    }
  },
  created() {
    this.getPackages();
    this.getGrades();
    this.getBranches();
  },
  components: {}
};
</script>

<style lang="sass" scoped>

.lockingContainer
    height: 100%
    width: 100%

.packageName
    width: 60%
    margin-top: 40px
    margin-left: 50px
    font-weight: 500
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 13pt
    text-align: center

.packageDescription
    width: 60%
    margin-left: 50px
    margin-top: 2%
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 11pt

.packagePrice
    width: 60%
    margin-top: 2%
    margin-left: 50px
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 14pt
    text-align: center

.packageBranch
    width: 60%
    margin: 50px
    margin-top: 2%
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 11pt
    display: inline-grid

    & select
        margin-top: 12px
        outline: none
        height: 27px
        text-align: center
        border: 1px solid black
        border-radius: 1em
        text-align-last: center
        max-width: 260px
        background-color: rgb(0, 0, 0,0) 
        
        &:hover
            background-color: black
            color: white  
.getIt
    position: absolute
    bottom: 0
    right: 0
    margin: 50px
    border-radius: 1em
    border: 1px solid black
    width: 180px
    height: 27px
    text-align: center
    padding-top: 4px
    cursor: pointer
    
    &:hover
        background-color: black
        color: white    
</style>
