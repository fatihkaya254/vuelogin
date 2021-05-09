import mongoose from 'mongoose'

const questionSchema = mongoose.Schema({
    imageUpText: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageDownText: {
        type: String,
        required: true
    },
    root: {
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
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    
})

const Question = mongoose.model('question', questionSchema)



export default Question