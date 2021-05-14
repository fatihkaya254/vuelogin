export default {
    getSendedSMSes(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/sendedSMSes`).then(res => {
        console.log(res);
        let sendedSMSes = res.data
        vuexContext.dispatch("putSendedSMSes", sendedSMSes)
      });
       },
       putSendedSMSes(vuexContext, sendedSMSes){
      vuexContext.commit("setSendedSMSes", sendedSMSes)
       },
       addSendedSMS: function(vuexContext, sendedSMSe) {
        this.$axios
          .post("/addSendedSMS", { sendedSMS: sendedSMS })
          .then(res => {
            console.log(res.data.sendedSMSe)
            vuexContext.dispatch("getSendedSMSes")
          });
      },
    
      getWaitingSMSes(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/waitingSMSes`).then(res => {
        console.log(res);
        let waitingSMSes = res.data
        vuexContext.dispatch("putWaitingSMSes", waitingSMSes)
      });
       },
       putWaitingSMSes(vuexContext, waitingSMSes){
      vuexContext.commit("setWaitingSMSes", waitingSMSes)
       },
       addWaitingSMS: function(vuexContext, waitingSMSe) {
        this.$axios
          .post("/addWaitingSMS", { waitingSMS: waitingSMS })
          .then(res => {
            console.log(res.data.waitingSMSe)
            vuexContext.dispatch("getWaitingSMSes")
          });
      },
};