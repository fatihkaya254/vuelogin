export default {
  setPackages(state, paket) {
    state.package = paket;
  },
  setPayments(state, payment) {
    state.payment = payment;
  },
  setPurchasess(state, purchases) {
    state.purchases = purchases;
  },
  setLockedPackage(state, lockedPackage) {
    state.lockedPackage = state.package[lockedPackage];
  }
};
