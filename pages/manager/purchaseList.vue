<template lang="pug">
.container
    .changePop(v-show="pop")
      .close(@click="close()") Kapat
      .infoLine
          label(v-if="packageId != ''")
              | {{package()[packageId].name}}
      .branches(v-if="packageId != ''")
          div(v-if="myBranches != undefined")
            p(v-for="mB in myBranches") {{mB.grade.gradeName}} {{mB.branchName}}
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
        .infoLine(v-if="packageId != ''")
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
                | Alınan Fiyat: {{fee}}
        .infoLine
            label
                | Yeni Fiyatı: {{newFee}}
            input(type="number" v-model="newFee")
        .close(style="background-color: #04AA6D") Ekle
    .purchaseList
        table(id="customers")
            thead
                tr
                    th Veli
                    th Öğrenci
                    th Paket Adı
                    th Ücret
                    th Kayıt
                    th Bitiş
            tbody
                tr(v-for="p in purchases" @click="selectPurchase(p._id)")
                    td {{ p.parent.name }} {{ p.parent.surname }}
                    td(v-if="p.student != undefined") {{ p.student.name }} {{ p.student.surname }}
                    td {{p.packageName}}
                    td {{fixFee(p.fee)}}
                    td {{fixDate(p.purchaseDate)}}
                    td {{fixDate(p.endDate)}}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      pop: false,
      purchases: [],
      id: 0,
      newFee: "",
      fee: "",
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
      myBranches: [],
      packageId: "",
      mainBranchLabel: "Ana Branş",
      mainBranch: "",
      ourhost: process.env.OUR_URL,
      selectedBranch: "none",
      selectedGrade: "none",
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
    await this.getAll();
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
    close: function() {
      this.pop = false;
      this.packageId = "";
      this.mygrade = "";
      this.fee = "";
      this.parentName = "";
      this.studentName = "";
      this.life = 1;
      this.installment = 1;
      this.tett = "";
      this.purchaseDate = "";
      this.myBranches = [];
    },
    getAll: async function() {
      await this.$axios
        .get(`${process.env.OUR_HOST}/purchaseList`)
        .then(res => {
          this.purchases = res.data;
        });
    },
    fixDate: function(mydate) {
      let datetime = mydate;
      let date = datetime.split("-");
      let year = date[0];
      let month = date[1];
      let day = date[2].charAt(0) + date[2].charAt(1);
      return year + "-" + month + "-" + day;
    },
    fixFee: function(x) {
      return x.toLocaleString("tr-TR") + " ₺";
    },
    selectPurchase: function(id) {
      this.pop = true;
      this.packageId = this.purchases[id].package;
      if (this.purchases[id].grade[0] != undefined)
        this.mygrade = this.purchases[id].grade[0]._id;
      this.fee = this.fixFee(this.purchases[id].fee);
      this.parentName =
        this.purchases[id].parent.name +
        " " +
        this.purchases[id].parent.surname;
      this.studentName =
        this.purchases[id].student.name +
        " " +
        this.purchases[id].student.surname;
      this.life = this.purchases[id].installment;
      this.installment = this.purchases[id].installment;
      this.tett = this.fixDate(this.purchases[id].endDate);
      this.purchaseDate = this.fixDate(this.purchases[id].purchaseDate);
      this.myBranches = this.purchases[id].branch;
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
        const branch = branches;
        const grade = this.mygrade
        if (grade != "") {
          if(confirm("grade")) alert("tamam")
          else alert("iyi")
        }else if(branch != []){
          alert("branch")
        }
      }
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
    }
  }
};
</script>

<style lang="sass" scoped>
.close
  width: 100%
  background-color: #EF5350
  color: white
  justify-content: center
  align-items: center
  text-align: center
  padding: 12px
  cursor: pointer
  &:hover
    background-color: black

.changePop
  height: 500px
  width: 400px
  position: fixed
  z-index: 1
  background-color: white
  box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
  padding: 20px
  overflow: auto

.purchaseList
    height: 60vh
    width: 53vw
    overflow: auto

#customers
  font-family: Arial, Helvetica, sans-serif
  border-collapse: collapse
  width: 100%

#customers td, #customers th
  border: 1px solid #ddd
  padding: 8px

#customers tr:nth-child(even)
    background-color: #FAE6D3

#customers tr:hover
    background-color: #ddd

#customers th
  padding-top: 12px
  padding-bottom: 12px
  text-align: left
  background-color: #04AA6D
  color: white

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
  margin-right: 20%
  height: 28px
  border: none
  width: 50%
  padding-left: 16px
  padding-right: 16px
  border-radius: 1em

option
  margin-right: 20%
  height: 28px
  border: none
  min-width: 50%
  -webkit-appearance: none
  padding-left: 16px
  padding-right: 16px
  border-radius: 1em

input
  margin-right: 20%
  height: 28px
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
</style>
