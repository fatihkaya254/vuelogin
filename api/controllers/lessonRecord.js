import LessonRecord from "../models/lessonRecord";


exports.newLessonRecord = async(req,res) => {
    let lessonRecordInfo = req.body.lessonRecord
    const newLessonRecord = await LessonRecord.create(lessonRecordInfo)
    res.status(201).json({ lessonRecord: newLessonRecord})
}

exports.dailyTeacherRecords = async (req, res) => {
    const teacher = req.body.teacher
    const recordDate = req.body.date
    LessonRecord.find({ teacher, recordDate })
      .then(lessons => {
        var lessonMap = {};
        lessons.forEach(function(lesson) {
          lessonMap[lesson._id] = lesson;
        });
  
        res.send(lessonMap);
      });
};

exports.update = async (req, res) => {
  let id = req.body.id
  let changes = req.body.changes
  try {
    LessonRecord.findByIdAndUpdate({_id : id}, changes, ()=>{
          res.status(200).json({
              message:"updated"
          })
      })
  } catch (error) {
      console.log(error);
  }
}

exports.findOne = async (req, res) => {
  let conditions = req.body.conditions
  const preRecord = await LessonRecord.findOne(conditions).sort({ recordDate: -1 })
  res.status(201).json({preRecord})
}