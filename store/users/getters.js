export default {
    getUser(state, id) {
        console.log('id: ' + id)
        return " a + " + id
    },
    getRole(state, id) {
        console.log('id: ' + id)
        return " a + " + id
    },
    getGenerated(state){
        return state.isGenerated
    },
    getMyPurchase(state){
        return state.myPurchases
    },    
    getMyPayment(state){
        return state.myPayments
    },
    getChangeNumberMessage(state){
        return state.changeNumberMessage
    },
  };