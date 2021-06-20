export default {
  getPackages(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/packages`).then(res => {
      console.log(res);
      let packages = res.data;
      vuexContext.dispatch("putPackages", packages);
    });
  },
  putPackages(vuexContext, packages) {
    vuexContext.commit("setPackages", packages);
  },
  addPackages: function(vuexContext, packages) {
    this.$axios.post("/addPackages", { packages: packages }).then(res => {
      console.log(res.data.packages);
      vuexContext.dispatch("getPackages");
    });
  },

  getPayments(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/payments`).then(res => {
      console.log(res);
      let payments = res.data;
      vuexContext.dispatch("putPayments", payments);
    });
  },
  putPayments(vuexContext, payments) {
    vuexContext.commit("setPayments", payments);
  },
  addPayment: function(vuexContext, payment) {
    this.$axios.post("/addPayment", { payment: payment }).then(res => {
      console.log(res.data.payment);
      vuexContext.dispatch("getPayments");
    });
  },

  getPurchases(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/purchases`).then(res => {
      console.log(res);
      let purchases = res.data;
      vuexContext.dispatch("putGurchases", purchases);
    });
  },
  putPurchases(vuexContext, purchases) {
    vuexContext.commit("setPurchases", purchases);
  },
  addPurchase: function(vuexContext, purchase) {
    this.$axios.post("/addPurchase", { purchase: purchase }).then(res => {
      console.log(res.data.purchase);
      vuexContext.dispatch("getPurchases");
    });
  }
};
