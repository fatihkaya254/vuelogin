<template lang="pug">
div  
    div(v-for="(d, dn) in json_data") 
      downloadexcel(
        v-if="json_data != []"
        class="btn btn-default"
        :key="dn"
        :data="d"
        :fields="json_fields"
        :worksheet="dn"
        :name="dn+'.xls'"
      )
    downloadexcel(
      class="btn btn-default"
      key="genel"
      :data="general_data"
      :fields="general_fields"
      worksheet="Genel"
      name="Genel"
    )
</template>

<script>
import downloadexcel from "vue-json-excel";
export default {
  components: {
    downloadexcel
  },
  data() {
    return {
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
    getPaylogs: function() {
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
        console.log(this.wholeMonths);
      });
    }
  },
  mounted() {
    this.getPaylogs();
  }
};
</script>
