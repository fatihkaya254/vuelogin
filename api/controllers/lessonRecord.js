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