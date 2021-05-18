import mongoose from 'mongoose'

const gradeSchema = mongoose.Schema({
    gradeName: {
        type: String,
        required: true
    },
})

const Grade = mongoose.model('grade', gradeSchema)



export default Grade