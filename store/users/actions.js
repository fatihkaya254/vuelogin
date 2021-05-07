export default {
  getUsers(vuexContext) {
    console.log("getiriyoum admin efendim");
    return this.$axios.get("http://192.168.1.54:8000/api/users").then(res => {
      console.log(res);
      let users = res.data
      vuexContext.dispatch("putUsers", users)
    });
  },
  putUsers(vuexContext, users){
    vuexContext.commit("setUsers", users)
  },
  getRoles(vuexContext) {
    console.log("getiriyoum admin efendim");
    return this.$axios.get("http://192.168.1.54:8000/api/roles").then(res => {
      console.log(res);
      let roles = res.data
      vuexContext.dispatch("putRoles", roles)
    });
  },
  putRoles(vuexContext, roles){
    vuexContext.commit("setRoles", roles)
  }
};
