import TestQuestion from "../models/testQuestion"

exports.newtestQuestion = async(req,res) => {
    let testQuestion = req.body.testQuestion
    const newtestQuestion = await TestQuestion.create(testQuestion)
    res.status(201).json({ testQuestion: newtestQuestion})
}

exports.getAlltestQuestions = async (req,res) =>{
    TestQuestion.find({}, function(err, testQuestions) {
        var testQuestionMap = {};
    
        testQuestions.forEach(function(testQuestion) {
            testQuestionMap[testQuestion._id] = testQuestion;
        });
    
        res.send(testQuestionMap);  
    });
}