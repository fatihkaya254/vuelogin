export default {
    getBranches(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/branches`).then(res => {
        console.log(res);
        let branches = res.data
        vuexContext.dispatch("putBranches", branches)
      });
       },
       putBranches(vuexContext, branches){
      vuexContext.commit("setBranches", branches)
       },
       addBranch: function(vuexContext, branch) {
        this.$axios
          .post("/addBranch", { branch: branch })
          .then(res => {
            console.log(res.data.branch)
            vuexContext.dispatch("getBranches")
          });
      },
    
      getBranchProcesses(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/branchProcesses`).then(res => {
        console.log(res);
        let branchProcesses = res.data
        vuexContext.dispatch("putBranchProcesses", branchProcesses)
      });
       },
       putBranchProcesses(vuexContext, branchProcesses){
      vuexContext.commit("setBranchProcesses", branchProcesses)
       },
       addBranchProcess: function(vuexContext, branchProcess) {
        this.$axios
          .post("/addBranchProcess", { branchProcess: branchProcess })
          .then(res => {
            console.log(res.data.branchProcess)
            vuexContext.dispatch("getBranchProcesses")
          });
      },
    
      getSubjects(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/subjects`).then(res => {
        console.log(res);
        let subjects = res.data
        vuexContext.dispatch("putSubjects", subjects)
      });
       },
       putSubjects(vuexContext, subjects){
      vuexContext.commit("setSubjects", subjects)
       },
       addSubject: function(vuexContext, subject) {
        this.$axios
          .post("/addSubject", { subject: subject })
          .then(res => {
            console.log(res.data.subject)
            vuexContext.dispatch("getSubjects")
          });
      },

      getSubjectProcesses(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/subjectProcesses`).then(res => {
        console.log(res);
        let subjectProcesses = res.data
        vuexContext.dispatch("putSubjectProcesses", subjectProcesses)
      });
       },
       putSubjectProcesses(vuexContext, subjectProcesses){
      vuexContext.commit("setSubjectProcesses", subjectProcesses)
       },
       addSubjectProcess: function(vuexContext, subjectProcess) {
        this.$axios
          .post("/addSubjectProcess", { subjectProcess: subjectProcess })
          .then(res => {
            console.log(res.data.subjectProcess)
            vuexContext.dispatch("getSubjectProcesses")
          });
      },

      getSubtopics(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/subtopics`).then(res => {
        console.log(res);
        let subtopics = res.data
        vuexContext.dispatch("putSubtopics", subtopics)
      });
       },
       putSubtopics(vuexContext, subtopics){
      vuexContext.commit("setSubtopics", subtopics)
       },
       addSubtopic: function(vuexContext, subtopic) {
        this.$axios
          .post("/addSubtopic", { subtopic: subtopic })
          .then(res => {
            console.log(res.data.subtopic)
            vuexContext.dispatch("getSubtopics")
          });
      },
};