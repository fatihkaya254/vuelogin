<template lang="pug">
div
    h4 Öğrenciler
    .listContainer
        ul
            li( v-for="purchase in  this.purchase()" v-if="purchase.student != undefined")
                .card()
                    p {{ purchase.student.name }} {{ purchase.student.surname}}
                    div(v-for="branch in purchase.branch")
                      p {{ branch.grade.gradeName }} {{ branch.branchName }}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: null,
      name: "",
      descripton: ""
    };
  },
  methods: {
    ...mapGetters("economics", ["purchase"]),
    ...mapActions("economics", ["getPurchases"]),
  },
  async mounted() {
    await this.getPurchases();
    let purchaseList = this.purchase()
    for (const [key, value] of Object.entries(purchaseList)) {
      if (value.student != undefined) {
        console.log(value.student.name);
      }
    }
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
</style>