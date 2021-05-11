import Grade from "../models/grade"

exports.newgrade = async(req,res) => {
    let grade = req.body.grade
    const newgrade = await Grade.create(grade)
    res.status(201).json({ grade: newgrade})
}

exports.getAllgradees = async (req,res) =>{
    Grade.find({}, function(err, gradees) {
        var gradeMap = {};
    
        gradees.forEach(function(grade) {
            gradeMap[grade._id] = grade;
        });
    
        res.send(gradeMap);  
    });
}