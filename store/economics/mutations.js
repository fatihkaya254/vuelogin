export default {
  setPackages(state, paket) {
    state.package = paket;
  },
  setPayments(state, payment) {
    state.payment = payment;
  },
  setPurchases(state, purchases) {
    state.purchase = purchases;
  },
  setLockedPackage(state, lockedPackage) {
    state.lockedPackage = state.package[lockedPackage];
  }
};
