export default {
  getExams(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/exams`).then(res => {
      console.log(res.status);
      let exams = res.data;
      vuexContext.dispatch("putExams", exams);
    });
  },
  putExams(vuexContext, exams) {
    vuexContext.commit("setExams", exams);
  },
  addExam: function(vuexContext, exam) {
    this.$axios.post("/addExam", { exam: exam }).then(res => {
      console.log(res.data.exam);
      vuexContext.dispatch("getExams");
    });
  },

  getQuestions(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/questions`).then(res => {
      console.log(res.status);
      let questions = res.data;
      vuexContext.dispatch("putQuestions", questions);
    });
  },
  putQuestions(vuexContext, questions) {
    vuexContext.commit("setQuestions", questions);
  },
  addQuestion: function(vuexContext, question) {
    console.log('ddf' + question);
    this.$axios
      .post("/addQuestion", question, {
       Headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      )
      .then(res => {
        console.log(res.data.question);
        vuexContext.dispatch("getQuestions");
      });
  },
  changeQuestionInfo(vuexContext, changes) {
    let id = changes.id;
    let where = changes.where;
    let value = changes.value;
    console.log("value in store: " + value);
    this.$axios
      .put(
        "/updateQuestion",
        { id, where, value },
        { withCredentials: true, credentials: "include" }
      )
      .then(res => {
        console.log(res.status);
        vuexContext.dispatch("getQuestions");
      });
  },
  deleteQuestion(vuexContext, id) {
    this.$axios
      .put(
        "/deleteQuestion",
        { id: id },
        { withCredentials: true, credentials: "include" }
      )
      .then(res => {
        console.log(res.data.message);
        vuexContext.dispatch("getQuestions");
      });
  },

  getQuestionSubtopics(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/questionSubtopics`)
      .then(res => {
        console.log(res.status);
        let questionSubtopics = res.data;
        vuexContext.dispatch("putQuestionSubtopics", questionSubtopics);
      });
  },
  putQuestionSubtopics(vuexContext, questionSubtopics) {
    vuexContext.commit("setQuestionSubtopics", questionSubtopics);
  },
  addQuestionSubtopic: function(vuexContext, questionSubtopic) {
    this.$axios
      .post("/addQuestionSubtopic", { questionSubtopic: questionSubtopic })
      .then(res => {
        console.log(res.data.questionSubtopic);
        vuexContext.dispatch("getQuestionSubtopics");
      });
  },

  getStudentAnswers(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/studentAnswers`)
      .then(res => {
        console.log(res.status);
        let studentAnswers = res.data;
        vuexContext.dispatch("putStudentAnswers", studentAnswers);
      });
  },
  putStudentAnswers(vuexContext, studentAnswers) {
    vuexContext.commit("setStudentAnswers", studentAnswers);
  },
  addStudentAnswer: function(vuexContext, studentAnswer) {
    this.$axios
      .post("/addStudentAnswer", { studentAnswer: studentAnswer })
      .then(res => {
        console.log(res.data.studentAnswer);
        vuexContext.dispatch("getStudentAnswers");
      });
  },

  getTests(vuexContext) {
    return this.$axios.get(`${process.env.OUR_HOST}/tests`).then(res => {
      console.log(res.status);
      let tests = res.data;
      vuexContext.dispatch("putTests", tests);
    });
  },
  putTests(vuexContext, tests) {
    vuexContext.commit("setTests", tests);
  },
  addTest: function(vuexContext, test) {
    this.$axios.post("/addTest", { test: test }).then(res => {
      console.log(res.data.test);
      vuexContext.dispatch("getTests");
    });
  },

  getTestQuestions(vuexContext) {
    return this.$axios
      .get(`${process.env.OUR_HOST}/testQuestions`)
      .then(res => {
        console.log(res.status);
        let testQuestions = res.data;
        vuexContext.dispatch("putTestQuestions", testQuestions);
      });
  },
  putTestQuestions(vuexContext, testQuestions) {
    vuexContext.commit("setTestQuestions", testQuestions);
  },
  addTestQuestion: function(vuexContext, testQuestion) {
    this.$axios
      .post("/addTestQuestion", { testQuestion: testQuestion })
      .then(res => {
        console.log(res.data.testQuestion);
        vuexContext.dispatch("getTestQuestions");
      });
  }
};
