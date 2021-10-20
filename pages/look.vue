<template lang="pug">
.body
    .chartPop(v-show="chartPop")
      .close(@click="chartPop = false") Kapat
      GChart( type="LineChart", :data="chartData", :options="chartOptions")
    .pop(v-show="popup")
      .close(@click="close()") Kapat
      .list
        ol
          li(v-for="l in list") {{l.name}} | {{doThousandsRegExp(l.fee)}}₺
    .generals
        .container(@click="setChart('total')")
            .block(v-if="generals.total != undefined")
                .string Aktif Sözleşme Toplamı
                .number {{generals.total.toLocaleString("tr-TR")}}₺
        .container
            .block(v-if="generals.group != undefined")
                .string Grup Ders Toplam
                .number {{doThousandsRegExp(generals.group)}}₺
        .container
            .block(v-if="generals.priv != undefined")
                .string Özel Ders Toplam
                .number {{doThousandsRegExp(generals.priv)}}₺
    .generals
        .container(@click="setChart('group')")
            .block(v-if="generals.perGroup != undefined")
                .string 1 Grup Programı  Yıllık Ücreti
                .number {{doThousandsRegExp(generals.perGroup)}}₺
        .container(@click="students()")
            .block(v-if="generals.students != undefined")
                .string Öğrenci Sayısı
                .number {{doThousandsRegExp(generals.students)}}
        .container(@click="parents()")
            .block(v-if="generals.parents != undefined")
                .string Veli Sayısı
                .number {{doThousandsRegExp(generals.parents)}}
    .generals
        .container
            .block(v-if="generals.perHourPriv != undefined")
                .string 1 Saat Özel Ders Ücreti
                .number {{doThousandsRegExp(generals.perHourPriv)}}₺
        .container(@click="setChart('student')")
            .block(v-if="generals.perStudent != undefined")
                .string Öğrenci Başına Yıllık
                .number {{doThousandsRegExp(generals.perStudent)}}₺
        .container
            .block(v-if="generals.perParent != undefined")
                .string Veli Başına Yıllık
                .number {{doThousandsRegExp(generals.perParent)}}₺
    .generals
        .container(@click="cparents()")
            .block(v-if="generals.totalWaived != undefined")
                .string Vazgeçilen Ödemeler
                .number {{doThousandsRegExp(generals.totalWaived)}}₺
        .container(@click="cstudents2()")
            .block(v-if="generals.totalUnWaived != undefined")
                .string İptallerde Tahsil Edilen
                .number {{doThousandsRegExp(generals.totalUnWaived)}}₺
        .container(@click="cstudents()")
            .block(v-if="generals.cstudents != undefined")
                .string İptal Eden Öğrenci
                .number {{doThousandsRegExp(generals.cstudents)}}
    .container(@click="a = !a") Grup Programları
    .subs(v-if="generals.grades && a")
        .container(v-for="g in generals.grades")
            .block(style="border-bottom: 0.5px solid black")
                h5 {{g.name}} Grup Programı
            .block
                .string Öğrenci Sayısı
                .number {{g.students}}
            .block
                .string Ortalama Ücret
                .number {{doThousandsRegExp(parseInt(g.totalFee/g.students, 10))}}₺
            .block
                .string Toplam Ücret
                .number {{doThousandsRegExp(g.totalFee)}}₺
    
    .container(@click="b = !b") Sınıf-Branş Özel Ders
    .subs(v-if="generals.branches && b")
        .container(v-for="b in generals.branches")
            .block(style="border-bottom: 0.5px solid black")
                h5 {{b.name}} Özel Ders
            .block
                .string Haftalık Ders Saati
                .number {{b.hours}}
            .block
                .string Saatlik Ücret
                .number {{doThousandsRegExp(b.perHour)}}₺
            .block
                .string Toplam Ücret
                .number {{doThousandsRegExp(b.total)}}₺
    .container(@click="c = !c") Branş Özel Ders
    .subs(v-if="generals.generalBranches && c")
        .container(v-for="c in generals.generalBranches")
            .block(style="border-bottom: 0.5px solid black")
                h5 {{c.name}} Özel Ders
            .block
                .string Haftalık Ders Saati
                .number {{c.hours}}
            .block
                .string Saatlik Ücret
                .number {{doThousandsRegExp(c.perHour)}}₺
            .block
                .string Toplam Ücret
                .number {{doThousandsRegExp(c.total)}}₺

</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { GChart } from "vue-google-charts";

export default {
  middleware: ["session-control", "managerAuth"],
  components: {
    Navbar,
    GChart
  },
  data() {
    return {
      chartData: [["Tarih", "Günlük", "Toplam"]],
      chartOptions: {
        chart: {
          title: "Sözleşmeler",
          subtitle: "Gün bazında sözleşmeler"
        },
        displayAnnotations: true,
        width: 150,
        height: 2100
      },
      string: "",
      generals: {},
      list: {},
      chartPop: false,
      popup: false,
      a: false,
      b: false,
      c: false,
    };
  },
  methods: {
    openChart: function() {
      this.chartPop = true;
      if (process.client) {
        this.chartOptions.height = window.innerHeight * 0.5;
        this.chartOptions.width = window.innerWidth * 0.58;
      }
    },
    parents: function() {
      this.popup = true;
      var list = Object.keys(this.generals.pList).map(key => [
        key,
        this.generals.pList[key]
      ]);
      list.sort((b, a) => a[1].fee - b[1].fee);
      list.forEach(element => {
        this.list[element[0]] = element[1];
      });
    },
    cparents: function() {
      this.popup = true;
      var list = Object.keys(this.generals.cpList).map(key => [
        key,
        this.generals.cpList[key]
      ]);
      list.sort((b, a) => a[1].fee - b[1].fee);
      list.forEach(element => {
        this.list[element[0]] = element[1];
      });
    },
    students: function() {
      this.popup = true;
      var list = Object.keys(this.generals.sList).map(key => [
        key,
        this.generals.sList[key]
      ]);
      list.sort((b, a) => a[1].fee - b[1].fee);
      list.forEach(element => {
        this.list[element[0]] = element[1];
      });
    },
    cstudents: function() {
      this.popup = true;
      var list = Object.keys(this.generals.csList).map(key => [
        key,
        this.generals.csList[key]
      ]);
      list.sort((b, a) => a[1].fee - b[1].fee);
      list.forEach(element => {
        this.list[element[0]] = element[1];
      });
    },
    cstudents2: function() {
      this.popup = true;
      var list = Object.keys(this.generals.csList2).map(key => [
        key,
        this.generals.csList2[key]
      ]);
      list.sort((b, a) => a[1].fee - b[1].fee);
      list.forEach(element => {
        this.list[element[0]] = element[1];
      });
    },
    close: function() {
      this.popup = false;
      this.list = {};
    },
    sortObj: function(obj) {
      return Object.keys(obj)
        .sort()
        .reduce(function(result, key) {
          result[key] = obj[key];
          return result;
        }, {});
    },
    setChart: function(x) {
      this.openChart();
      this.chartData = [];
      if (x == "group") {
        this.chartData[0] = ["Tarih", "Ortalama"];
        var gpm = this.sortObj(this.generals.groupPM);
        var gpmc = this.sortObj(this.generals.groupPMC);
        var totalGroupCount = 0;
        var totalGroupValue = 0;
        for (const [key, value] of Object.entries(gpm)) {
          totalGroupCount += gpmc[key];
          totalGroupValue += value;
          var data = [
            new Date(key),
            parseInt(totalGroupValue / totalGroupCount, 10)
          ];
          this.chartData.push(data);
        }
      } else if (x == "total") {
        this.chartData[0] = ["Tarih", "Günlük", "Toplam"];
        var ct = this.sortObj(this.generals.cronosTotal);
        var total = 0;
        for (const [key, value] of Object.entries(ct)) {
          total += value;
          var data = [new Date(key), value, total];
          this.chartData.push(data);
        }
      } else if (x == "student") {
        this.chartData[0] = ["Tarih", "Ortalama"];
        var ct = this.sortObj(this.generals.cronosTotal);
        var cs = this.sortObj(this.generals.cronosStudent);
        var total = 0;
        var student = 0;
        var cronos = [];
        for (const [key, value] of Object.entries(ct)) {
          total += value;
          cronos[key] = total;
        }
        for (const [key, value] of Object.entries(cs)) {
          student += value;
          var average = parseInt(cronos[key]/student, 10)
          var data = [new Date(key), average];
          this.chartData.push(data)
        }
      }
    },
    getSummary: async function() {
      try {
        await this.$axios
          .get(`${process.env.OUR_HOST}/yearlyEarns`)
          .then(res => {
            this.generals = res.data;
            console.log(res.data);
            var ct = this.sortObj(this.generals.cronosTotal);
            var total = 0;
            for (const [key, value] of Object.entries(ct)) {
              total += value;
              var data = [new Date(key), value, total];
              this.chartData.push(data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    doThousandsRegExp: function(n) {
      return n.toLocaleString("tr-TR");
    }
  },
  mounted() {
    this.getSummary();
  }
};
</script>

<style lang="sass" scoped>
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
      height: 100px
    @media screen and (max-width: 1200px)
      flex-direction: column
      min-height: 60px
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
        height: 100px
      &:hover
        color: #EF5350
      .number
        font-size: 32px
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
