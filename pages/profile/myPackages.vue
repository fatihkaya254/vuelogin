<template lang="pug">
.cardContainer 
    .card(v-for="purchase in getMyPurchase()")
        p {{purchase.packageName}}
        p {{purchase.packageDesc}}
        p Toplam Ücret: {{purchase.fee}}₺
        p(v-if="purchase.installment > 1") Taksit Tutarı: {{purchase.fee/purchase.installment}}₺
        div(v-for="branch in purchase.branch")
           p {{branch.grade.gradeName}} {{branch.branchName}}
        div(v-for="payment in getMyPayment()" v-show="payment.purchase._id == purchase._id")
            p {{payment.paymentTotal}}₺ | {{payment.paymentDate}}
        
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import payment from "../../components/payment.vue"
export default {
  data() {
    return {
      file: "",
      name: "",

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
