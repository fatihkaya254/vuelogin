<template lang="pug">
.delayBody  
    p Gecikmiş Ödemeler
    .delayeds
        .title
            label Öğrenci
            label Tutar
            label Ödenen
            label Kalan
            label Taksit
            label Son Ödeme Tarihi
            label Gecikme
        .infoes(v-for="d in delayeds")
            .info(@click="setMessage(d._id)")
                label {{ d.student.name}} {{d.student.surname}}
                label {{d.installmentTotal}} 
                label {{d.paymentTotal}}
                label {{ parseInt(d.installmentTotal,10) - parseInt(d.paymentTotal,10)}}
                label {{ d.installmentOrder}}. Taksit
                label {{d.installmentDate.slice(0,10)}}
                label {{delayedDays(d.installmentDate)}} Gün
    .messageForm
      .name
        label {{name}} {{phone}}
      textarea(v-model="message" cols="50" rows="5")
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "",
      phone: "",
      message: "",
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
    setMessage: function(d){
      const delayed = this.delayeds[d]
      this.name = delayed.user.name + " " + delayed.user.surname
      this.phone = delayed.user.phone
      const delay = this.delayedDays(delayed.installmentDate)
      const total = parseInt(delayed.installmentTotal,10) - parseInt(delayed.paymentTotal,10)
      const student = delayed.student.name + " " + delayed.student.surname
      const date = new Date(delayed.installmentDate.slice(0,10)).toLocaleDateString('tr-TR', { month: 'long'}) + " " + new Date(delayed.installmentDate.slice(0,10)).getFullYear()
      this.message = "Sayın " + this.name + "; "
      this.message += student + " eğitim ücretinin " + date + " taksiti "
      this.message += delay + " gün gecikmede olup, "
      this.message += "ödenmesi gereken miktar " + total + "TL'dir. İşleyen Zihinler"
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
@import url(https://fonts.googleapis.com/css?family=Montserrat)

textarea
    width: 100%
    height: 150px
    line-height: 150%
    font-family: montserrat, arial, verdana
    resize: none
    padding: 7px 10px
    border: none
.name
    width: 100%
    padding: 7px 10px
    font-family: montserrat, arial, verdana
    font-size: 10pt
    background-color: white
    margin-bottom: 12px
.messageForm
    width: 90%
    background: rgba(23, 92, 63, 0.4)
    padding: 30px
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