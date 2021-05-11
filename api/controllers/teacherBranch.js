import TeacherBranch from "../models/teacherBranch"

exports.newTeacherBranch = async(req,res) => {
    let teacherBranch = req.body.teacherBranch
    const newteacherBranch = await TeacherBranch.create(teacherBranch)
    res.status(201).json({ teacherBranch: newteacherBranch})
}

exports.getAllTeacherBranches = async (req,res) =>{
    TeacherBranch.find({}, function(err, teacherBranches) {
        var teacherBranchMap = {};
    
        teacherBranches.forEach(function(teacherBranch) {
            teacherBranchMap[teacherBranch._id] = teacherBranch;
        });
    
        res.send(teacherBranchMap);  
    });
}