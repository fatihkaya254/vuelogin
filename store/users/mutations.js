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
    },
    setTeachersLessons(state, changes){
      state.teachersLessons = changes
    },
    setMyPayments(state, changes){
      for (const [key, value] of Object.entries(changes)) {
        let datetime = value.paymentDate
        let date = datetime.split("-")
        let year = date[0]
        let month = date[1]
        let day = date[2].charAt(0) + date[2].charAt(1)
        let newDate=  day + "." + month + "." + year;
        changes[key].paymentDate = newDate
      }
      state.myPayments = changes
    }

  };