import Question from "../models/question"

exports.newquestion = async(req,res) => {
    let question = req.body.question
    const newquestion = await Question.create(question)
    res.status(201).json({ question: newquestion})
}

exports.getAllquestions = async (req,res) =>{
    Question.find({}, function(err, questions) {
        var questionMap = {};
    
        questions.forEach(function(question) {
            questionMap[question._id] = question;
        });
    
        res.send(questionMap);  
    });
}