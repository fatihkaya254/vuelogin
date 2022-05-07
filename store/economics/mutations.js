export default {
  setPackages(state, paket) {
    state.package = paket;
  },
  setPayments(state, payment) {
    state.payment = payment;
  },
  addNewPayment(state, payment){
    this.$set(state.payment[payment.student._id], payment._id, payment)
  },
  setPurchases(state, purchases) {
    state.purchase = purchases;
  },
  setLockedPackage(state, lockedPackage) {
    state.lockedPackage = state.package[lockedPackage];
  },
  setiFullName(state, iFullName) {
    state.iFullName = iFullName;
  },
  setiTaxOffice(state, iTaxOffice) {
    state.iTaxOffice = iTaxOffice
  },
  setiTaxNumber(state, iTaxNumber) {
    state.iTaxNumber = iTaxNumber
  },
  setiDate(state, iDate) {
    state.iDate = iDate
  },
  setiDesc(state, iDesc) {
    state.iDesc = iDesc
  },
  setiQuantity(state, iQuantity) {
    state.iQuantity = iQuantity
  },
  setiFee(state, iFee) {
    state.iFee = iFee
  },
  setia1(state, ia1) {
    state.ia1 = ia1
  },
  setia2(state, ia2) {
    state.ia2 = ia2
  },
  setia3(state, ia3) {
    state.ia3 = ia3
  },
  setiUserId(state, iUserId) {
    state.iUserId = iUserId
  }
};
