export default {
    getBranches(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/branches`).then(res => {
        console.log(res.status);
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
            console.log(res.status)
            vuexContext.dispatch("getBranches")
          });
      },
      changeBranchInfo(vuexContext, changes){
        let id = changes.id
        let where = changes.where
        let value = changes.value
        this.$axios
        .put(
          "/updateBranch",
          { id, where, value },
        )
        .then(res => {
          console.log(res.status);
          vuexContext.dispatch("getBranches")
        });
      },
      deleteBranch(vuexContext, id){
        this.$axios
        .put(
          "/deleteBranch",
          {id : id},
        )
        .then(res => {
          console.log(res.data.message);
          if(res.data.message == "deleteFailed"){
            alert("bu derse ait konular vardır, önce konuları siliniz")
          }
          vuexContext.dispatch("getBranches")
        })
      },
    
      getBranchProcesses(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/branchProcesses`).then(res => {
        console.log(res.status);
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
            console.log(res.status)
            vuexContext.dispatch("getSubjects")
          });
      },
      changeSubjectInfo(vuexContext, changes){
        let id = changes.id
        let where = changes.where
        let value = changes.value
        console.log('value in store: ' + value);
        this.$axios
        .put(
          "/updateSubject",
          { id, where, value },
        )
        .then(res => {
          console.log(res.status);
          vuexContext.dispatch("getSubjects")
        });
      },
      deleteSubject(vuexContext, id){
        this.$axios
        .put(
          "/deleteSubject",
          {id : id},
        )
        .then(res => {
          console.log(res.data.message);
          if(res.data.message == "deleteFailed"){
            alert("bu konuya ait alt konular vardır, önce konuları siliniz")
          }
          vuexContext.dispatch("getSubjects")
        })
      },

      getSubjectProcesses(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/subjectProcesses`).then(res => {
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

      getSubTopics(vuexContext) {
        return this.$axios.get(`${process.env.OUR_HOST}/subtopics`).then(res => {
        let subtopics = res.data
        vuexContext.dispatch("putSubTopics", subtopics)
      });
       },
       putSubTopics(vuexContext, subtopics){
      vuexContext.commit("setSubTopics", subtopics)
       },
       addSubTopic: function(vuexContext, subtopic) {
        this.$axios
          .post("/addSubtopic", { subTopic: subtopic })
          .then(res => {
            console.log(res.data.subTopic)
            vuexContext.dispatch("getSubTopics")
          });
      },
      changeSubTopicInfo(vuexContext, changes){
        let id = changes.id
        let where = changes.where
        let value = changes.value
        console.log('value in store: ' + value);
        this.$axios
        .put(
          "/updateSubTopic",
          { id, where, value },
        )
        .then(res => {
          console.log(res.status);
          vuexContext.dispatch("getSubTopics")
        });
      },
      deleteSubTopic(vuexContext, id){
        this.$axios
        .put(
          "/deleteSubTopic",
          {id : id},
        )
        .then(res => {
          console.log(res.data.message);
          
          vuexContext.dispatch("getSubTopics")
        })
      },
};