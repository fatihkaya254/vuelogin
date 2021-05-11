import Teacher from "../models/teacher"

exports.newteacher = async(req,res) => {
    let teacher = req.body.teacher
    const newteacher = await Teacher.create(teacher)
    res.status(201).json({ teacher: newteacher})
}

exports.getAllteachers = async (req,res) =>{
    Teacher.find({}, function(err, teachers) {
        var teacherMap = {};
    
        teachers.forEach(function(teacher) {
            teacherMap[teacher._id] = teacher;
        });
    
        res.send(teacherMap);  
    });
}