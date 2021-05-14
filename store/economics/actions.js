export default {
    Packagess(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/packagess`).then(res => {
        console.log(res);
        let packagess = res.data
        vuexContext.dispatch("Packagess", packagess)
      });
       },
       Packagess(vuexContext, packagess){
      vuexContext.commit("Packagess", packagess)
       },
       Packages: function(vuexContext, packages) {
        this.$axios
          .post("/Packages", { packages: packages })
          .then(res => {
            console.log(res.data.packages)
            vuexContext.dispatch("Packagess")
          });
      },

      getPrivateLessons(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/privateLessons`).then(res => {
        console.log(res);
        let privateLessons = res.data
        vuexContext.dispatch("putPrivateLessons", privateLessons)
      });
       },
       putPrivateLessons(vuexContext, privateLessons){
      vuexContext.commit("setPrivateLessons", privateLessons)
       },
       addPrivateLesson: function(vuexContext, privateLesson) {
        this.$axios
          .post("/addPrivateLesson", { privateLesson: privateLesson })
          .then(res => {
            console.log(res.data.privateLesson)
            vuexContext.dispatch("getPrivateLessons")
          });
      },

      getPurchasesses(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/purchasesses`).then(res => {
        console.log(res);
        let purchasesses = res.data
        vuexContext.dispatch("putPurchasesses", purchasesses)
      });
       },
       putPurchasesses(vuexContext, purchasesses){
      vuexContext.commit("setPurchasesses", purchasesses)
       },
       addPurchases: function(vuexContext, purchases) {
        this.$axios
          .post("/addPurchases", { purchases: purchases })
          .then(res => {
            console.log(res.data.purchases)
            vuexContext.dispatch("getPurchasesses")
          });
      },
};