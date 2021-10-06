<template lang="pug">
.formWrapper
  .apply(v-show="applyPop")
    .close(@click="closeApply()")
    .infoLine
        label
            | Veli {{parentName}} Öğrenci {{studentName}}
    .infoLine
        label(v-if="packageId != ''")
            | {{package()[packageId].name}}
    .infoLine(v-if="packageId != ''")
        label
            | Paket Fiyatı: {{package()[packageId].fee}} 
        label(v-if="newFee!=''")
            | Yeni Fiyatı: {{newFee}}
    .infoLine
        label
            | {{installment}} Taksit 
        label(v-show="tett == ''")
            | Bitiş Tarihi 
        label(v-show="tett != ''")
            | {{tett}} 
        label
            | {{life}} Aylık 
    .branches(v-if="packageId != ''")
        .packageSubBranch(v-if="package()[packageId].scope == 'group'")
            | Grup Sınıfı
            select(v-model="mygrade" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
        .packageSubBranch(v-if="package()[packageId].weeklyPrivateLesson >0 || package()[packageId].oncePrivateLesson >0")
            | 1. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch($event)")
                option(:value="selectedBranch") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade") {{branch.branchName}}
        .packageSubBranch(v-if="package()[packageId].weeklyPrivateLesson > 1")
            br
            | 2. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade2($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch2($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade2") {{branch.branchName}}
        .packageSubBranch(v-if="package()[packageId].weeklyPrivateLesson > 2")
            br
            | 3. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade3($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch3($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade3") {{branch.branchName}}
        .packageSubBranch(v-if="package()[packageId].weeklyPrivateLesson > 3")
            br
            | 4. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade4($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch4($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade4") {{branch.branchName}}
        .packageSubBranch(v-if="package()[packageId].weeklyPrivateLesson > 4")
            br
            | 5. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade5($event)" )
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch5($event)" )
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade5") {{branch.branchName}}
        .packageSubBranch(v-if="package()[packageId].weeklyPrivateLesson > 5")
            br
            | 6. Branş Seçiminizi Yapınız 
            select(@change="onChangeGrade6($event)")
                option Sınıf
                option(v-for="grade in grade()" :value="grade._id") {{grade.gradeName}}
            select(@change="onChangeBranch6($event)")
                option(value="0") Branş
                option(v-for="branch in branch()" :value="branch._id" v-if="branch.grade._id == selectedGrade6") {{branch.branchName}}
    .infoLine
        input(type="submit" value="Onayla" @click="apply()")
  .enrollmentForm
    .infoLine
        label
            | Veli {{parentName}}
        input(type="text" placeholder="Telefon numarası" v-model="parentPhone" :maxlength="phoneLength")
    .infoLine
        label
            | Öğrenci {{studentName}}
        input(type="text" placeholder="Telefon numarası" v-model="studentPhone" :maxlength="phoneLength")
    .infoLine
        label(v-if="packageId != ''")
            | {{package()[packageId].name}}
        label(v-if="packageId == ''")
            | Paket
        select(v-model="packageId")
            option(v-for="packagee in package()" :value="packagee._id") {{packagee.name}}
    .infoLine(v-if="packageId != '' && package()[packageId].installability")
        label
            | Taksit 
        input(type="number" v-model="installment")
    .infoLine
        label(v-show="purchaseDate == ''")
            | Başlangıç
        label(v-show="purchaseDate != ''")
            | {{purchaseDate}}
        input(type="date" v-model="purchaseDate")
    .infoLine(v-if="packageId != '' && package()[packageId].installability")
        label(v-show="tett == ''")
            | Bitiş Tarihi
        label(v-show="tett != ''")
            | {{tett}}
        input(type="date" v-model="tett")
    .infoLine(v-if="packageId != '' && !package()[packageId].installability")
        label
            | {{life}} Aylık
        input(type="number" v-model="life")
    .infoLine(v-if="packageId != ''")
        label
            | Paket Fiyatı: {{package()[packageId].fee}}
    .infoLine
        label
            | Yeni Fiyatı: {{newFee}}
        input(type="number" v-model="newFee")
    .infoLine
        input(type="submit" value="Ekle" @click="applyPop=true")
</template>

<script>

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      applyPop: false,
      newFee: "",
      installment: 1,
      mygrade: "",
      tett: "",
      life: 1,
      selectedBranch: "none",
      selectedGrade: "none",
      name: "",
      id: "",
      branches: [],
      phoneLength: 11,
      surname: "",
      parentPhone: "",
      studentPhone: "",
      parentName: "",
      studentName: "",
      purchaseDate: "",
      parentId: "",
      studentId: "",
      date: "",
      photo: "",
      adress: "",
      email: "",
      packageId: "",
      mainBranchLabel: "Ana Branş",
      mainBranch: "",
      ourhost: process.env.OUR_URL,
      selectedGrade: "",
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
      selectedGrade6: "none"
    };
  },
  async mounted() {
    this.getGrades();
    this.getBranches();
    await this.getPackages();
    this.packageId = Object.keys(this.package())[0];
  },
  methods: {
    ...mapActions("users", ["addUser"]),
    ...mapGetters("students", ["grade", "schoolCourse"]),
    ...mapActions("branches", ["getBranches"]),
    ...mapActions("economics", ["getPackages"]),
    ...mapActions("students", ["getGrades"]),
    ...mapGetters("students", ["grade"]),
    ...mapGetters("economics", ["package"]),
    ...mapGetters("branches", ["branch"]),
    closeApply: function() {
      this.applyPop = false;
      this.selectedBranch = "none";
      this.selectedGrade = "none";
      this.selectedBranch1 = "none";
      this.selectedGrade1 = "none";
      this.selectedBranch2 = "none";
      this.selectedGrade2 = "none";
      this.selectedBranch3 = "none";
      this.selectedGrade3 = "none";
      this.selectedBranch4 = "none";
      this.selectedGrade4 = "none";
      this.selectedBranch5 = "none";
      this.selectedGrade5 = "none";
      this.selectedBranch6 = "none";
      this.selectedGrade6 = "none";
    },
    apply: function() {
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
      if (
        branches.length != this.package()[this.packageId].weeklyPrivateLesson &&
        this.package()[this.packageId].weeklyPrivateLesson != 0
      ) {
        alert(
          this.package()[this.packageId].weeklyPrivateLesson +
            " Sınıf ve Branş Seçimi Yapmanız Gerekmektedir"
        );
      } else if (
        branches.length != this.package()[this.packageId].oncePrivateLesson &&
        this.package()[this.packageId].oncePrivateLesson != 0
      ) {
        alert(
          this.package()[this.packageId].oncePrivateLesson +
            " Sınıf ve Branş Seçimi Yapmanız Gerekmektedir"
        );
      } else {
        const parent = this.parentId;
        const student = this.studentId;
        const branch = branches;
        const packagee = this.packageId;
        const purchaseDate = new Date(this.purchaseDate);
        var life = parseInt(this.life);
        var endDate = new Date();
        if (this.tett != "") {
          endDate = new Date(this.tett);
        } else {
          endDate.setMonth(purchaseDate.getMonth() + life);
        }
        var fee = this.package()[this.packageId].fee;
        if (this.newFee != "" && this.newFee != undefined) {
          fee = this.newFee;
        }
        var groupRight = false;
        if (this.package()[this.packageId].scope == "group") {
          groupRight = true;
        }
        var grade = undefined;
        if (this.mygrade != "") {
          grade = this.mygrade;
        }
        const weeklyPrivateLesson = this.package()[this.packageId]
          .weeklyPrivateLesson;
        const packageDesc = this.package()[this.packageId].description;
        const packageName = this.package()[this.packageId].name;
        const oncePrivateLesson = this.package()[this.packageId]
          .weeklyPrivateLesson;
        const weeklyExam = this.package()[this.packageId].weeklyPrivateLesson;
        const onceExam = this.package()[this.packageId].weeklyPrivateLesson;
        var installment = this.installment;
        if (life != 1) {
          installment = life;
        }
        const purchase = {
          packageName,
          packageDesc,
          parent,
          student,
          branch,
          grade,
          package: packagee,
          purchaseDate,
          endDate,
          fee,
          groupRight,
          weeklyPrivateLesson,
          weeklyExam,
          oncePrivateLesson,
          onceExam,
          installment
        };
        console.log(purchase);
        this.addPurchase(purchase);
      }
    },
    addPurchase: async function(purchase) {
      await this.$axios 
        .put(`${process.env.OUR_HOST}/adminPurchase`, {
          purchase
        })
        .then(res => {
          if (res.status == 201) {
            this.$router.push("/manager/purchaseList");
          }
        });
    },
    deleteBranch: function(id) {
      const index = this.branches.indexOf(id);
      console.log(index);
      if (index > -1) {
        this.branches.splice(index, 1);
        this.updateUser("branch", this.branches);
      }
    },
    addBranch: async function() {
      const branch = this.selectedBranch;
      this.branches.push(branch);
      await this.updateUser("branch", this.branches);
      this.getUser();
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
    }
  },
  watch: {
    async parentPhone(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        try {
          await this.$axios 
            .post(`${process.env.OUR_HOST}/getOneUser`, {
              phone: this.phoneNumber
            })
            .then(res => {
              this.parentId = res.data.user._id;
              if (
                res.data.user.name != undefined &&
                res.data.user.surname != undefined
              )
                this.parentName =
                  res.data.user.name + " " + res.data.user.surname;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async studentPhone(value) {
      var firstChar = value.charAt(0);
      if (firstChar != 0) this.phoneLength = 10;
      else this.phoneLength = 11;
      this.phoneNumber = value.replace(/\D/g, "");
      if (this.phoneNumber.length == this.phoneLength) {
        try {
          await this.$axios 
            .post(`${process.env.OUR_HOST}/getOneUser`, {
              phone: this.phoneNumber
            })
            .then(res => {
              this.studentId = res.data.user._id;
              if (
                res.data.user.name != undefined &&
                res.data.user.surname != undefined
              )
                this.studentName =
                  res.data.user.name + " " + res.data.user.surname;
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    life(value) {
      if (this.packageId != "") {
        this.newFee = value * this.package()[this.packageId].fee;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.branches
    margin-top: 20px
    height: 30vh
    overflow: auto
.close
    margin: 15px
    position: absolute
    z-index: 4
    height: 13px
    width: 13px
    border-radius: 50%
    background-color: #ff605c
    &:hover
      height: 15px
      width: 15px

.apply
    top:0
    right: 0
    height: 100%
    width: 100%
    position: fixed
    z-index: 3
    background-color: white

.formWrapper
  text-align: center

.infoLine
  margin-top: 10px
  padding-top: 8px
  min-height: 40px
  border-bottom: 0.75px solid gray
  & img
    float: left
    margin-bottom: 5px
    height: 32px
    width: 32px
    border-radius: 50%
  p
    float: left
    margin-left: 15px
select
  float: right
  margin-right: 20%
  height: 28px
  margin-top: -8px
  border: none
  width: 50%
  padding-left: 16px
  padding-right: 16px
  border-radius: 1em

option
  float: right
  margin-right: 20%
  height: 28px
  margin-top: -8px
  border: none
  min-width: 50%
  -webkit-appearance: none
  padding-left: 16px
  padding-right: 16px
  border-radius: 1em

input
  float: right
  margin-right: 20%
  height: 28px
  margin-top: -8px
  border: none
  min-width: 50%
  -webkit-appearance: none
  padding-left: 16px
  padding-right: 16px
  border-radius: 1em

  &:focus
    -webkit-appearance: none

  &[type="submit"]
    background-color: black
    color: white

    &:hover
      cursor: pointer

.wholeBranches
    height: 400px
    overflow: auto

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
</style>
