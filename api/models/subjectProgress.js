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
        ref:'Student'
    },
    subjectProcess:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'SubjectProcess'
    }
    
})

const SubjectProgress = mongoose.model('subjectProgress', subjectProgressSchema)



export default SubjectProgress