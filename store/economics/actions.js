export default {
  getPackages(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/packages`).then(res => {
      console.log(res.status);
      let packages = res.data;
      vuexContext.dispatch("putPackages", packages);
    });
  },
  putPackages(vuexContext, packages) {
    vuexContext.commit("setPackages", packages);
  },
  addPackage: function(vuexContext, thepackage) {
    this.$axios.post("/addPackage", { package: thepackage }).then(res => {
      console.log(res.status);
      vuexContext.dispatch("getPackages");
    });
  },

  getPayments(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/payments`).then(res => {
      console.log(res.status);
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
      console.log(res.status);
      let purchases = res.data;
      vuexContext.dispatch("putPurchases", purchases);
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
  },

  setLockedPackage(vuexContext, lockedPackage){
    vuexContext.commit("setLockedPackage", lockedPackage);
  },

  setiFullName(vuexContext, iFullName){
    vuexContext.commit("setiFullName", iFullName);
  },
  setiTaxOffice(vuexContext, iTaxOffice){
    vuexContext.commit("setiTaxOffice", iTaxOffice);
  },
  setiTaxNumber(vuexContext, iTaxNumber){
    vuexContext.commit("setiTaxNumber", iTaxNumber);
  },
  setiDate(vuexContext, iDate){
    vuexContext.commit("setiDate", iDate);
  },
  setiDesc(vuexContext, iDesc){
    vuexContext.commit("setiDesc", iDesc);
  },
  setiQuantity(vuexContext, iQuantity){
    vuexContext.commit("setiQuantity", iQuantity);
  },
  setiFee(vuexContext, iFee){
    vuexContext.commit("setiFee", iFee);
  },
  setia1(vuexContext, ia1){
    vuexContext.commit("setia1", ia1);
  },
  setia2(vuexContext, ia2){
    vuexContext.commit("setia2", ia2);
  },
  setia3(vuexContext, ia3){
    vuexContext.commit("setia3", ia3);
  },
  setiUserId(vuexContext, iUserId){
    vuexContext.commit("setiUserId", iUserId);
  }
};