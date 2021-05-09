import mongoose from 'mongoose'

const examSchema = mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Grade'
    },
    
})

const Exam = mongoose.model('exam', examSchema)



export default Exam