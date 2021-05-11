import Grade from "../models/grade"

exports.newgrade = async(req,res) => {
    let grade = req.body.grade
    const newgrade = await Grade.create(grade)
    res.status(201).json({ grade: newgrade})
}

exports.getAllgrades = async (req,res) =>{
    Grade.find({}, function(err, grades) {
        var gradeMap = {};
    
        grades.forEach(function(grade) {
            gradeMap[grade._id] = grade;
        });
    
        res.send(gradeMap);  
    });
}