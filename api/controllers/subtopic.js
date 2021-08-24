import SubTopic from "../models/subtopic";

exports.newSubTopic = async (req, res) => {
  let subTopic = req.body.subTopic;
  const newsubtopic = await SubTopic.create(subTopic);
  res.status(201).json({ subTopic: newsubtopic });
};

exports.getAllSubTopics = async (req, res) => {
  SubTopic.find({}, function(err, subtopics) {
    var subtopicMap = {};

    subtopics.forEach(function(subtopic) {
      subtopicMap[subtopic._id] = subtopic;
    });

    res.send(subtopicMap);
  });
};
exports.update = async (req, res) => {
  let id = req.body.id;
  let where = req.body.where;
  let value = req.body.value;
  try {
    SubTopic.findByIdAndUpdate({ _id: id }, { [where]: value }, () => {
      res.status(200).json({
        message: "updated"
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  let id = req.body.id;
  try {
    SubTopic.findByIdAndDelete({ _id: id }, () => {
      res.status(200).json({
        message: "deleted"
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getFamilyTree = async (req, res) => {
    SubTopic.find()
    .populate([{ path: 'subject', populate: { path: 'branch', populate: { path: 'grade'}}}])
    .then(subTopics => {
      var subtopicMap = {};
      subTopics.forEach(function(subTopic) {
        subtopicMap[subTopic._id] = subTopic;
      });
      
      res.send(subtopicMap);
    })
    .catch(err => {
      console.log(err);
    });
};
