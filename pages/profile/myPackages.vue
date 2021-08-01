<template lang="pug">
.cardContainer 
    .card(v-for="purchase in getMyPurchase()")
        p {{purchase.packageName}}
        p {{purchase.packageDesc}}
        p(v-if="purchase.student != undefined") {{purchase.student.name}} {{purchase.student.surname}}
        p Toplam Ücret: {{purchase.fee}}₺
        p(v-if="purchase.installment > 1") Taksit Tutarı: {{purchase.fee/purchase.installment}}₺
        div(v-for="branch in purchase.branch")
           p {{branch.grade.gradeName}} {{branch.branchName}}
        br
        div(v-for="payment in getMyPayment()" v-show="payment.purchase._id == purchase._id")
            p Ödeme: {{payment.paymentTotal}}₺ | {{payment.paymentDate}}
    .studentInfo
        .profilePhoto
          img(:src=" ourhost + this.$store.getters.userPic" v-show="this.$store.getters.userPic")
        .profileContent
          p fatih kaya
          p 0502340403043
          p fatihkata@gkfl.cpdf
          p 23.03.2003

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import payment from "../../components/payment.vue"
export default {
  data() {
    return {
      file: "",
      name: "",
      ourhost:  process.env.OUR_URL,
    };
  },
  methods: {
    ...mapGetters("users", ["getMyPurchase", "getMyPayment"]),
    ...mapActions("users", ["getMyPurchases", "getMyPayments"]),
    ...mapGetters(["getAuthkey"]),
  },
  watch: {

  },
  mounted() {
    this.getMyPurchases(this.getAuthkey());
    this.getMyPayments(this.getAuthkey());
  },
  components: {payment}
};
</script>

<style lang="sass" scoped>
  $gray: rgb(142, 142, 147)
  $gray2: rgb(174, 174, 178)
  $gray6: rgb(242, 242, 247)
  $gray4: rgb(209, 209, 214)
  $gray6-dark: rgb(28, 28, 30)

  .profileContent
    background-color: white

  .studentInfo
    padding: 10px
    border-radius: 1em
    position: absolute
    z-index: 3
    left: 150px
    top: 50px
    width: 300px
    background-color: $gray4

  .cardContainer
    overflow: auto
    height: 80%
    
  .card
    border-radius: 1em
    border: 0.75px solid black
    padding: 8px
    margin-bottom: 15px
    position: relative
    margin: 5px

  .profilePhoto
    height: 72px
    width: 72px
    border-radius: 50%
    margin: auto
    margin-top: 20px
    margin-bottom: 6px
    cursor: pointer
    & img
        height: 72px
        width: 72px
        border-radius: 50%

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
