import Lesson from "../models/lesson";

exports.newLesson = async (req, res) => {
  let lesson = req.body.lesson;
  let status = req.body.status;
  try {
    const lessonInfo = await Lesson.findOne(lesson);
    if (lessonInfo) {
      try {
        const newLesson = await Lesson.findOneAndUpdate(lesson, {
          status: status
        });
        res.status(201).json({ lesson: newLesson });
      } catch (error) {
        res.status(400).json({ message: error });
      }
    } else {
      try {
        lesson.status = status;
        const newlesson = await Lesson.create(lesson);
        res.status(201).json({ lesson: newlesson });
      } catch (error) {
        res.status(400).json({ message: error });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.getAllLessons = async (req, res) => {
  Lesson.find({}, function(err, lessons) {
    var lessonMap = {};

    lessons.forEach(function(lesson) {
      lessonMap[lesson._id] = lesson;
    });

    res.send(lessonMap);
  });
};

exports.teacherLessons = async (req, res) => {
  let teacher = req.body.teacher;
  Lesson.find({ teacher })
    .then(users => {
      if (users != null) {
        var userMap = {};
        users.forEach(function(user) {
          userMap[user.day + "-" + user.hour] = user.status;
        });
        res.send(userMap);
      } else {
        res.status(200).json({ message: "null" });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.branchLessons = async (req, res) => {
  let branch = req.body.branch;
  Lesson.find()
    .populate({ path: "teacher", match: { branch: branch } }) // şarta uymayanlarda null değeri dönüyor
    .then(lessons => {
      var lessonMap = {};
      lessons.forEach(function(lesson) {
        if (lesson.teacher != null)
          lessonMap[lesson.day + "-" + lesson.hour] = lesson;
      });
      res.send(lessonMap);
    });
};
