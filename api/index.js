import express from 'express'
const app = express()
import mongoose from 'mongoose'
//import PhoneAuth from './models/phoneAuth.js'
import User from './controllers/user.js'
import Role from './controllers/role.js'
import cors from "cors"

var corsOptions = {
    origin: 'http://http://192.168.1.54:8000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


mongoose.connect("mongodb+srv://root:root@cluster0.k07vz.mongodb.net/blogpost?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connected to db'))
.catch((err) => console.log(err))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//-------------------------------------------- USERS -------------------------------------------- //
app.post('/phone', User.generateCode)
app.post('/code', User.authCode)
app.post('/auth', User.auth)
app.put('/updateProfile', User.update)
app.get('/users', User.getAll)

//--------------------------------------------  ROLES -------------------------------------------- //
app.post('/addRole', Role.newRole)
app.get('/roles', Role.getAllRoles)

//--------------------------------------------  BRANCHES -------------------------------------------- //
app.post('/addBranch', Branch.newBranch)
app.get('/branch', Branch.getAllBranches)

//--------------------------------------------  BRANCH PROCESS -------------------------------------------- //
app.post('/addBranchProcess', BranchProcess.newBranchProcess)
app.get('/branchProcess', BranchProcess.getAllBranchProcesses)

//--------------------------------------------  BRANCH PROGRESS -------------------------------------------- //
app.post('/addBranchProgress', BranchProgress.newBranchProgress)
app.get('/branchProgress', BranchProgress.getAllBranchProgresses)

//--------------------------------------------  EDUCATİON BACKGROUND -------------------------------------------- //
app.post('/addEducationBack', EducationBack.newEducationBack)
app.get('/educationBack', EducationBack.getAllEducationBacks)

//--------------------------------------------  EXAMS -------------------------------------------- //
app.post('/addExam', Exam.newExam)
app.get('/exam', Exam.getAllExams)

//--------------------------------------------  GRADES -------------------------------------------- //
app.post('/addGrade', Grade.newGrade)
app.get('/grade', Grade.getAllGrades)

//--------------------------------------------  GROUPS -------------------------------------------- //
app.post('/addGroup', Group.newGroup)
app.get('/group', Group.getAllGroups)

//--------------------------------------------  GROUP STUDENTS -------------------------------------------- //
app.post('/addGroupStudent', GroupStudent.newGroupStudent)
app.get('/groupStudent', GroupStudent.getAllGroupStudents)

//--------------------------------------------  PACKAGES -------------------------------------------- //
app.post('/addPackage', Package.newPackage)
app.get('/package', Package.getAllPackages)

//--------------------------------------------  PARENTS -------------------------------------------- //
app.post('/addParent', Parent.newParent)
app.get('/parent', Parent.getAllParents)

//--------------------------------------------  PARENTSHİP -------------------------------------------- //
app.post('/addParentShip', ParentShip.newParentShip)
app.get('/parentShip', ParentShip.getAllParentsShip)

//--------------------------------------------  PRİVATE LESSON -------------------------------------------- //
app.post('/addPrivateLesson', PrivateLesson.newPrivateLesson)
app.get('/privateLesson', PrivateLesson.getAllPrivateLessons)

module.exports = {
    path : "/api",
    handler: app
}