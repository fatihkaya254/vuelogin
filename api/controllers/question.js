import Question from "../models/question"

exports.newQuestion = async(req,res) => {
    let question = req.body.formData
    console.log(req.body);
    //const newquestion = await Question.create(question)
    //res.status(201).json({ question: newquestion})
}

exports.getAllQuestions = async (req,res) =>{
    Question.find({}, function(err, questions) {
        var questionMap = {};
    
        questions.forEach(function(question) {
            questionMap[question._id] = question;
        });
    
        res.send(questionMap);  
    });
}