<template lang="pug">
div  
    p Gecikmiş Ödemeler
    .delayeds
        .title
            label Öğrenci
            label Tutar
            label Ödenen
            label Kalan
            label Taksit
            label Son Ödeme Tarihi
            labal Gecikme
        .infoes(v-for="d in delayeds")
            .info
                label {{ d.student.name}} {{d.student.surname}}
                label {{d.installmentTotal}} 
                label {{d.paymentTotal}}
                label {{ parseInt(d.installmentTotal,10) - parseInt(d.paymentTotal,10)}}
                label {{ d.installmentOrder}}. Taksit
                label {{d.installmentDate.slice(0,10)}}
                label {{delayedDays(d.installmentDate)}} Gün
</template>

<script>
export default {
  components: {},
  data() {
    return {
      delayeds: {},
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
      ]
    };
  },
  methods: {
    getDelayeds: function() {
      this.$axios.get(`${process.env.OUR_HOST}/delayedPayments`).then(res => {
        this.delayeds = res.data;
      });
    },
    delayedDays: function(d) {
      const date1 = new Date(d.slice(0,10))
      const date2 = Date.now()
      const diffTime = Math.abs(date2 - date1);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  },
  mounted() {
    this.getDelayeds();
  }
};
</script>

<style lang="sass" scoped>
.title
    width: 100%
    display: grid
    margin-top: 16px
    grid-template-columns: 140px 75px 75px 75px 90px 150px 75px
.info
    width: 100%
    cursor: pointer
    display: grid
    margin-top: 16px
    grid-template-columns: 140px 75px 75px 75px 90px 150px 75px
    &:hover
        font-weight: 700
    label
        cursor: pointer
.delayeds
    height: 28vh
    overflow: auto

::-webkit-scrollbar
    height: 10px
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