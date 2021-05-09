import mongoose from 'mongoose'

const studentAnswerSchema = mongoose.Schema({
    chosenOption: {
        type: String,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    testQuestion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'TestQuestion'
    },
    
})

const StudentAnswer = mongoose.model('studentAnswer', studentAnswerSchema)



export default StudentAnswer