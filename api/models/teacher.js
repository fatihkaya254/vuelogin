import mongoose from 'mongoose'

const teacherSchema = mongoose.Schema({
    
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    
})

const Teacher = mongoose.model('teacher', teacherSchema)



export default Teacher