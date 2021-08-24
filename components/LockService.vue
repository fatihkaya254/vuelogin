<template lang="pug">
.lockingContainer
    .close(@click="closePop()") x
    .packageName
        | {{lockedPackage().name}}
    .packageDescription
        | {{lockedPackage().description}}
    .packagePrice
        | {{lockedPackage().fee}}₺
    .packageBranch(v-if="lockedPackage().scope == 'private'")
        .packageSubBranch(v-if="!lockedPackage().oncePrivateLesson")
            br
            | Süre | Toplam Ücret: {{lockedPackage().fee * life}}₺
            select(@change="onChangeLife($event)")
                option(v-for="life in 12" :value="life") {{life}} Ay
            br
        .packageSubBranch
            | 1. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade($event)")
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch($event)")
                option(:value="selectedBranch") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade") {{branch.branchName}}
        .packageSubBranch(v-if="lockedPackage().weeklyPrivateLesson > 1")
            br
            | 2. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade2($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch2($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade2") {{branch.branchName}}
        .packageSubBranch(v-if="lockedPackage().weeklyPrivateLesson > 2")
            br
            | 3. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade3($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch3($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade3") {{branch.branchName}}
        .packageSubBranch(v-if="lockedPackage().weeklyPrivateLesson > 3")
            br
            | 4. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade4($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch4($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade4") {{branch.branchName}}
        .packageSubBranch(v-if="lockedPackage().weeklyPrivateLesson > 4")
            br
            | 5. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade5($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch5($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade5") {{branch.branchName}}
        .packageSubBranch(v-if="lockedPackage().weeklyPrivateLesson > 5")
            br
            | 6. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade6($event)")
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch6($event)")
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade6") {{branch.branchName}}
    .getItName(v-if="selectedGrade != 'none' && selectedBranch != 'none'" style="margin-bottom: 100px")
        | {{grade()[selectedGrade].gradeName}} {{branch()[selectedBranch].branchName}}
    .getItName(v-if="selectedGrade2 != 'none' && selectedBranch2 != 'none'" style="margin-bottom: 130px")
        | {{grade()[selectedGrade2].gradeName}} {{branch()[selectedBranch2].branchName}}
    .getItName(v-if="selectedGrade3 != 'none' && selectedBranch3 != 'none'" style="margin-bottom: 160px")
        | {{grade()[selectedGrade3].gradeName}} {{branch()[selectedBranch3].branchName}}
    .getItName(v-if="selectedGrade4 != 'none' && selectedBranch4 != 'none'" style="margin-bottom: 190px")
        | {{grade()[selectedGrade4].gradeName}} {{branch()[selectedBranch4].branchName}}
    .getItName(v-if="selectedGrade5 != 'none' && selectedBranch5 != 'none'" style="margin-bottom: 220px")
        | {{grade()[selectedGrade5].gradeName}} {{branch()[selectedBranch5].branchName}}
    .getItName(v-if="selectedGrade6 != 'none' && selectedBranch6 != 'none'" style="margin-bottom: 250px")
        | {{grade()[selectedGrade6].gradeName}} {{branch()[selectedBranch6].branchName}}
    .getIt(v-if="lockedPackage().scope == 'private'" @click="takeService()")
        | Ders Al
    .getIt(v-if="lockedPackage().scope == 'exam'" @click="takeExam()")
        | Deneme Sınavı Al
    .getItGroup(v-if="lockedPackage().scope == 'group'")
        | Online Satış İçin Uygun Değil
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LockService",

  data() {
    return {
      selectedBranch: "none",
      selectedGrade: "none",
      selectedBranch1: "none",
      selectedGrade1: "none",
      selectedBranch2: "none",
      selectedGrade2: "none",
      selectedBranch3: "none",
      selectedGrade3: "none",
      selectedBranch4: "none",
      selectedGrade4: "none",
      selectedBranch5: "none",
      selectedGrade5: "none",
      selectedBranch6: "none",
      selectedGrade6: "none",
      life: 1,
      ourhost: process.env.OUR_URL
    };
  },
  methods: {
    ...mapActions(["setPackagePop"]),
    ...mapActions("economics", ["getPackages", "addPurchase"]),
    ...mapGetters("economics", ["package", "lockedPackage"]),
    ...mapGetters(["getAuthkey"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("branches", ["branch"]),
    closePop(){
      this.selectedBranch = "none",
      this.selectedGrade = "none",
      this.selectedBranch1 = "none",
      this.selectedGrade1 = "none",
      this.selectedBranch2 = "none",
      this.selectedGrade2 = "none",
      this.selectedBranch3 = "none",
      this.selectedGrade3 = "none",
      this.selectedBranch4 = "none",
      this.selectedGrade4 = "none",
      this.selectedBranch5 = "none",
      this.selectedGrade5 = "none",
      this.selectedBranch6 = "none",
      this.selectedGrade6 = "none",
      this.life = 1,
      this.setPackagePop(false)
    },
    onChangeLife(event) {
      this.life = event.target.value;
    },
    onChangeGrade(event) {
      this.selectedGrade = event.target.value;
      this.selectedBranch = "none";
    },
    onChangeBranch(event) {
      this.selectedBranch = event.target.value;
    },
    onChangeGrade2(event) {
      this.selectedGrade2 = event.target.value;
      this.selectedBranch2 = "none";
    },
    onChangeBranch2(event) {
      this.selectedBranch2 = event.target.value;
    },
    onChangeGrade3(event) {
      this.selectedGrade3 = event.target.value;
      this.selectedBranch3 = "none";
    },
    onChangeBranch3(event) {
      this.selectedBranch3 = event.target.value;
    },
    onChangeGrade4(event) {
      this.selectedGrade4 = event.target.value;
      this.selectedBranch4 = "none";
    },
    onChangeBranch4(event) {
      this.selectedBranch4 = event.target.value;
    },
    onChangeGrade5(event) {
      this.selectedGrade5 = event.target.value;
      this.selectedBranch5 = "none";
    },
    onChangeBranch5(event) {
      this.selectedBranch5 = event.target.value;
    },
    onChangeGrade6(event) {
      this.selectedGrade6 = event.target.value;
      this.selectedBranch6 = "none";
    },
    onChangeBranch6(event) {
      this.selectedBranch6 = event.target.value;
    },
    takeService() {
      let branches = [];
      if ((this.selectedBranch != "none") & (this.selectedGrade != "none"))
        branches.push(this.selectedBranch);
      if ((this.selectedBranch2 != "none") & (this.selectedGrade2 != "none"))
        branches.push(this.selectedBranch2);
      if ((this.selectedBranch3 != "none") & (this.selectedGrade3 != "none"))
        branches.push(this.selectedBranch3);
      if ((this.selectedBranch4 != "none") & (this.selectedGrade4 != "none"))
        branches.push(this.selectedBranch4);
      if ((this.selectedBranch5 != "none") & (this.selectedGrade5 != "none"))
        branches.push(this.selectedBranch5);
      if ((this.selectedBranch6 != "none") & (this.selectedGrade6 != "none"))
        branches.push(this.selectedBranch6);
      if (branches.length != this.lockedPackage().weeklyPrivateLesson && this.lockedPackage().weeklyPrivateLesson != 0) {
        alert( this.lockedPackage().weeklyPrivateLesson + " Sınıf ve Branş Seçimi Yapmanız Gerekmektedir");
      } 
      else if (branches.length != this.lockedPackage().oncePrivateLesson && this.lockedPackage().oncePrivateLesson != 0) {
        alert( this.lockedPackage().oncePrivateLesson + " Sınıf ve Branş Seçimi Yapmanız Gerekmektedir");
      }
      else {
        let purchase = { package: this.lockedPackage()._id, branches, life: this.life, authkey: this.getAuthkey()}
        this.addPurchase(purchase)
      }
      this.$router.push("/profile/myPackages")
    },
    takeExam() {}
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
    height: 70%
    margin: 50px
    margin-top: 2%
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size: 11pt
    display: inline-block
    overflow: auto
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

.packageSubBranch
    width: 60%
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

.getItGroup
    position: absolute
    bottom: 0
    right: 0
    margin: 50px
    width: 180px
    height: 27px
    text-align: center
    padding-top: 4px
    cursor: pointer
.getItName
    position: absolute
    bottom: 0
    right: 0
    margin: 50px
    width: 180px
    height: 27px
    text-align: center
    padding-top: 4px
    cursor: pointer

.close
  position: absolute
  right: 0
  margin-right: 18px
  margin-top: 10px
  cursor: pointer

::-webkit-scrollbar
    height: 10px
    width: 2px
    border-radius: 1em
::-webkit-scrollbar-track
    background: #ffffff
    border-radius: 1em

::-webkit-scrollbar-thumb
    background: #555
    border-radius: 1em

::-webkit-scrollbar-thumb:hover
    background: #555
</style>
