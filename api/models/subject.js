import mongoose from 'mongoose'

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectOrder: {
        type: String,
        required: true
      },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    
})

const Subject = mongoose.model('subject', subjectSchema)



export default Subject