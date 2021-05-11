import Student from "../models/student"

exports.newStudent = async(req,res) => {
    let student = req.body.student
    const newstudent = await Student.create(student)
    res.status(201).json({ student: newstudent})
}

exports.getAllStudents = async (req,res) =>{
    Student.find({}, function(err, students) {
        var studentMap = {};
    
        students.forEach(function(student) {
            studentMap[student._id] = student;
        });
    
        res.send(studentMap);  
    });
}