import SchoolCourse from "../models/schoolCourse"

exports.newschoolCourse = async(req,res) => {
    let schoolCourse = req.body.schoolCourse
    const newschoolCourse = await SchoolCourse.create(schoolCourse)
    res.status(201).json({ schoolCourse: newschoolCourse})
}

exports.getAllschoolCourses = async (req,res) =>{
    SchoolCourse.find({}, function(err, schoolCourses) {
        var schoolCourseMap = {};
    
        schoolCourses.forEach(function(schoolCourse) {
            schoolCourseMap[schoolCourse._id] = schoolCourse;
        });
    
        res.send(schoolCourseMap);  
    });
}