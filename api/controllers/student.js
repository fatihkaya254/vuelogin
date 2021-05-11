import Student from "../models/student"

exports.newstudent = async(req,res) => {
    let student = req.body.student
    const newstudent = await Student.create(student)
    res.status(201).json({ student: newstudent})
}

exports.getAllstudents = async (req,res) =>{
    Student.find({}, function(err, students) {
        var studentMap = {};
    
        students.forEach(function(student) {
            studentMap[student._id] = student;
        });
    
        res.send(studentMap);  
    });
}