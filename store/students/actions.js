export default {
  getGrades(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/grades`).then(res => {
      console.log(res);
      let grades = res.data;
      vuexContext.dispatch("putGrades", grades);
    });
  },
  putGrades(vuexContext, grades) {
    vuexContext.commit("setGrades", grades);
  },
  addGrade: function(vuexContext, grade) {
    this.$axios.post("/addGrade", { grade: grade }).then(res => {
      console.log(res.data.grade);
      vuexContext.dispatch("getGrades");
    });
  },

  getGroups(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/groups`).then(res => {
      console.log(res);
      let groups = res.data;
      vuexContext.dispatch("putGroups", groups);
    });
  },
  putGroups(vuexContext, groups) {
    vuexContext.commit("setGroups", groups);
  },
  addGroup: function(vuexContext, group) {
    this.$axios.post("/addGroup", { group: group }).then(res => {
      console.log(res.data.group);
      vuexContext.dispatch("getGroups");
    });
  },

  getGroupStudents(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/groupStudents`)
      .then(res => {
        console.log(res);
        let groupStudents = res.data;
        vuexContext.dispatch("putGroupStudents", groupStudents);
      });
  },
  putGroupStudents(vuexContext, groupStudents) {
    vuexContext.commit("setGroupStudents", groupStudents);
  },
  addGroupStudent: function(vuexContext, groupStudent) {
    this.$axios
      .post("/addGroupStudent", { groupStudent: groupStudent })
      .then(res => {
        console.log(res.data.groupStudent);
        vuexContext.dispatch("getGroupStudents");
      });
  },

  getSchoolCourses(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/schoolCourses`)
      .then(res => {
        console.log(res);
        let schoolCourses = res.data;
        vuexContext.dispatch("putsShoolCourses", schoolCourses);
      });
  },
  putSchoolCourses(vuexContext, schoolCourses) {
    vuexContext.commit("setSchoolCourses", schoolCourses);
  },
  addSchoolCourse: function(vuexContext, schoolCourse) {
    this.$axios
      .post("/addSchoolCourse", { schoolCourse: schoolCourse })
      .then(res => {
        console.log(res.data.schoolCourse);
        vuexContext.dispatch("getSchoolCourses");
      });
  },

  getStudents(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/students`).then(res => {
      console.log(res);
      let students = res.data;
      vuexContext.dispatch("putStudents", students);
    });
  },
  putStudents(vuexContext, students) {
    vuexContext.commit("setStudents", students);
  },
  addStudent: function(vuexContext, student) {
    this.$axios.post("/addStudent", { student: student }).then(res => {
      console.log(res.data.student);
      vuexContext.dispatch("getStudents");
    });
  }
};
