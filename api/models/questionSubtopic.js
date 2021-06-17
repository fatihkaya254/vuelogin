import mongoose from 'mongoose'

const questionSubtopicSchema = mongoose.Schema({
    
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'question'
    },
    subtopic:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subtopic'
    },
})

const QuestionSubtopic = mongoose.model('questionSubtopic', questionSubtopicSchema)



export default QuestionSubtopic