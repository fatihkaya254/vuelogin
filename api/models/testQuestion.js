import mongoose from 'mongoose'

const testQuestionSchema = mongoose.Schema({
    questionSequence: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    wrongAnswer1: {
        type: String,
        required: true
    },
    wrongAnswer2: {
        type: String,
        required: true
    },
    wrongAnswer3: {
        type: String,
        required: true
    },
    wrongAnswer4: {
        type: String,
        required: true
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    test:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Test'
    }
    
})

const TestQuestion = mongoose.model('testQuestion', testQuestionSchema)



export default TestQuestion