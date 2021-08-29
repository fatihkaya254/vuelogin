import Group from "../models/group";

exports.newGroup = async (req, res) => {
  let group = req.body.group;
  const newgroup = await Group.create(group);
  res.status(201).json({ group: newgroup });
};

exports.getAllGroups = async (req, res) => {
  Group.find({}, function(err, groups) {
    var groupMap = {};

    groups.forEach(function(group) {
      groupMap[group._id] = group;
    });

    res.send(groupMap);
  });
};

exports.addStudentToGroup = async (req, res) => {
  let id = req.body.id;
  let student = req.body.student;
  try {
    Group.findByIdAndUpdate({ _id: id }, { student: student }, () => {
      res.status(200).json({
        message: "updated"
      });
    });
  } catch (error) {
    console.log(error);
  }
};
