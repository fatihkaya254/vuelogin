import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
    purchased: {
        type: String,
        required: true
    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Grade'
    },
    
})

const Student = mongoose.model('student', studentSchema)



export default Student