import Classroom from "../models/classroom"

exports.newClassroom = async(req,res) => {
    let classroom = req.body.classroom
    console.log('api classroom: ' + classroom);
    const newclassroom = await Classroom.create(classroom)
    res.status(201).json({ classroom: newclassroom})
}

exports.getAllClassrooms = async (req,res) =>{
    Classroom.find({}, function(err, classrooms) {
        var classroomMap = {};
    
        classrooms.forEach(function(classroom) {
            classroomnMap[classroom._id] = classroom;
        });
    
        res.send(classroomMap);  
    });
}