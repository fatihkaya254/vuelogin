<template lang="pug">
.cover
    .invoice(v-show="iPop")
      .close(@click="closeIPop()") Kapat
      invoice
    .messageBox(v-show="generating")
      label Oluşturuluyor...
    .search
      input(type="text" placeholder="ara" v-model="searchText")
    .list
      .students(v-for="p in purchases" :style="[(payment()[p.student._id] != undefined) ? {'background-color': 'antiquewhite'} : {'background-color': '#FF665A'}]"  v-show="search(p.student.name, p.student.surname, p.parent.name, p.parent.surname)")
        .title(@click="drop(p.student._id)") 
          p {{p.parent.name}} {{p.parent.surname}} ({{p.student.name}} {{p.student.surname}}) {{p.totalFee}}  
          p(style="color: red; font-size: 9pt; font-weight: 700;") {{paymentProgress(p.student._id)}}
        .index(v-if="studentId == p.student._id")
          .create(v-if="payment()[p.student._id] == undefined")
            input(type="number" v-model="changeInstallment")
            input(type="date" v-model="date")
            .installments
              .installment(v-for="i in installment")
                label {{i}}. Taksit
                input(type="text" v-model="loans[i-1]" @input="changeLoan(i-1)")
                label {{dates[i-1]}}
            input(type="submit" value="Oluştur" @click="createPayment(p.parent._id, p.purchases, p.student._id)")
          .set(v-if="payment()[p.student._id] != undefined && !edit")
            .installments
              input(type="submit" value="Düzenle" @click="startEdit(p.student._id, p.totalFee)" style="background: #00000046")
              .installment(v-for="i in payment()[p.student._id]" :style="[i.closed ? {'background-color': '#3EB595'} : {'background-color': 'antiquewhite'}]")
                .title(@click="subDrop(i._id)")
                  label {{i.installmentOrder}}. Taksit 
                  label {{i.installmentTotal}}₺
                  label {{fixDate(i.installmentDate)}}
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
                  input(type="submit" value="Fatura Düzenle" @click="invoice(i)")
          .set(v-if="payment()[p.student._id] != undefined && edit")
            .installment(v-for="i in payment()[p.student._id]" :style="[i.closed ? {'background-color': '#3EB595'} : {'background-color': 'antiquewhite'}]")
              .title
                label {{i.installmentOrder}}. Taksit
                input(type="text" v-model="newIns[i._id]" v-if="!i.closed")
                input(type="date" v-model="newDates[i._id]" v-if="!i.closed")
                label(v-if="i.closed") {{i.installmentTotal}}
            input(type="submit" value="Yeni Taksit Ekle" @click="addNewPayment(payment()[p.student._id])")
            input(type="submit" value="Kaydet" @click="saveEdits()")
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { log } from '../../api/middlewares/log';
import invoice from "../../components/invoice";
export default {
  components: {
    invoice,
  },
  data() {
    return {
      edit: false,
      iPop: false,
      paymentMethod: "",
      paymentTotal: "",
      installmentId: "",
      changeInstallment: 1,
      installment: 1,
      date: "",
      paymentDate: "",
      a1: "",
      a2: "",
      a3: "",
      taxOffice: "",
      taxNumber: "",
      total: 0,
      packageColor: [],
      loans: [],
      dates: [],
      searchText: "",
      studentId: "",
      studentId: "",
      purchases: {},
      generating: false,
      newIns: {},
      newDates: {},
      remains: 0,
    };
  },
  methods: {
    ...mapActions("economics", ["getPayments"]),
    ...mapMutations("economics", ["addNewPayment"]),
    ...mapGetters("economics", ["payment"]),
    ...mapGetters(["userId"]),
    ...mapGetters("economics", [
      "iFullName",
      "iTaxOffice",
      "iTaxNumber",
      "iDate",
      "iDesc",
      "iQuantity",
      "iFee",
      "ia1",
      "ia2",
      "ia3",
      "iUserId",
    ]),
    ...mapActions("economics", [
      "setiFullName",
      "setiTaxOffice",
      "setiTaxNumber",
      "setiDate",
      "setiDesc",
      "setiQuantity",
      "setiFee",
      "setia1",
      "setia2",
      "setia3",
      "setiUserId",
    ]),
    addNewPayment: async function (p) {
      var order = 0;
      var val = {};
      var installment = {};
      for (const [key, v] of Object.entries(p)) {
        if (order < +v.installmentOrder) {
          order = +v.installmentOrder;
          val = v;
        }
      }
      installment.purchase = val.purchase[0]._id;
      installment.user = val.user._id;
      installment.student = val.student._id;
      installment.installmentTotal = val.installmentTotal;
      installment.installmentDate = this.nextMonth(val.installmentDate);
      installment.installmentOrder = ++order;
      await this.$axios
        .post(`${process.env.OUR_HOST}/addPayment`, {
          payment: installment,
        })
        .then((res) => {
          if (res.status == 201) {
            //this.addNewPayment(res.data.payment)
            this.getPayments()
          }
        });
    },
    nextMonth: function (d) {
      var date = new Date(d);
      return new Date(date.setMonth(date.getMonth() + 1));
    },
    isin: function name(pur, inst) {
      if (inst) {
        const pt = JSON.stringify(pur);
        const it = JSON.stringify(inst);
        const i = JSON.parse(it);
        const p = JSON.parse(pt);
        if (!Object.entries(p).length) return p;
        for (const [k, v] of Object.entries(p)) {
          if (!Object.entries(p).length) return p;
          var count = 0;
          for (const [key, val] of Object.entries(i)) {
            if (!Object.entries(p).length) return p;
            val.purchase.forEach((element) => {
              if (element._id == v) {
                delete p[k];
                //console.log(Object.entries(p).length);
                if (!Object.entries(p).length) {
                  count++;
                  return p;
                }
              }
            });
          }
        }
        //console.log(Object.entries(p).length);
        //console.log("x" + count);
        return p;
      }
      return 0;
    },
    startEdit: function (student, total) {
      this.edit = true;
      var remains = 0;
      const p = this.payment()[student];
      for (const pId in p) {
        this.newDates[pId] = this.cdfi(p[pId].installmentDate);
        if (p[pId].closed) {
          total -= p[pId].paymentTotal;
        } else {
          remains++;
        }
      }
      this.remains = remains;
      var first = parseInt(total / remains);
      while ((total - first) % (remains - 1) != 0 && total - first > 0) {
        first++;
      }
      var others = (total - first) / (remains - 1);
      var isFirst = 1;
      for (const pId in p) {
        if (!p[pId].closed) {
          this.newIns[pId] = others;
          if (isFirst) this.newIns[pId] = first;
          isFirst = 0;
        }
      }
    },
    paymentProgress: function (student) {
      const inst = this.payment()[student];
      if (inst == undefined) {
        return "";
      }
      var pay = 0;
      var tot = 0;
      var rem = 0;
      for (const [key, val] of Object.entries(inst)) {
        tot += val.installmentTotal;
        pay += val.paymentTotal;
      }
      rem = tot - pay;
      if (rem == 0) {
        this.packageColor[student] = true;
      }
      return "TT: " + tot + " ÖT: " + pay + " ---> K: " + rem;
    },
    saveEdits: async function () {
      for (const key in this.newIns) {
        var changes = {
          installmentTotal: this.newIns[key],
          installmentDate: this.newDates[key],
        };
        await this.$axios
          .put(`${process.env.OUR_HOST}/updatePayment`, {
            id: key,
            changes,
          })
          .then((res) => {
            console.log(res);
          });
      }
      this.edit = false;
      this.getPayments();
      this.getPurchases();
    },
    invoice: function (p) {
      this.closeIPop();
      this.setiFee("" + (p.paymentTotal / 108) * 100);
      this.setiUserId(p.user._id);
      this.setiFullName(p.user.name + " " + p.user.surname);
      if (p.user.invoiceInfo != undefined) {
        this.setiTaxOffice(p.user.invoiceInfo.taxOffice);
        this.setiTaxNumber(p.user.invoiceInfo.taxNumber);
        this.setia1(p.user.invoiceInfo.addressLine1);
        this.setia2(p.user.invoiceInfo.addressLine2);
        this.setia3(p.user.invoiceInfo.addressLine3);
      }
      this.iPop = true;
    },
    closeIPop: function () {
      this.iPop = false;
      this.setiTaxOffice("");
      this.setiTaxNumber("");
      this.setia1("");
      this.setia2("");
      this.setia3("");
      this.setiFee("");
      this.setiUserId("");
      this.setiFullName("");
    },
    getPurchases: async function () {
      await this.$axios
        .get(`${process.env.OUR_HOST}/getActives`)
        .then((res) => {
          this.purchases = res.data;
        });
    },
    fixDate: function (mydate) {
      if (mydate == undefined) return "Ödeme Yapılmadı";
      let datetime = mydate;
      let date = datetime.split("-");
      let year = date[0];
      let month = date[1];
      let day = date[2].charAt(0) + date[2].charAt(1);
      return day + "/" + month + "/" + year;
    },
    search: function (name, surname, pn, ps) {
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
    drop: function (student) {
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
    subDrop: function (id) {
      if (this.installmentId == id) {
        this.installmentId = "";
      } else {
        this.installmentId = id;
      }
    },
    changeLoan: function (index) {
      var afters = 0;
      for (let a = index; a >= 0; a--) {
        afters += parseInt(this.loans[a], 10);
      }
      var befores = (this.total - afters) / (this.installment - index - 1);
      for (let b = index + 1; b < this.installment; b++) {
        this.loans[b] = befores;
      }
    },
    createPayment: async function (user, purchase, student) {
      this.generating = true;
      var newPayment = {};
      newPayment.student = student;
      newPayment.user = user;
      newPayment.purchase = purchase;
      for (let i = 0; i < this.installment; i++) {
        newPayment.installmentTotal = this.loans[i];
        newPayment.installmentDate = new Date(this.dates[i]);
        newPayment.installmentOrder = i + 1;
        await this.$axios
          .post(`${process.env.OUR_HOST}/addPayment`, {
            payment: newPayment,
          })
          .then((res) => {
            if (res.status == 201) {
              console.log(res.status);
            }
          });
      }
      await this.getPayments();
      this.generating = false;
    },
    appPay: async function (paymentTotal, installmentOrder, installmentTotal) {
      var changes = {};
      changes.closed = false;
      var ept = parseInt(paymentTotal, 10);
      var pt = parseInt(this.paymentTotal, 10);
      var it = parseInt(installmentTotal, 10);
      if (this.paymentDate == "") return alert("Tarih Giriniz");
      if (this.paymentMethod == "") return alert("Ödeme Şeklini Giriniz");
      if (pt + ept > it) return alert("Ödeme Miktarı Ödenmemiş Tutardan Fazla");
      if (pt + ept == it) changes.closed = true;
      changes.paymentTotal = pt + ept;
      changes.paymentDate = this.paymentDate;
      changes.paymentMethod = this.paymentMethod;
      changes.approver = this.userId();
      await this.$axios
        .put(`${process.env.OUR_HOST}/updatePayment`, {
          id: this.installmentId,
          changes,
          pay: pt,
        })
        .then((res) => {
          console.log(res);
        });
      this.getPayments();
    },
    cdfi: function (dt) {
      let date = dt.split("-");
      let year = date[0];
      let month = date[1];
      let day = date[2].charAt(0) + date[2].charAt(1);
      return year + "-" + month + "-" + day;
    },
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
    },
  },
};
</script>

<style lang="sass" scoped>
.title
  display: flex
  justify-content: flex-start
  cursor: pointer
  padding-left: 8px
  align-items: center
  p
    width: 45%
  &:hover
    border: 0.4px dotted black
  input
      width: 30%
      font-family: montserrat, arial, verdana
      padding: 7px 10px
      border: none
  label
      width: 100px
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
    height: 65vh
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

.invoice
  height: 60vh
  overflow: auto
  position: absolute
  z-index: 2
  background: white
.generate
  overflow: auto
  position: absolute
  z-index: 3
  background: gray
  padding: 20px
  width: 500px
.close
  background: white
  height: 30px
  padding: 10px
  text-align: center
  cursor: pointer
  &:hover
    font-weight: 700

input
    width: 100%
    line-height: 150%
    font-family: montserrat, arial, verdana
    padding: 7px 10px
    border: none

input[type="submit"]
    cursor: pointer
    margin-top: 5px
    margin-left: 0
    &:hover
        background-color: #edd0d0

label
    font-family: montserrat, arial, verdana
    font-size: 10pt
    margin: 5px
</style>
