import mongoose from 'mongoose'

const studentAnswerSchema = mongoose.Schema({
    chosenOption: {
        type: String,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    testQuestion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'testQuestion'
    },
    
})

const StudentAnswer = mongoose.model('studentAnswer', studentAnswerSchema)



export default StudentAnswer