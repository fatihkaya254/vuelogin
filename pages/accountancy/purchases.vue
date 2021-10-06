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
            input(type="submit" value="Onayla" @click="cParent()")
        .infoLine
            label
                | Öğrenci {{studentName}}
            input(type="text" placeholder="Telefon numarası" v-model="studentPhone" :maxlength="phoneLength")
            input(type="submit" value="Onayla" @click="cStudent()")
        .infoLine(v-if="packageId != ''")
            label
                | Taksit 
            input(type="number" v-model="installment")
            input(type="submit" value="Onayla" @click="cInstallment()")
        .infoLine
            label(v-show="purchaseDate == ''")
                | Başlangıç
            label(v-show="purchaseDate != ''")
                | {{purchaseDate}}
            input(type="date" v-model="purchaseDate")
            input(type="submit" value="Onayla" @click="cPDate()")
        .infoLine(v-if="packageId != ''")
            label(v-show="tett == ''")
                | Bitiş Tarihi
            label(v-show="tett != ''")
                | {{tett}}
            input(type="date" v-model="tett")
            input(type="submit" value="Onayla" @click="cEDate()")
        .infoLine(v-if="packageId != ''")
            label
                | Paket Fiyatı: {{package()[packageId].fee}}
                | Alınan Fiyat: {{fee}}
        .infoLine
            label
                | Yeni Fiyatı: {{newFee}}
            input(type="number" v-model="newFee")
            input(type="submit" value="Onayla" @click="cNewFee()")
        .infoLine
            label
                | İPTAL (SADECE PLANLANANDAN ERKEN AYRILAN ÖĞRENCİLER İÇİN - SİLME İŞLEMİ BURADAN YAPILMAZ)
            label
                | İptal Sebebi
            input(type="text" placeholder="İptal Sebebi" v-model="cancelDesc")
        .infoLine
            label
                | Vazgeçilen Ücret: {{waivedWage}}
            input(type="number" v-model="waivedWage")
        .infoLine
            label
                | İptal Tarihi: {{cancelDate}}
            input(type="date" v-model="cancelDate")
        .infoLine
            input(type="submit" value="Onayla" @click="cancelPurch()")
        .infoLine(v-if="purchases[id] != undefined && purchases[id].cancel")
            input(type="submit" value="İptali Geri Al"  @click="cancelCancel()")
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
                tr(v-for="p in purchases" @click="selectPurchase(p._id)" :style="[p.cancel ? {'background-color': '#ff605c'} : {'background-color': ''}]" )
                    td(v-if="p.parent != undefined") {{ p.parent.name }} {{ p.parent.surname }}
                    td(v-if="p.student != undefined") {{ p.student.name }} {{ p.student.surname }}
                    td(v-if="p.packageName != undefined") {{p.packageName}}
                    td(v-if="p.fee != undefined") {{fixFee(p.fee)}}
                    td(v-if="p.purchaseDate != undefined") {{fixDate(p.purchaseDate)}}
                    td(v-if="p.endDate != undefined") {{fixDate(p.endDate)}}
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
      cancelDesc: "",
      cancelDate: "",
      waivedWage: 0,
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
      this.newFee = "";
      this.id = 0;
      this.parentName = "";
      this.studentName = "";
      this.life = 1;
      this.installment = 1;
      this.tett = "";
      this.purchaseDate = "";
      this.myBranches = [];
      this.getAll();
      this.cancelDesc = "";
      this.cancelDate = "";
      this.studentPhone = "";
      this.parentPhone = "";
      this.waivedWage = 0;
    },
    getAll: async function() {
      await this.$axios
        .get(`${process.env.OUR_HOST}/purchaseList`)
        .then(res => {
          this.purchases = res.data;
        });
    },
    change: async function(id, where, value) {
      await this.$axios
        .put(`${process.env.OUR_HOST}/updatePurchase`, { id, where, value })
        .then(res => {
          this.purchases = res.data;
        });
      this.close();
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
    selectPurchase: async function(id) {
      await this.close();
      this.id = id;
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
      if (this.purchases[id].cancel == true) {
        this.cancelDesc = this.purchases[id].cancelDesc;
        this.cancelDate = this.fixDate(this.purchases[id].cancelDate);
        this.waivedWage = this.purchases[id].waivedWage;
      }
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
        const grade = this.mygrade;
        if (grade != "") {
          if (confirm("Sınıf Değiştir"))
            this.change(this.id, "grade", this.mygrade);
        } else if (branch != []) {
          if (confirm("Branş Değiştir")) this.change(this.id, "branch", branch);
        }
      }
    },
    cParent: function() {
      const parent = this.parentId;
      if (confirm("Yeni Veli: " + this.parentName))
        this.change(this.id, "parent", parent);
    },
    cStudent: function() {
      const student = this.studentId;
      if (confirm("Yeni Öğrenci: " + this.studentName))
        this.change(this.id, "student", student);
    },
    cInstallment: function() {
      const installment = this.installment;
      if (confirm("Yeni Taksit: " + this.installment))
        this.change(this.id, "installment", installment);
    },
    cEDate: function() {
      const date = this.tett;
      if (confirm("Yeni Bitiş Tarihi: " + this.tett))
        this.change(this.id, "endDate", date);
    },
    cPDate: function() {
      const date = this.purchaseDate;
      if (confirm("Yeni Alım Tarihi: " + this.purchaseDate))
        this.change(this.id, "purchaseDate", date);
    },
    cNewFee: function() {
      const fee = this.newFee;
      if (confirm("Yeni Toplam Paket Fiyatı: " + fee))
        this.change(this.id, "fee", fee);
    },
    cancelPurch: function() {
      if (this.cancelDesc != "" && this.cancelDate != "") {
        this.change(this.id, "cancelDate", this.cancelDate);
        this.change(this.id, "cancelDesc", this.cancelDesc);
        this.change(this.id, "waivedWage", this.waivedWage);
        this.change(this.id, "cancel", true);
      } else {
        alert("İptal tarihi ve açıklaması boş bırakılamaz");
      }
    },
    cancelCancel: function() {
      if (confirm("Tüm iptal bilgileri silinecek")) {
        this.change(this.id, "cancelDate", undefined);
        this.change(this.id, "cancelDesc", undefined);
        this.change(this.id, "waivedWage", undefined);
        this.change(this.id, "cancel", false);
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
.container
    height: 72vh
    overflow: hidden
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
    height: 70vh
    width: 60vw
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
  background-color: black
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

::-webkit-scrollbar
  width: 5px
  border-radius: 1em

::-webkit-scrollbar-track
  background: #ffffff
  border-radius: 1em

::-webkit-scrollbar-thumb
  background: #000
  border-radius: 1em

::-webkit-scrollbar-thumb:hover
  background: #555
</style>
