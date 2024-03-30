<template lang="pug">
.body
  div(v-for="data, year in yearly") 
    .container(style="background: #dae3ff;" v-if="year != 'pay' && year != 'fee'" @click="yearSelect(year)")
        .block
            h5 {{year}}
        .block
            .string Alacak
            .number {{doThousandsRegExp(data.fee)}}₺
        .block
            .string Ödenen
            .number {{doThousandsRegExp(data.pay)}}₺
        .block
            .string Kalan
            .number {{doThousandsRegExp(data.fee-data.pay)}}₺
    div(v-if="yearCheck(year)" )
      div(v-for="dat, month in data" )
        .container(v-if="month != 'pay' && month != 'fee'" @click="monthSelect(month+'-'+year)")
            .block
              h5 {{trMonths[month-1]}} - {{ year }}
            .block
                .string Alacak
                .number {{doThousandsRegExp(dat.fee)}}₺
            .block
                .string Ödenen
                .number {{doThousandsRegExp(dat.pay)}}₺
            .block
                .string Kalan
                .number {{doThousandsRegExp(dat.fee-dat.pay)}}₺
            .block
                .string Excell
                .number
                  downloadexcel(
                      class="btn btn-default"
                      :key="trMonths[month-1]"
                      :data="excell[year][month]"
                      :fields="json_fields"
                      :worksheet="trMonths[month-1]"
                      :name="trMonths[month-1]+'-'+ year+'.xls'"
                    )
        .container(style="background: #d6ffff;" v-if="monthCheck(month+'-'+year)")
          table
            thead
              tr
                th Öğrenci
                th Alacak
                th Ödenen
                th Tarih
                th Kalan
            tbody
              tr(v-for="p, key in dat" v-if="key != 'pay' && key != 'fee'" )
                td {{users[p.student]}}
                td {{doThousandsRegExp(p.fee)}}₺
                td {{doThousandsRegExp(p.pay)}}₺
                td {{formatDate(p.date)}}
                td {{doThousandsRegExp(p.fee - p.pay)}}₺
               

  div
    .container
        .block
            h5 Toplam
        .block
            .string Alacak
            .number {{doThousandsRegExp(yearly.fee)}}₺
        .block
            .string Ödenen
            .number {{doThousandsRegExp(yearly.pay)}}₺
        .block
            .string Kalan
            .number {{doThousandsRegExp(yearly.fee-yearly.pay)}}₺

</template>
<script>
import downloadexcel from "vue-json-excel";
export default {
  middleware: ["session-control", "lookAuth"],
  components: {
    downloadexcel,
  },
  data() {
    return {
      names: {},
      yearly: {
        pay: 0,
        fee: 0,
      },
      excell: {},
      years: [],
      months: [],
      users: {},
      period: "",
      totalInstallments: [],
      totalPayment: [],
      wholeMonths: {
        installments: 0,
        payments: 0,
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
        "Aralık",
      ],
      json_fields: {
        Öğrenci: "student",
        Tutar: "fee",
        "Ödenen Tutar": "pay",
        "Taksit Tarihi": "date",
      },
      general_fields: {
        Dönem: "period",
        "Beklenen Tahsilat": "fee",
        "Tahsil Edilen": "pay",
        Kalan: "remainder",
      },
      general_data: [],
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  methods: {
    doThousandsRegExp: function (n) {
      if (n) return n.toLocaleString("tr-TR");
    },


    getMonthAndYear(dateStr) {
      const date = new Date(dateStr);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return { month, year };
    },
    addSubObject(main, sub) {
      // Ana obje içinde "2021" adında bir obje var mı kontrol edelim
      if (!main.hasOwnProperty(sub)) {
        main[sub] = {
          pay: 0,
          fee: 0,
        }; // Yoksa, boş bir obje ekleyelim
      }
    },
    monthSelect: function (month) {
      const indeks = this.months.indexOf(month);
      if (indeks !== -1) {
        // Eğer 3 değeri dizide bulunuyorsa, bu değeri çıkaralım
        this.months.splice(indeks, 1);
      } else {
        this.months.push(month);
      }
    },
    monthCheck: function (month) {
      return this.months.includes(month);
    },
    yearSelect: function (year) {
      const indeks = this.years.indexOf(year);
      if (indeks !== -1) {
        // Eğer 3 değeri dizide bulunuyorsa, bu değeri çıkaralım
        this.years.splice(indeks, 1);
      } else {
        this.years.push(year);
      }
    },
    yearCheck: function (year) {
      return this.years.includes(year);
    },
    addData: function (object, year, month, value) {
      let student, date, fee, pay;
      student = value.student;
      date = value.installmentDate;
      fee = value.installmentTotal;
      pay = value.paymentTotal;
      object.fee += fee;
      object.pay += pay;
      object[year].fee += fee;
      object[year].pay += pay;
      object[year][month].fee += fee;
      object[year][month].pay += pay;
      object[year][month][value._id] = { student, date, fee, pay };
    },
    addExcell: function (object, year, month, value) {
      let student, date, fee, pay;
      student = this.users[value.student];
      date = this.formatDate(value.installmentDate) + ' ' + year;
      fee = value.installmentTotal;
      pay = value.paymentTotal;
      object[year][month].push({ student, date, fee, pay });
    },
    summary: async function () {
      const res = await this.$axios("/summary");
      const payments = res.data.payments;
      const yearly = {
        pay: 0,
        fee: 0,
      };
      let excell = {};
      for (const [key, val] of Object.entries(payments)) {
        const iDate = this.getMonthAndYear(val.installmentDate);
        this.addSubObject(yearly, iDate.year);
        this.addSubObject(yearly[iDate.year], iDate.month);
        this.addData(yearly, iDate.year, iDate.month, val);
        //for excell
        this.addSubObject(excell, iDate.year);
        if (!excell[iDate.year].hasOwnProperty(iDate.month))
          excell[iDate.year][iDate.month] = [];
        this.addExcell(excell, iDate.year, iDate.month, val);
      }
      this.yearly = yearly;
      this.excell = excell;
    },
    formatDate: function (tarihStr) {
      let tarih = new Date(tarihStr);
      return tarih.toLocaleDateString("tr-TR", {
        month: "long",
        day: "numeric",
      });
    },
    getNames: async function () {
      const res = await this.$axios.get("getAllNames");
      this.users = res.data.userNames;
    },
  },
  async mounted() {
    await this.getNames();
    this.summary();
  },
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
