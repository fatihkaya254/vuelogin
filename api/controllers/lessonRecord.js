import LessonRecord from "../models/lessonRecord";

exports.updateMany = async(req, res) => {
  console.log(req.body.changes);
}

exports.newLessonRecord = async (req, res) => {
  let lessonRecordInfo = req.body.lessonRecord;
  const newLessonRecord = await LessonRecord.create(lessonRecordInfo);
  res.status(201).json({ lessonRecord: newLessonRecord });
};

exports.dailyTeacherRecords = async (req, res) => {
  const teacher = req.body.teacher;
  const recordDate = new Date(req.body.date);
  var nextDay = new Date(req.body.date);
  nextDay.setDate(nextDay.getDate() + 1);
  LessonRecord.find({ teacher, recordDate: { $gte: recordDate, $lt: nextDay } })
    .sort([["createdAt", -1]])
    .then(lessons => {
      var lessonMap = {};
      lessons.forEach(function(lesson) {
        lessonMap[lesson._id] = lesson;
      });

      res.send(lessonMap);
    });
};

exports.update = async (req, res) => {
  let id = req.body.id;
  let changes = req.body.changes;
  console.log(changes);
  try {
    LessonRecord.findByIdAndUpdate({ _id: id }, changes, () => {
      res.status(200).json({
        message: "updated"
      });
    });
  } catch (error) {
    console.log(error);
  }
};


exports.findOne = async (req, res) => {
  let conditions = req.body.conditions;
  const preRecord = await LessonRecord.findOne(conditions).sort({
    recordDate: -1
  });
  res.status(201).json({ preRecord });
};

exports.getTodays = async (req, res) => {
  const now = new Date();
  var month = now.getMonth() + 1;
  const today = now.getFullYear() + "-" + month + "-" + now.getDate();
  try {
    const todays = await LessonRecord.find({ recordDate: today }).sort('hour')
    res.status(201).json({ todays });
  } catch (error) {
    console.log(error);
  }
};

exports.getStudentRecords = async (req, res) => {
  const student = req.body.student;
  LessonRecord.find({ student })
    .sort("recordDate")
    .populate({ path: "teacher", select: "name surname" })
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "group" })
    .populate({ path: "subTopics" })
    .then(lessons => {
      var lessonMap = {};
      lessons.forEach(function(lesson) {
        lessonMap[lesson._id] = lesson;
      });
      res.send(lessonMap);
    });
};
