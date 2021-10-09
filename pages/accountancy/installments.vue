<template lang="pug">
.cover
    .search
      input(type="text" placeholder="ara" v-model="searchText")
    .list
      .students(v-for="p in purchases" v-show="search(p.student.name, p.student.surname)")
        p(@click="drop(p.student._id)") {{p.student.name}} {{p.student.surname}} {{p.totalFee}} 
        .index(v-if="studentId == p.student._id")
          input(type="number" v-model="changeInstallment")
          input(type="date" v-model="date")
          .installments
            .installment(v-for="i in installment")
              label {{i}}. Taksit
              input(type="text" v-model="loans[i-1]" @input="changeLoan(i-1)")
              label {{dates[i-1]}}
          input(type="submit" value="Oluştur" @click="createPayment(p.parent._id, p.purchases)")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      changeInstallment: 1,
      installment: 1,
      date: "",
      total: 0,
      loans: [],
      dates: [],
      searchText: "",
      studentId: "",
      studentId: "",
      purchases: {},
      ourhost: process.env.OUR_URL
    };
  },
  methods: {
    ...mapActions("economics", ["getPayments"]),
    ...mapGetters("economics", ["payment"]),
    getPurchases: async function() {
      await this.$axios.get(`${process.env.OUR_HOST}/getActives`).then(res => {
        this.purchases = res.data;
      });
    },
    search: function(name, surname) {
      var tname = name.toLowerCase();
      var a = tname.split(" ");
      var tsurname = surname.toLowerCase();
      var b = tsurname.split(" ");
      var c = this.searchText.toLowerCase();
      if (
        c == a[0] ||
        c == a[1] ||
        c == b[0] ||
        c == b[1] ||
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
    createPayment: async function(user, purchase) {
      var newPayment = {};
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
    }
  },
  mounted() {
    this.getPurchases();
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
.list
    height: 70vh
    overflow: auto
.installments
    display: flex
    flex-direction: column
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
