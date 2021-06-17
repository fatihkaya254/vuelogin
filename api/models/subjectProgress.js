import mongoose from 'mongoose'

const subjectProgressSchema = mongoose.Schema({
    entryDate: {
        type: Date,
        required: true
    },
    subtopicProgress: {
        type: String,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    subjectProcess:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subjectProcess'
    }
    
})

const SubjectProgress = mongoose.model('subjectProgress', subjectProgressSchema)



export default SubjectProgress