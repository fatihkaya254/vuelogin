import GroupStudent from "../models/groupStudent"

exports.newgroupStudent = async(req,res) => {
    let groupStudent = req.body.groupStudent
    const newgroupStudent = await GroupStudent.create(groupStudent)
    res.status(201).json({ groupStudent: newgroupStudent})
}

exports.getAllgroupStudents = async (req,res) =>{
    GroupStudent.find({}, function(err, groupStudents) {
        var groupStudentMap = {};
    
        groupStudents.forEach(function(groupStudent) {
            groupStudentMap[groupStudent._id] = groupStudent;
        });
    
        res.send(groupStudentMap);  
    });
}