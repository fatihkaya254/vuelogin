export default {
    setUsers(state, user) {
      state.user = user
    },
    setRoles(state, role) {
      state.role = role
    },
    setBranchProgresses(state, branchProgress) {
      state.branchProgress = branchProgress
    },
    setEducationBacks(state, educationBack) {
      state.educationBack = educationBack
    },
    setParents(state, parent) {
      state.parent = parent
    },
    setParentShips(state, parentShip) {
      state.parentShip = parentShip
    },
    setSubjectProgresses(state, subjectProgress) {
      state.subjectProgress = subjectProgress
    },
    setTeachers(state, teacher) {
      state.teacher = teacher
    },
    setTeacherBranches(state, teacherBranch) {
      state.teacherBranch = teacherBranch
    },
    setGenerated(state, generated) {
      state.isGenerated = generated
    },
    setChangeNumberMessage(state, changes){
      state.changeNumberMessage = changes
    },    
    setMyPurchases(state, changes){
      state.myPurchases = changes
    }

  };