<template lang="pug">
.body
  div(v-for="g in general_data" @click="click(g.period)")
    .container
      .block
          h5 {{g.period}}
      .block
          .string Alacak
          .number {{doThousandsRegExp(g.total)}}₺
      .block
          .string Ödenen
          .number {{doThousandsRegExp(g.ptotal)}}₺
      .block
          .string Kalan
          .number {{doThousandsRegExp(g.remainder)}}₺
    .container(style="background: #d6ffff;" v-show="period == g.period")

          table
            thead
              tr
                th Öğrenci
                th Alacak
                th Ödenen
                th Tarih
                th Kalan
            tbody
              tr(v-for="p in json_data[g.period]")
                td {{p.student}}
                td {{doThousandsRegExp(p.total)}}₺
                td {{doThousandsRegExp(p.ptotal)}}₺
                td {{p.installmentDate}}
                td {{doThousandsRegExp(p.total - p.ptotal)}}₺

</template>
<script>
import downloadexcel from "vue-json-excel";
export default {
  middleware: ["session-control", "lookAuth"],
  components: {
    downloadexcel
  },
  data() {
    return {
      period: "",
      totalInstallments: [],
      totalPayment: [],
      wholeMonths: {
        installments: 0,
        payments: 0
      },
      trMonths: [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ],
      json_fields: {
        Öğrenci: "student",
        Tutar: "total",
        "Ödenen Tutar": "ptotal",
        "Taksit Tarihi": "installmentDate",
        "Ödeme Tarihi": "paymentDate",
        Açıklama: "paymentMethod"
      },
      general_fields: {
        Dönem: "period",
        "Beklenen Tahsilat": "total",
        "Tahsil Edilen": "ptotal",
        Kalan: "remainder"
      },
      general_data: [],
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  methods: {
    doThousandsRegExp: function(n) {
      if(n) return n.toLocaleString("tr-TR");
    },
    click: function(n) {
      if (n == this.period) n = 0;
      console.log(n);
      this.period = n;
    },
    getPaylogs: async function() {
      var months = {};
      this.$axios.get(`${process.env.OUR_HOST}/payments`).then(res => {
        for (const [key, value] of Object.entries(res.data)) {
          for (const [subkey, subvalue] of Object.entries(value)) {
            var date = new Date(subvalue.installmentDate.slice(0, 10));
            var data = {};
            data.paymentDate = "-";
            if (subvalue.paymentDate != undefined) {
              var datep = new Date(subvalue.paymentDate.slice(0, 10));
              data.paymentDate =
                datep.getDate() +
                " " +
                this.trMonths[datep.getMonth()] +
                " " +
                datep.getFullYear();
            }
            data.total = subvalue.installmentTotal;
            data.ptotal = subvalue.paymentTotal;
            data.paymentMethod = subvalue.paymentMethod;
            data.student =
              subvalue.student.name + " " + subvalue.student.surname;
            data.installmentDate =
              date.getDate() +
              " " +
              this.trMonths[date.getMonth()] +
              " " +
              date.getFullYear();
            this.json_data.push(data);
            if (
              months[
                this.trMonths[date.getMonth()] + "-" + date.getFullYear()
              ] == undefined
            )
              months[
                this.trMonths[date.getMonth()] + "-" + date.getFullYear()
              ] = [];
            months[
              this.trMonths[date.getMonth()] + "-" + date.getFullYear()
            ].push(data);
            if (
              this.totalInstallments[
                this.trMonths[date.getMonth()] + "-" + date.getFullYear()
              ] == undefined
            )
              this.totalInstallments[
                this.trMonths[date.getMonth()] + "-" + date.getFullYear()
              ] = 0;
            this.totalInstallments[
              this.trMonths[date.getMonth()] + "-" + date.getFullYear()
            ] += parseInt(subvalue.installmentTotal, 10);
            if (
              this.totalPayment[
                this.trMonths[date.getMonth()] + "-" + date.getFullYear()
              ] == undefined
            )
              this.totalPayment[
                this.trMonths[date.getMonth()] + "-" + date.getFullYear()
              ] = 0;
            this.totalPayment[
              this.trMonths[date.getMonth()] + "-" + date.getFullYear()
            ] += parseInt(subvalue.paymentTotal, 10);
          }
        }
        for (const key in months) {
          this.wholeMonths.installments += this.totalInstallments[key];
          this.wholeMonths.payments += this.totalPayment[key];
          var general = {
            period: key,
            total: this.totalInstallments[key],
            ptotal: this.totalPayment[key],
            remainder: this.totalInstallments[key] - this.totalPayment[key]
          };
          this.general_data.push(general);
          var last = {
            student: "TOPLAM",
            total: this.totalInstallments[key],
            ptotal: this.totalPayment[key],
            installmentDate: "",
            paymentDate: "",
            paymentMethod: ""
          };
          months[key].push(last);
        }
        this.general_data.push({
          period: "Toplam",
          total: this.wholeMonths.installments,
          ptotal: this.wholeMonths.payments,
          remainder: this.wholeMonths.installments - this.wholeMonths.payments
        });
        this.json_data = months;
      });
    },
    sort: function() {
      console.log(this.json_data);
      var data = this.json_data;
      for (const [k, v] in data) {
        console.log(v);
      }
    }
  },
  async mounted() {
    await this.getPaylogs();
    this.sort();
  }
};
</script>

<style lang="sass" scoped>
$table-concept-max-height: 420px
$table-background-color: #ffffff
$table-hover-background-color: darken($table-background-color, 8%)
$table-even-background-color: darken($table-background-color, 4%)
$table-header-color: #ffffff
$table-header-background-color: #2f2f2f
$table-title-color: #ffffff
$table-title-background-color: #2f2f2f
.pop
  height: 60vh
  width: 60vw
  background-color: white
  position: absolute
  z-index: 1
  right: 20vw
  border-radius: 8px
  box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
  overflow: hidden
.chartPop
  height: 60vh
  width: 60vw
  background-color: white
  position: absolute
  z-index: 1
  right: 20vw
  border-radius: 8px
  box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
  overflow: auto
.close
  width: 60vw
  background-color: #EF5350
  color: white
  justify-content: center
  align-items: center
  text-align: center
  font-family: "Lato", Arial
  padding: 12px

.list
  height: 50vh
  overflow: auto
  justify-content: center
  text-align: center
  margin-top: 16px
  ol
    display: table
    margin: 0 auto
    padding: 0
  li
    margin: 10px
.subs
  transition: all 0.5s ease
  .blockSub
    transition: all 0.5s ease
    text-align: center
    height: 100%
    width: 200px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    @media screen and (max-width: 1200px)
      height: 60px
    &:hover
      color: #EF5350
    .number
      font-size: 16px
      font-weight: 700
    .string
      font-size: 12px
      line-height: 24px
      color: gray
.body
  padding: 50px
  width: 100vw
  min-height: 100vh
  justify-content: center
  align-items: center
  background: #EF5350
  font-family: "Lato", Arial
  color: #263238
  transition: all 0.5s ease
  .generals
    transition: all 0.5s ease
    width: 60vw
    display: flex
    gap: 20px
    margin: auto
    @media screen and (max-width: 1200px)
      flex-direction: column
      width: 100vw
      gap: 0px
  .container
    transition: all 0.5s ease
    margin: auto
    margin-bottom: 20px
    display: flex
    flex-direction: row
    justify-content: space-around
    width: 60vw
    background: white
    align-items: center
    border-radius: 8px
    box-shadow: 0px 10px 30px rgba(70, 0, 0, .3)
    @media screen and (min-width: 1200px)
      min-height: 100px
    @media screen and (max-width: 1200px)
      flex-direction: column
      justify-content: flex-start
      width: 90%
      min-height: 100px
    table
      background-color: $table-background-color
      border-collapse: collapse
      tr
        &:last-child
          td
            border-bottom: 0
        th, td
          text-align: left
          padding: 15px
          box-sizing: border-box
        th
          color: $table-header-color
          background-color: $table-header-background-color
          border-bottom: solid 2px #d8d8d8
          top: 0
        td
          border: solid 1px #d8d8d8
          border-left: 0
          border-right: 0
      tbody tr
        transition: background-color 150ms ease-out
        &:nth-child(2n)
          background-color: $table-even-background-color
        &:hover
          background-color: $table-hover-background-color



    .block
      transition: all 0.5s ease
      text-align: center
      height: 100%
      width: 200px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      @media screen and (max-width: 1200px)
        height: 80px
      &:hover
        color: #EF5350
      .number
        font-size: 24px
        font-weight: bold
      .string
        font-size: 12px
        line-height: 24px
        color: gray

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
