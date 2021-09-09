<template lang="pug">
.container
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
                tr(v-for="p in purchases")
                    td {{ p.parent.name }} {{ p.parent.surname }}
                    td(v-if="p.student != undefined") {{ p.student.name }} {{ p.student.surname }}
                    td {{p.packageName}}
                    td {{fixFee(p.fee)}}
                    td {{fixDate(p.purchaseDate)}}
                    td {{fixDate(p.endDate)}}
</template>

<script>
export default {
  data() {
    return {
      purchases: []
    };
  },
  async mounted() {
    await this.getAll();
  },
  methods: {
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
      return day + "/" + month + "/" + year;
    },
    fixFee: function(x) {
      return x.toLocaleString("tr-TR") + " ₺";
    }
  }
};
</script>

<style lang="sass" scoped>

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
</style>
