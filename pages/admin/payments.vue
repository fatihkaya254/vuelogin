<template lang="pug">
div
    p Ödemeler
    div(v-for="payment in payment()")
        | {{payment.paymentTotal}}
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapActions("economics", ["getPayments", "addPayment"]),
    ...mapGetters("economics", ["payment"]),
    throwAddPackage: function() {
    }
  },
  mounted() {
    this.getPayments();
  }
};
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
.card
    width: 240px
    border: 1px solid black
    border-radius: 1em
    margin: 20px
    padding: 10px
.listContainer
    margin-top: 50px
    overflow: auto
    width: 400px
    height: 600px
    float: left
    margin: 20px
    padding: 10px
.updateUser
    float: left
    margin: 20px
    padding: 10px
    & input label
        display: inline-block
</style>
