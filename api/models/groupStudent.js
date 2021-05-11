import mongoose from 'mongoose'

const groupStudentSchema = mongoose.Schema({
    branchName: {
        type: String,
        required: true
    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }
    
})

const GroupStudent = mongoose.model('groupStudent', groupStudentSchema)



export default GroupStudent