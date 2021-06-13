import express from "express";
const app = express();
import mongoose from "mongoose";
import User from "./controllers/user";
import Branch from "./controllers/branch";
import Role from "./controllers/role";
import BranchProcess from "./controllers/branchProcess";
import BranchProgress from "./controllers/branchProgress";
import EducationBack from "./controllers/educationBack";
import Exam from "./controllers/exam";
import Grade from "./controllers/grade";
import Group from "./controllers/group";
import GroupStudent from "./controllers/groupStudent";
import Package from "./controllers/package";
import Parent from "./controllers/parent";
import ParentShip from "./controllers/parentShip";
import PrivateLesson from "./controllers/privateLesson";
import Purchase from "./controllers/purchase";
import Question from "./controllers/question";
import QuestionSubtopic from "./controllers/questionSubtopic";
import SchoolCourse from "./controllers/schoolCourse";
import SendedSMS from "./controllers/sendedSMS";
import Student from "./controllers/student";
import StudentAnswer from "./controllers/studentAnswer";
import Subject from "./controllers/subject";
import SubjectProcess from "./controllers/subjectProcess";
import SubjectProgress from "./controllers/subjectProgress";
import SubTopic from "./controllers/subtopic";
import Teacher from "./controllers/teacher";
import TeacherBranch from "./controllers/teacherBranch";
import Test from "./controllers/test";
import TestQuestion from "./controllers/testQuestion";
import WaitingSMS from "./controllers/waitingSMS";
import Multer from "multer";
import cors from "cors";
import Sharp from "sharp";
import fs from "fs";
import path from "path";
import sequelize from "./sqlDatabase";
import Assamble from "./controllers/assamble";



  var corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use("./static", express.static(path.join(__dirname, "static")));
const fileFilter = function(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};
const MAX_SIZE = 10000000;
const upload = Multer({
  dest: "./uploads",
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
});



mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.k07vz.mongodb.net/blogpost?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(console.log("connected to db"))
  .catch(err => console.log(err));

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(201).json({ file: req.file });
});

app.post("/dropzone", upload.single("file"), async (req, res) => {
  console.log('request: ', req.body.who);
  var newName = Date.now() + "-"+ req.body.who + path.extname(req.file.originalname)
  console.log(newName)
  try {
    await Sharp(req.file.path)
      .resize(300, 300, {
        fit: "cover",
        background: {
          r: 0,
          g: 0,
          b: 0,
          alpha: 0
        }
      })
      //.background('white')
      //.embed()
      .toFile(`./static/${newName}`);
    fs.unlink(req.file.path, () => {
      res.status(200).json({ file: `/${newName}` });
    });
  } catch (err) {
    res.status(422).json({ err });
  }
});

app.use(function(err, req, res, next) {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res
      .status(422)
      .json({ error: `Too Large. Max size is ${MAX_SIZE / 1000}kb` });
    return;
  }
});
//-------------------------------------------- ASSAMBLE -------------------------------------------- //
app.post("/assamble", Assamble.newAssamble);



//-------------------------------------------- USERS -------------------------------------------- //
app.post("/phone", User.generateCode);
app.post("/code", User.authCode);
app.post("/authGoogle", User.authGoogle);
app.post("/auth", User.auth);
app.put("/updateProfile", User.update);
app.get("/users", User.getAll);

//--------------------------------------------  ROLES -------------------------------------------- //
app.post("/addRole", Role.newRole);
app.get("/roles", Role.getAllRoles);

//--------------------------------------------  BRANCHES -------------------------------------------- //
app.post("/addBranch", Branch.newBranch);
app.get("/branches", Branch.getAllBranches);
app.put("/updateBranch", Branch.update);
app.put("/deleteBranch", Branch.delete);
//--------------------------------------------  BRANCH PROCESS -------------------------------------------- //
app.post("/addBranchProcess", BranchProcess.newBranchProcess);
app.get("/branchProcesses", BranchProcess.getAllBranchProcesses);

//--------------------------------------------  BRANCH PROGRESS -------------------------------------------- //
app.post("/addBranchProgress", BranchProgress.newBranchProgress);
app.get("/branchProgresses", BranchProgress.getAllBranchProgresses);

//--------------------------------------------  EDUCATİON BACKGROUND -------------------------------------------- //
app.post("/addEducationBack", EducationBack.newEducationBack);
app.get("/educationBacks", EducationBack.getAllEducationBacks);

//--------------------------------------------  EXAMS -------------------------------------------- //
app.post("/addExam", Exam.newExam);
app.get("/exams", Exam.getAllExams);

//--------------------------------------------  GRADES -------------------------------------------- //
app.post("/addGrade", Grade.newGrade);
app.get("/grades", Grade.getAllGrades);

//--------------------------------------------  GROUPS -------------------------------------------- //
app.post("/addGroup", Group.newGroup);
app.get("/groups", Group.getAllGroups);

//--------------------------------------------  GROUP STUDENTS -------------------------------------------- //
app.post("/addGroupStudent", GroupStudent.newGroupStudent);
app.get("/groupStudents", GroupStudent.getAllGroupStudents);

//--------------------------------------------  PACKAGES -------------------------------------------- //
app.post("/addPackage", Package.newPackage);
app.get("/packages", Package.getAllPackages);

//--------------------------------------------  PARENTS -------------------------------------------- //
app.post("/addParent", Parent.newParent);
app.get("/parents", Parent.getAllParents);

//--------------------------------------------  PARENTSHİP -------------------------------------------- //
app.post("/addParentShip", ParentShip.newParentShip);
app.get("/parentShips", ParentShip.getAllParentShips);

//--------------------------------------------  PRİVATE LESSON -------------------------------------------- //
app.post("/addPrivateLesson", PrivateLesson.newPrivateLesson);
app.get("/privateLessons", PrivateLesson.getAllPrivateLessons);

//--------------------------------------------  PURCHASE -------------------------------------------- //
app.post("/addPurchase", Purchase.newPurchase);
app.get("/purchases", Purchase.getAllPurchases);

//--------------------------------------------  QUESTİON -------------------------------------------- //
app.post("/addQuestion", Question.newQuestion);
app.get("/questions", Question.getAllQuestions);

//--------------------------------------------  QUESTİON SUBTOPİC -------------------------------------------- //
app.post("/addQuestionSubtopic", QuestionSubtopic.newQuestionSubtopic);
app.get("/questionSubtopics", QuestionSubtopic.getAllQuestionSubtopics);

//--------------------------------------------  SCHOOL AND COURSE -------------------------------------------- //
app.post("/addSchoolCourse", SchoolCourse.newSchoolCourse);
app.get("/schoolCourses", SchoolCourse.getAllSchoolCourses);

//--------------------------------------------  SENDED SMS -------------------------------------------- //
app.post("/addSendedSMS", SendedSMS.newSendedSMS);
app.get("/sendedSMSes", SendedSMS.getAllSendedSMSes);

//--------------------------------------------  STUDENT -------------------------------------------- //
app.post("/addStudent", Student.newStudent);
app.get("/students", Student.getAllStudents);

//--------------------------------------------  STUDENT ANSWER -------------------------------------------- //
app.post("/addStudentAnswer", StudentAnswer.newStudentAnswer);
app.get("/studentAnswers", StudentAnswer.getAllStudentAnswers);

//--------------------------------------------  SUBJECT -------------------------------------------- //
app.post("/addSubject", Subject.newSubject);
app.get("/subjects", Subject.getAllSubjects);
app.put("/updateSubject", Subject.update);
app.put("/deleteSubject", Subject.delete);
//--------------------------------------------  SUBJECT PROCESS-------------------------------------------- //
app.post("/addSubjectProcess", SubjectProcess.newSubjectProcess);
app.get("/subjectProcesses", SubjectProcess.getAllSubjectProcesses);

//--------------------------------------------  SUBJECT PROGRESS-------------------------------------------- //
app.post("/addSubjectProgress", SubjectProgress.newSubjectProgress);
app.get("/subjectProgresses", SubjectProgress.getAllSubjectProgresses);

//--------------------------------------------  SUBTOPİC -------------------------------------------- //
app.post("/addSubTopic", SubTopic.newSubTopic);
app.get("/subTopics", SubTopic.getAllSubTopics);
app.put("/updateSubTopic", SubTopic.update);
app.put("/deleteSubTopic", SubTopic.delete);

//--------------------------------------------  TEACHER -------------------------------------------- //
app.post("/addTeacher", Teacher.newTeacher);
app.get("/teachers", Teacher.getAllTeachers);

//--------------------------------------------  TEACHER BRANCH -------------------------------------------- //
app.post("/addTeacherBranch", TeacherBranch.newTeacherBranch);
app.get("/teacherBranches", TeacherBranch.getAllTeacherBranches);

//--------------------------------------------  TEST -------------------------------------------- //
app.post("/addTest", Test.newTest);
app.get("/tests", Test.getAllTests);

//--------------------------------------------  TEST QUESTİON -------------------------------------------- //
app.post("/addTestQuestion", TestQuestion.newTestQuestion);
app.get("/testQuestions", TestQuestion.getAllTestQuestions);

//--------------------------------------------  TEST -------------------------------------------- //
app.post("/addWaitingSMS", WaitingSMS.newWaitingSMS);
app.get("/waitingSMSes", WaitingSMS.getAllWaitingSMSes);

module.exports = {
  path: "/api",
  handler: app
};
