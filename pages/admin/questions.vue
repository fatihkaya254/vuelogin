<template lang="pug">
div
    .questionBuddy(v-show="addingQuestion")
            .title
                span {{ thatGradeName }} - {{ thatBranchName }} Branşına Soru Ekleniyor
            .infoes
                textarea(rows="2" cols="50" v-model="imageUpText" placeholder="Soru üst kısımlarındaki açıklamalar varsa buraya eklenecek")
                input(type="file" @change="onFileChange" ref="fileupload" value="Soru Görseli")
                textarea(rows="2" cols="50" v-model="imageDownText" placeholder="Görselin altında yazılacak açıklamalar buraya eklenecek")
                textarea(rows="2" cols="50" v-model="root" placeholder="Soru kökü buraya eklenecek")
                textarea(rows="2" cols="50" v-model="correctAnswer" placeholder="Doğru Cevap")
                textarea(rows="2" cols="50" v-model="wrongAnswer1" placeholder="1. Yanlış Cevap")
                textarea(rows="2" cols="50" v-model="wrongAnswer2" placeholder="2. Yanlış Cevap")
                textarea(rows="2" cols="50" v-model="wrongAnswer3" placeholder="3. Yanlış Cevap")
                textarea(rows="2" cols="50" v-model="wrongAnswer4" placeholder="4. Yanlış Cevap")
                .subTopics
                  div(v-for="subject in subject()" v-if="subject.branch == thatBranch")
                    | {{subject.subjectName}}
                    p(v-for="subTopic in  subTopic()"  v-if="subTopic.subject == subject._id")
                      label &nbsp;&nbsp;&nbsp; {{subTopic.subTopicName}}
                      input(type="checkbox" v-model="checkedSubTopics" :value="subTopic._id")
            .infoes
                p {{imageUpText}}
                img(:src="imageUrl")
                p {{imageDownText}}
                p 
                  strong {{root}}
                p A) {{correctAnswer}}
                p B) {{wrongAnswer1}}
                p C) {{wrongAnswer2}}
                p D) {{wrongAnswer3}}
                p E) {{wrongAnswer4}}
                p(v-for="checkedSubTopic in checkedSubTopics") {{subTopic()[checkedSubTopic].subTopicName}}
            .buttonContainer
                .cancel(@click="cancelAdding()")
                    span İptal Et
                .create(@click="throwAddQuestion()")
                    span Oluştur
    .grades
        button(v-for="grade in grade()" @click="setOurBranches(grade._id)" :class="[thatGrade == grade._id ? 'openGrade' : '']") {{ grade.gradeName }} 
    .branches
        button(v-for="branch in getOurBranches()" @click="thatBranch = branch._id" :class="[thatBranch == branch._id ? 'openBranch' : '']") {{ branch.branchName }} 
    .content
        .wholeQuestions
            table
              tr(v-for="question in question()" v-if="question.branch == thatBranch")
                th {{question.imageUpText}}
                th {{question.imageDownText}}
                th {{question.root}}
                th {{question.correctAnswer}}
                th {{question.wrongAnswer1}}
                th {{question.wrongAnswer2}}
                th {{question.wrongAnswer3}}
                th {{question.wrongAnswer4}}
        .addQuestion(@click="addingQuestion = true")
            span Soru Ekle

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: null,
      addingQuestion: false,
      name: "",
      ourBranches: [],
      thatGrade: 0,
      thatBranch: 0,
      thatGradeName: "",
      thatBranchName: "",
      imageUpText: "",
      imageUrl: "",
      imageDownText: "",
      root: "",
      correctAnswer: "",
      wrongAnswer1: "",
      wrongAnswer2: "",
      wrongAnswer3: "",
      wrongAnswer4: "",
      checkedSubTopics: []
    };
  },
  methods: {
    ...mapActions("students", ["getGrades"]),
    ...mapActions("exams", [
      "getQuestions",
      "addQuestion",
      "changeQuestionInfo",
      "deleteQuestion"
    ]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("exams", ["question"]),
    ...mapActions("branches", ["getBranches", "getSubTopics", "getSubjects"]),
    ...mapGetters("branches", ["branch", "subTopic", "subject"]),
    throwAddQuestion: function() {
      let image = this.$refs.fileupload.files[0]
      console.log(image);
      this.addQuestion({
        imageUpText: this.imageUpText,
        imageUrl: image,
        imageDownText: this.imageDownText,
        root: this.root,
        correctAnswer: this.correctAnswer,
        wrongAnswer1: this.wrongAnswer1,
        wrongAnswer2: this.wrongAnswer2,
        wrongAnswer3: this.wrongAnswer3,
        wrongAnswer4: this.wrongAnswer4,
        branch: this.thatBranch 
      });
    },
    getOurBranches: function() {
      return this.ourBranches;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
    },
    cancelAdding: function() {
      this.addingQuestion = false;
      this.imageUpText = "";
      this.imageUrl = "";
      this.imageDownText = "";
      this.root = "";
      this.correctAnswer = "";
      this.wrongAnswer1 = "";
      this.wrongAnswer2 = "";
      this.wrongAnswer3 = "";
      this.wrongAnswer4 = "";
      this.$refs.fileupload.value = null;
    },
    setOurBranches: function(id) {
      this.thatGrade = id;
      this.ourBranches = [];
      var branches = this.branch();
      for (var element in branches) {
        if (branches[element].grade == id) {
          this.ourBranches.push(branches[element]);
        }
      }
      this.thatBranch = this.ourBranches[0]._id;
    },
  },
  created() {
    this.getGrades();
    this.getBranches();
    this.getSubTopics();
    this.getSubjects();
    this.getQuestions();
  },
  watch: {
    thatGrade: function(val) {
      this.thatGradeName = this.grade()[val].gradeName;
    },
    thatBranch: function(val) {
      this.thatBranchName = this.branch()[val].branchName;
    }
  }
};
</script>

<style lang="sass" scoped>
.grades
    height: 38px
    width: 100%
    display: flex
    border: 1px solid black
    border-bottom: none
    & button
        color: Black
        border: none
        border-bottom: 1px solid black
        background-color: white
        padding: 8px
        width: 100%
        &:last-child
          border-right: none
        &:first-child
          border-left: none
    .openGrade
      border-bottom: none
      border-left: 1px solid black
      border-right: 1px solid black
.branches
    height: 38px
    width: 100%
    display: flex
    border: 1px solid black
    border-bottom: none
    border-top: none
    & button
        color: Black
        border: none
        border-bottom: 1px solid black
        background-color: white
        padding: 8px
        width: 100%
        &:last-child
          border-right: none
        &:first-child
          border-left: none
    .openBranch
      border-bottom: none
.content
    min-height: 600px
    width: 100%
    display: flex
    border: 1px solid black
    border-top: none
    background-color: white
    position: relative
.questionBuddy
    position: absolute
    z-index: 2
    height: 80vh
    width: 60vw
    top: 0
    margin-top: 10vh
    margin-left: 1vw
    background-color: #e26771
    padding: 10px
    border-radius: 1em

.addQuestion
    width: 100%
    height: 20px
    font-size: 10pt
    margin-bottom: 5px
    display: inline
    text-align: center
    cursor: pointer
    position: absolute
    z-index: 1
    bottom: 0
    &:hover
      text-decoration: underline

.buttonContainer
    width: 100%
    height: 20px
    font-size: 10pt
    margin-bottom: 5px
    margin-left: -10px
    text-align: center
    position: absolute
    bottom: 0
    z-index: 2
.cancel
    width: 50%
    float: left
    cursor: pointer
    &:hover
      text-decoration: underline
.create
    width: 50%
    float: left
    cursor: pointer
    &:hover
      text-decoration: underline

.infoes
    width: 50%
    float: left
    & img
      width: 90%
.title
    width: 100%
    float: left
    margin-bottom: 18px
    text-align: center

.subTopics
    overflow: auto
    height: 40vh

.wholeQuestions
    width: 100%
    height: 58vh
    overflow: auto
    text-align: center
    & table
      border-collapse: collapse
      width: 100%
      font-size: 10px
    & td, & th 
      border: 1px solid #dddddd
      text-align: left
      padding: 8px

    & tr:nth-child(even) 
      background-color: #dddddd

</style>
