import SubTopic from "../models/subtopic";
import Branch from "../models/branch";
import Subject from "../models/subject";

exports.getBranchProcess = async (req, res) => {
  const branchMap = {};
  const subjectMap = {};
  const branchSubtopics = {};
  var subjectMapOther = {};
  var subtopicMap = {};
  const branches = req.body.branch;
  const subjects = await Subject.find({ branch: { $in: branches } }).sort({
    branch: 1,
    subjectOrder: 1
  });

  subjects.forEach(async function(subject) {
    subjectMap[subject._id] = subject;
  });
  subjectMap[subjectMap[Object.keys(subjectMap)[0]].branch] = {branch: "zzz"}

  var prebranch = "";
  for (const subject in subjectMap) {
    var newBranch = "";
    newBranch = "" + subjectMap[subject].branch;
    const subtopics = await SubTopic.find({ subject }).sort({
      branch: 1,
      subjectOrder: 1
    });

    subtopics.forEach(async function(subtopic) {
      subtopicMap[subtopic._id] = subtopic;
      branchSubtopics[subtopic._id] = subtopic;
    });
    if (prebranch != newBranch && prebranch != "") {
      branchMap[prebranch] = subjectMapOther;
      subjectMapOther = {};
    } else {
      console.log("else");
    }
    subjectMapOther[subject] = subtopicMap;
    subtopicMap = {};
    prebranch = "" + subjectMap[subject].branch;
  }
  

  res.send({branchMap, subjectMap, branchSubtopics});
};
