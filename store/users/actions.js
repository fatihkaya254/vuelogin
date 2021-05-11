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
      return this.$axios.get("http://192.168.1.54:8000/api/roles").then(res => {
      console.log(res);
      let roles = res.data
      vuexContext.dispatch("putRoles", roles)
    });
  },
  putRoles(vuexContext, roles){
    vuexContext.commit("setRoles", roles)
  },
 getBranchProgresses(vuexContext) {
    return this.$axios.get("http://192.168.1.54:8000/api/branchProgresses").then(res => {
    console.log(res);
    let branchProgresses = res.data
    vuexContext.dispatch("putBranchProgresses", branchProgresses)
    });
  },
 putBranchProgresses(vuexContext, branchProgresses){
  vuexContext.commit("setBranchProgresses", branchProgresses)
  },
  
 getEducationBacks(vuexContext) {
    return this.$axios.get("http://192.168.1.54:8000/api/educationBacks").then(res => {
    console.log(res);
    let educationBacks = res.data
    vuexContext.dispatch("putEducationBacks", educationBacks)
  });
 },
 putEducationBacks(vuexContext, educationBacks){
  vuexContext.commit("setEducationBacks", educationBacks)
 },

 getParents(vuexContext) {
  return this.$axios.get("http://192.168.1.54:8000/api/parents").then(res => {
  console.log(res);
  let parents = res.data
  vuexContext.dispatch("putParents", parents)
});
 },
 putParents(vuexContext, parents){
vuexContext.commit("setParents", parents)
 },

 getParentShips(vuexContext) {
  return this.$axios.get("http://192.168.1.54:8000/api/parentShips").then(res => {
  console.log(res);
  let parentShips = res.data
  vuexContext.dispatch("putParentShips", parentShips)
});
 },
 putParentShips(vuexContext, parentShips){
vuexContext.commit("setParenShipts", parentShips)
 },

 getSubjectProgresses(vuexContext) {
  return this.$axios.get("http://192.168.1.54:8000/api/subjectProgresses").then(res => {
  console.log(res);
  let subjectProgresses = res.data
  vuexContext.dispatch("putSubjectProgresses", subjectProgresses)
});
 },
 putSubjectProgresses(vuexContext, subjectProgresses){
vuexContext.commit("setSubjectProgresses", subjectProgresses)
 },

 getTeachers(vuexContext) {
  return this.$axios.get("http://192.168.1.54:8000/api/teachers").then(res => {
  console.log(res);
  let teachers = res.data
  vuexContext.dispatch("putTeachers", teachers)
});
 },
 putTeachers(vuexContext, teachers){
vuexContext.commit("setTeachers", teachers)
 },
 
 getTeacherBraches(vuexContext) {
  return this.$axios.get("http://192.168.1.54:8000/api/teacherBraches").then(res => {
  console.log(res);
  let teacherBraches = res.data
  vuexContext.dispatch("putTeacherBraches", teacherBraches)
});
 },
 putTeacherBraches(vuexContext, teacherBraches){
vuexContext.commit("setTeacherBraches", teacherBraches)
 },







  
};
