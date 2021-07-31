export default {
  getUsers(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/users`).then(res => {
      let users = res.data;
      vuexContext.dispatch("putUsers", users);
    });
  },
  putUsers(vuexContext, users) {
    vuexContext.commit("setUsers", users);
  },
  addUser: function(vuexContext, user) {
    this.$axios.post("/addUser", { user: user }).then(res => {
      console.log(res.data.user);
      vuexContext.dispatch("getUsers");
    });
  },
  changeUserInfo(vuexContext, changes) {
    let id = changes.id;
    let where = changes.where;
    let value = changes.value;
    this.$axios
      .put(
        "/updateProfile",
        { id, where, value },
        { withCredentials: true, credentials: "include" }
      )
      .then(res => {
        console.log(res);
        if (res.data.message == "generated") {
          vuexContext.commit("setChangeNumberMessage", "Doğrulama Kodu");
          vuexContext.commit("setGenerated", "true");
        }
        vuexContext.dispatch("getUsers");
        vuexContext.dispatch("refreshUser", null, { root: true });
      });
  },

  changePhoneCheck(vuexContext, changes) {
    let id = changes.id;
    let code = changes.code;
    let phone = changes.phone;
    this.$axios
      .put(
        "/changePhoneCheck",
        { id, code, phone },
        { withCredentials: true, credentials: "include" }
      )
      .then(res => {
        console.log(res);
        if (res.data.message == "alreadyUsed") {
          vuexContext.commit("setChangeNumberMessage", "Bu Numara Kullanılmaktadır");
        } else {
          vuexContext.commit("setChangeNumberMessage", "Doğrulama Kodu");
          vuexContext.dispatch("getUsers");
          vuexContext.dispatch("refreshUser", null, { root: true });
        }
      });
  },

  getRoles(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/roles`).then(res => {
      let roles = res.data;
      vuexContext.dispatch("putRoles", roles);
    });
  },
  putRoles(vuexContext, roles) {
    vuexContext.commit("setRoles", roles);
  },
  addRole: function(vuexContext, role) {
    this.$axios.post("/addRole", { role: role }).then(res => {
      console.log(res.data.role);
      vuexContext.dispatch("getRoles");
    });
  },

  getBranchProgresses(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/branchProgresses`)
      .then(res => {
        let branchProgresses = res.data;
        vuexContext.dispatch("putBranchProgresses", branchProgresses);
      });
  },
  putBranchProgresses(vuexContext, branchProgresses) {
    vuexContext.commit("setBranchProgresses", branchProgresses);
  },
  addBranchProgres: function(vuexContext, branchProgress) {
    this.$axios
      .post("/addBranchProgres", { branchProgress: branchProgress })
      .then(res => {
        console.log(res.data.branchProgress);
        vuexContext.dispatch("getBranchProgres");
      });
  },

  getEducationBacks(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/educationBacks`)
      .then(res => {
        let educationBacks = res.data;
        vuexContext.dispatch("putEducationBacks", educationBacks);
      });
  },
  putEducationBacks(vuexContext, educationBacks) {
    vuexContext.commit("setEducationBacks", educationBacks);
  },
  addEducationBack: function(vuexContext, educationBack) {
    this.$axios
      .post("/addEducationBack", { educationBack: educationBack })
      .then(res => {
        console.log(res.data.educationBack);
        vuexContext.dispatch("getEducationBacks");
      });
  },

  getParents(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/parents`).then(res => {
      let parents = res.data;
      vuexContext.dispatch("putParents", parents);
    });
  },
  putParents(vuexContext, parents) {
    vuexContext.commit("setParents", parents);
  },
  addParent: function(vuexContext, parent) {
    this.$axios.post("/addParent", { parent: parent }).then(res => {
      console.log(res.data.parent);
      vuexContext.dispatch("getParents");
    });
  },

  getParentShips(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/parentShips`).then(res => {
      let parentShips = res.data;
      vuexContext.dispatch("putParentShips", parentShips);
    });
  },
  putParentShips(vuexContext, parentShips) {
    vuexContext.commit("setParenShipts", parentShips);
  },
  addParentShip: function(vuexContext, parentShip) {
    this.$axios.post("/addParentShip", { parentShip: parentShip }).then(res => {
      console.log(res.data.parentShip);
      vuexContext.dispatch("getParentsShip");
    });
  },

  getSubjectProgresses(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/subjectProgresses`)
      .then(res => {
        console.log(res);
        let subjectProgresses = res.data;
        vuexContext.dispatch("putSubjectProgresses", subjectProgresses);
      });
  },
  putSubjectProgresses(vuexContext, subjectProgresses) {
    vuexContext.commit("setSubjectProgresses", subjectProgresses);
  },
  addSubjectProgress: function(vuexContext, subjectProgress) {
    this.$axios
      .post("/addSubjectProgress", { subjectProgress: subjectProgress })
      .then(res => {
        console.log(res.data.subjectProgress);
        vuexContext.dispatch("getSubjectProgresses");
      });
  },

  getTeachers(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/teachers`).then(res => {
      console.log(res);
      let teachers = res.data;
      vuexContext.dispatch("putTeachers", teachers);
    });
  },
  putTeachers(vuexContext, teachers) {
    vuexContext.commit("setTeachers", teachers);
  },
  addTeacher: function(vuexContext, teacher) {
    this.$axios.post("/addTeacher", { teacher: teacher }).then(res => {
      console.log(res.data.teacher);
      vuexContext.dispatch("getTeachers");
    });
  },

  getTeacherBraches(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/teacherBraches`)
      .then(res => {
        console.log(res);
        let teacherBraches = res.data;
        vuexContext.dispatch("putTeacherBraches", teacherBraches);
      });
  },
  putTeacherBraches(vuexContext, teacherBraches) {
    vuexContext.commit("setTeacherBraches", teacherBraches);
  },
  addTeacherBrach: function(vuexContext, teacherBrach) {
    this.$axios
      .post("/addTeacherBrach", { teacherBrach: teacherBrach })
      .then(res => {
        console.log(res.data.teacherBrach);
        vuexContext.dispatch("getTeacherBraches");
      });
  },

  getMyPurchases(vuexContext, id) {
    return this.$axios
      .post(`${process.env.OUR_HOST}/myPurchases`, { id: id})
      .then(res => {
        console.log(res);
        let myPurchases = res.data;
        vuexContext.dispatch("putMyPurchases", myPurchases);
      });
  },
  putMyPurchases(vuexContext, myPurchases) {
    vuexContext.commit("setMyPurchases", myPurchases);
  },

  getMyPayments(vuexContext, id) {
    return this.$axios
      .post(`${process.env.OUR_HOST}/myPayments`, { id: id})
      .then(res => {
        console.log(res);
        let myPayments = res.data;
        vuexContext.dispatch("putMyPayments", myPayments);
      });
  },
  putMyPayments(vuexContext, myPayments) {
    vuexContext.commit("setMyPayments", myPayments);
  },

};
