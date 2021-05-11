import Exam from "../models/exam"

exports.newexam = async(req,res) => {
    let exam = req.body.exam
    const newexam = await Exam.create(exam)
    res.status(201).json({ exam: newexam})
}

exports.getAllexams = async (req,res) =>{
    Exam.find({}, function(err, exams) {
        var examMap = {};
    
        exams.forEach(function(exam) {
            examMap[exam._id] = exam;
        });
    
        res.send(examMap);  
    });
}