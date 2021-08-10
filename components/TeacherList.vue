<template lang="pug">
.tearcherCards
  .teacherCard(v-for="teacher in teacher()")
    .cardHead
      .profilePhoto
        img(:src=" ourhost + teacher.profilePic" v-show="teacher.profilePic")
        img(src="../assets/basic-profile.png" v-show="!teacher.profilePic")
    .infoes
      p {{ teacher.mainBranch }}
      p {{ teacher.name }} {{ teacher.surname }}
    .getLesson
      | Özel Ders Al
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {
    this.getTeachers();

  },
  data() {
    return {
      name: "",
      ourhost:  process.env.OUR_URL,
    }
  },
  methods: {
    ...mapGetters("users", ["teacher", "teachersLessons"]),
    ...mapActions("users", ["getTeachers", "addTeacherLessons", "getTeachersLessons"]),
  },
  watch: {},
};

</script>

<style lang="sass" scoped>

.tearcherCards 
  display: flex
  align-items: center
  justify-content: center
  min-height: 75vh
  line-height: 1.5
  font-family: "Lato"
  -webkit-font-smoothing: antialiased
  color: white

.teacherCard
  margin: 15px
  height: 400px
  width: 300px
  border: 1px solid black
  border-radius: 1em
  overflow: auto
  position: relative
.cardHead
  height: 120px
  width: 100%
  background-color: #ff6262

.profilePhoto
    height: 102px
    width: 102px
    border-radius: 50%
    margin: auto

    & img
        margin-top: 70px
        height: 102px
        width: 102px
        border-radius: 50%

.infoes
    color: black
    margin-top: 70px
    text-align: center

.getLesson
    padding-top: 14px
    height: 48px
    width: 100%
    background-color: #ff6262
    position: absolute
    bottom: 0
    text-align: center
    cursor: pointer
    &:hover
      background-color: #00ca4e
</style>
