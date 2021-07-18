<template lang="pug">
div 
    .card(v-for="purchase in getMyPurchase()")
        p {{purchase.packageName}}
        p {{purchase.packageDesc}}
        p Toplam Ücret: {{purchase.fee}}₺
        p(v-if="purchase.installment > 1") Taksit Tutarı: {{purchase.fee/purchase.installment}}₺
        div(v-for="branch in purchase.branch")
           p {{branch.grade.gradeName}} {{branch.branchName}}
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
    ...mapGetters("users", ["getMyPurchase"]),
    ...mapActions("users", ["getMyPurchases"]),
    ...mapGetters(["getAuthkey"]),
  },
  watch: {

  },
  mounted() {
    this.getMyPurchases(this.getAuthkey());
  },
  components: {payment}
};
</script>

<style lang="sass" scoped>
  .card
    border-radius: 1em
    border: 0.75px solid black
    padding: 8px
    margin-bottom: 15px
</style>
