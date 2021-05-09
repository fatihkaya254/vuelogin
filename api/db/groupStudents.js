import mongoose from 'mongoose'

const groupStudentsSchema = mongoose.Schema({
    branchName: {
        type: String,
        required: true
    },
    groups:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Groups'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }
    
})

const GroupStudents = mongoose.model('groupStudents', groupStudentsSchema)



export default GroupStudents