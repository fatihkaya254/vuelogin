import mongoose from 'mongoose'

const subjectProcessSchema = mongoose.Schema({
    sequence: {
        type: String,
        required: true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subject'
    },
    subtopic:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subtopic'
    }
    
})

const SubjectProcess = mongoose.model('subjectProcess', subjectProcessSchema)



export default SubjectProcess