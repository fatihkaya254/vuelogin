<template lang="pug">
.cover
    .messageBox(v-show="generating")
      label Oluşturuluyor...
    .search
      input(type="text" placeholder="ara" v-model="searchText")
    .list
      .students(v-for="p in purchases" :style="[(payment()[p.parent._id] != undefined) ? {'background-color': 'antiquewhite'} : {'background-color': '#FF665A'}]"  v-show="search(p.student.name, p.student.surname, p.parent.name, p.parent.surname)")
        .title(@click="drop(p.student._id)")
          p {{p.parent.name}} {{p.parent.surname}} ({{p.student.name}} {{p.student.surname}}) {{p.totalFee}} 
        .index(v-if="studentId == p.student._id")
          .create(v-if="payment()[p.parent._id] == undefined")
            input(type="number" v-model="changeInstallment")
            input(type="date" v-model="date")
            .installments
              .installment(v-for="i in installment")
                label {{i}}. Taksit
                input(type="text" v-model="loans[i-1]" @input="changeLoan(i-1)")
                label {{dates[i-1]}}
            input(type="submit" value="Oluştur" @click="createPayment(p.parent._id, p.purchases, p.student._id)")
          .set(v-if="payment()[p.student._id] != undefined")
            .installments
              .installment(v-for="i in payment()[p.student._id]" :style="[i.closed ? {'background-color': '#3EB595'} : {'background-color': 'antiquewhite'}]")
                .title(@click="subDrop(i._id)")
                  label {{i.installmentOrder}}. Taksit 
                  label {{i.installmentTotal}}₺
                .pay(v-if="installmentId == i._id")
                  label Yapılmış Ödeme {{i.paymentTotal}} - {{fixDate(i.paymentDate)}}
                  label Ödeme Miktarı
                  input(type="text" v-model="paymentTotal")
                  label Ödeme Tarihi
                  input(type="date" v-model="paymentDate")
                  label Ödeme Şekli
                  select(name="method" v-model="paymentMethod")
                    option(value="kart") Banka/Kredi Kartı
                    option(value="nakit") Elden Nakit
                    option(value="havale") Para Transferi
                    option(value="cek") Çek
                    option(value="iyzico") Webpos
                  input(type="submit" value="Ödeme Onayla" @click="appPay(i.paymentTotal, i.installmentOrder, i.installmentTotal)")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      paymentMethod: "",
      paymentTotal: "",
      installmentId: "",
      changeInstallment: 1,
      installment: 1,
      date: "",
      paymentDate: "",
      total: 0,
      loans: [],
      dates: [],
      searchText: "",
      studentId: "",
      studentId: "",
      purchases: {},
      ourhost: process.env.OUR_URL,
      generating: false
    };
  },
  methods: {
    ...mapActions("economics", ["getPayments"]),
    ...mapGetters("economics", ["payment"]),
    ...mapGetters(["userId"]),
    getPurchases: async function() {
      await this.$axios.get(`${process.env.OUR_HOST}/getActives`).then(res => {
        this.purchases = res.data;
      });
    },
    fixDate: function(mydate) {
      let datetime = mydate;
      let date = datetime.split("-");
      let year = date[0];
      let month = date[1];
      let day = date[2].charAt(0) + date[2].charAt(1);
      return day + "/" + month + "/" + year;
    },
    search: function(name, surname, pn, ps) {
      var tname = name.toLowerCase();
      var a = tname.split(" ");
      var tsurname = surname.toLowerCase();
      var b = tsurname.split(" ");
      var tname = pn.toLowerCase();
      var d = tname.split(" ");
      var tsurname = ps.toLowerCase();
      var e = tsurname.split(" ");
      var c = this.searchText.toLowerCase();
      if (
        c == a[0] ||
        c == a[1] ||
        c == b[0] ||
        c == b[1] ||
        c == e[0] ||
        c == e[1] ||
        c == d[0] ||
        c == d[1] ||
        c == "" ||
        c == a + " " + b
      ) {
        return true;
      }
      return false;
    },
    drop: function(student) {
      var p = this.purchases[student];
      if (this.studentId == student) {
        this.studentId = "";
        this.installment = 1;
        this.total = 0;
        this.date = "";
        this.loans = [];
      } else {
        this.studentId = student;
        this.loans = [];
        this.total = p.totalFee;
        this.date = p.date;
        this.installment = p.life;
        if (p.installment != 0) this.installment = p.installment;
      }
    },
    subDrop: function(id) {
      if (this.installmentId == id) {
        this.installmentId = "";
      } else {
        this.installmentId = id;
      }
    },
    changeLoan: function(index) {
      var afters = 0;
      for (let a = index; a >= 0; a--) {
        afters += parseInt(this.loans[a], 10);
      }
      var befores = (this.total - afters) / (this.installment - index - 1);
      for (let b = index + 1; b < this.installment; b++) {
        this.loans[b] = befores;
      }
    },
    createPayment: async function(user, purchase, student) {
      this.generating = true;
      var newPayment = {};
      newPayment.student = student
      newPayment.user = user;
      newPayment.purchase = purchase;
      for (let i = 0; i < this.installment; i++) {
        newPayment.installmentTotal = this.loans[i];
        newPayment.installmentDate = new Date(this.dates[i]);
        newPayment.installmentOrder = i + 1;
        await this.$axios
          .post(`${process.env.OUR_HOST}/addPayment`, {
            payment: newPayment
          })
          .then(res => {
            if (res.status == 201) {
              console.log(res.status);
            }
          });
      }
      await this.getPayments();
      this.generating = false;
    },
    appPay: async function(paymentTotal, installmentOrder, installmentTotal) {
      var changes = {};
      changes.closed = false;
      var ept = parseInt(paymentTotal, 10);
      var pt = parseInt(this.paymentTotal, 10);
      var it = parseInt(installmentTotal, 10);
      if (this.paymentDate == "") return alert("Tarih Giriniz");
      if (this.paymentMethod == "") return alert("Ödeme Şeklini Giriniz");
      if (pt + ept > it) return alert("Ödeme Miktarı Ödenmemiş Tutardan Fazla");
      if (pt + ept == it) changes.closed = true;
      changes.paymentTotal = pt+ept;
      changes.paymentDate = this.paymentDate;
      changes.paymentMethod = this.paymentMethod;
      changes.approver = this.userId();
      await this.$axios
        .put(`${process.env.OUR_HOST}/updatePayment`, {
          id: this.installmentId,
          changes
        })
        .then(res => {
          console.log(res);
        });
      this.getPayments();
    }
  },
  mounted() {
    this.getPurchases();
    this.getPayments();
  },
  watch: {
    changeInstallment(value) {
      var i = parseInt(value, 10);
      this.installment = i;
    },
    installment(value) {
      this.changeInstallment = value;
      for (let l = 0; l < this.installment; l++) {
        this.loans[l] = this.total / this.installment;
        var date = new Date(this.date);
        date.setMonth(date.getMonth() + l);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        this.dates[l] = year + "-" + month + "-" + day;
      }
    },
    date(value) {
      for (let l = 0; l < this.installment; l++) {
        var date = new Date(value);
        date.setMonth(date.getMonth() + l);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        this.dates[l] = year + "-" + month + "-" + day;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.title
  cursor: pointer
  height: 30px
  padding-left: 8px
  &:hover
    border: 0.4px dotted black
.pay
  display: flex
  flex-direction: column
  gap: 7px
  margin-top: 10px
.messageBox
    height: 40px
    width: 120px
    padding-top: 10px
    background-color: black
    color: white
    position: absolute
    align-content: center
    text-align: center
.list
    height: 70vh
    overflow: auto
.installments
    display: flex
    flex-direction: column
    gap: 10px
    margin-top: 10px
    margin-bottom: 10px
.students
    background-color: antiquewhite
    min-height: 40px
    padding: 6px
    padding-left: 4px
    margin: 10px
    input
      height: 12px
      border: none
      -webkit-appearance: none
      padding: 12px
      margin: 6px
      border-radius: 1px

      &:focus
        -webkit-appearance: none

      &[type="submit"]
        background-color: black
        color: white
        height: 24px
        padding: 0
        &:hover
          cursor: pointer
          background-color: white
          color: black
.search
    input
      height: 16px
      border: none
      min-width: 50%
      -webkit-appearance: none
      padding: 12px
      margin: 16px
      border-radius: 1px

      &:focus
        -webkit-appearance: none

      &[type="submit"]
        background-color: black
        color: white

        &:hover
          cursor: pointer

::-webkit-scrollbar
    height: 2px
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
