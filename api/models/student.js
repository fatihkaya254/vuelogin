import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
    purchased: {
        type: String,
        required: true
    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'grade'
    },
    
})

const Student = mongoose.model('student', studentSchema)



export default Student