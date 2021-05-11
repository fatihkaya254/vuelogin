import StudentAnswer from "../models/studentAnswer"

exports.newStudentAnswer = async(req,res) => {
    let studentAnswer = req.body.studentAnswer
    const newstudentAnswer = await StudentAnswer.create(studentAnswer)
    res.status(201).json({ studentAnswer: newstudentAnswer})
}

exports.getAllStudentAnswers = async (req,res) =>{
    StudentAnswer.find({}, function(err, studentAnswers) {
        var studentAnswerMap = {};
    
        studentAnswers.forEach(function(studentAnswer) {
            studentAnswerMap[studentAnswer._id] = studentAnswer;
        });
    
        res.send(studentAnswerMap);  
    });
}