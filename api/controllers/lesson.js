import Lesson from "../models/lesson";
import Group from "../models/group";

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
        console.log("1");
        console.log(error);
        res.status(400).json({ message: error });
      }
    }
  } catch (error) {
    console.log("2");
    console.log(error);
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
    .populate({ path: "student" })
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "group" })
    .sort({ day: 1, hour: 1 })
    .then(lessons => {
      var lessonMap = {};
      lessons.forEach(function(lesson) {
        if (lesson.teacher != null) {
          lessonMap[lesson._id] = lesson;
        }
      });
      res.send(lessonMap);
    });
};

exports.wholeBranchLessons = async (req, res) => {
  Lesson.find()
    .populate({ path: "teacher" }) // şarta uymayanlarda null değeri dönüyor
    .populate({ path: "student" })
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "group" })
    .sort({ day: 1, hour: 1 })
    .then(lessons => {
      var lessonMap = {};
      lessons.forEach(function(lesson) {
        if (lesson.teacher != null) {
          lessonMap[lesson._id] = lesson;
        }
      });
      res.send(lessonMap);
    });
};

exports.allStudentLessons = async (req, res) => {
  Lesson.find({ student: { $exists: true, $ne: null, $ne: undefined } })
    .select("student branch")
    .then(lessons => {
      var lessonMap = {};
      lessons.forEach(function(lesson) {
        lessonMap[lesson._id] = lesson;
      });

      res.send(lessonMap);
    });
};

exports.getStudentSchedule = async (req, res) => {
  const student = req.body.student;
  const groupI = await Group.findOne({ student }).select("_id");
  if (groupI != undefined && groupI != null) {
    const group = groupI._id;
    Lesson.find({ $or: [{ student }, { group }] })
      .sort('day hour')
      .populate({ path: "teacher", select: "name surname" })
      .populate({ path: "branch", populate: { path: "grade" } })
      .populate({ path: "group" })
      .then(lessons => {
        var lessonMap = {};
        lessons.forEach(function(lesson) {
          lessonMap[lesson._id] = lesson;
        });
        res.send(lessonMap);
      });
  } else {
    Lesson.find({ student })
      .sort('day hour')
      .populate({ path: "teacher", select: "name surname" })
      .populate({ path: "branch", populate: { path: "grade" } })
      .populate({ path: "group" })
      .then(lessons => {
        var lessonMap = {};
        lessons.forEach(function(lesson) {
          lessonMap[lesson._id] = lesson;
        });
        res.send(lessonMap);
      });
  }
};

exports.getTodaysForTeacher = async (req, res) => {
  const teacher = req.body.teacher;
  const day = req.body.day;
  Lesson.find({ teacher, day })
    .populate({ path: "student" })
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "group" })
    .then(lessons => {
      var lessonMap = {};
      var last = ""
      var present = ""
      lessons.forEach(function(lesson) {
        present += "" + lesson.day
        if(lesson.student) present += "" + lesson.student._id
        if(lesson.group) present += "" + lesson.group._id
        if(lesson.branch) present += "" + lesson.branch._id
        if(last != present){
          console.log(last + " " + present)
          lessonMap[lesson._id] = lesson;
        }
        last = present + ""
        present = ""
      });
      res.send(lessonMap);
    });
};

exports.teachersSchedule = async (req, res) => {
  const teacher = req.body.teacher;
  Lesson.find({ teacher })
    .sort({ day: 1, hour: 1 })
    .populate({ path: "student" })
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "group" })
    .then(lessons => {
      var lessonMap = {};
      lessons.forEach(function(lesson) {
          lessonMap[lesson.day + "-" + lesson.hour] = lesson;
      });
      res.send(lessonMap);
    });
};

exports.update = async (req, res) => {
  let id = req.body.id;
  let branch = req.body.branch;
  let student = req.body.student;
  let group = req.body.group;
  let updates = {};
  if (group == undefined && branch != undefined)
    updates = { student, branch, $unset: { group } };
  if (student == undefined && branch != undefined)
    updates = { group, branch, $unset: { student } };
  if (branch == undefined) updates = { $unset: { student, branch, group } };

  try {
    const changedUser = await Lesson.findByIdAndUpdate({ _id: id }, updates, {
      new: true
    })
      .populate({ path: "teacher" })
      .populate({ path: "student" })
      .populate({ path: "branch", populate: { path: "grade" } })
      .populate({ path: "group" });
    res.send(changedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

/*
{
    category: 'some_category',
    $or: [
        { doSomething: { $exists: false } },
        { doSomething: false }
    ]
}
*/
