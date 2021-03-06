import QuestionSubtopic from "../models/questionSubtopic"

exports.newQuestionSubtopic = async(req,res) => {
    let questionSubtopic = req.body.questionSubtopic
    const newquestionSubtopic = await QuestionSubtopic.create(questionSubtopic)
    res.status(201).json({ questionSubtopic: newquestionSubtopic})
}

exports.getAllQuestionSubtopics = async (req,res) =>{
    QuestionSubtopic.find({}, function(err, questionSubtopics) {
        var questionSubtopicMap = {};
    
        questionSubtopics.forEach(function(questionSubtopic) {
            questionSubtopicMap[questionSubtopic._id] = questionSubtopic;
        });
    
        res.send(questionSubtopicMap);  
    });
}