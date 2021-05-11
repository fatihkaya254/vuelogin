import mongoose from 'mongoose'

const questionSubtopicSchema = mongoose.Schema({
    
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    subtopic:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subtopic'
    },
})

const QuestionSubtopic = mongoose.model('questionSubtopic', questionSubtopicSchema)



export default QuestionSubtopic