import mongoose from 'mongoose'

const gradeSchema = mongoose.Schema({
    clasName: {
        type: String,
        required: true
    },
    
})

const Grade = mongoose.model('grade', gradeSchema)



export default Grade