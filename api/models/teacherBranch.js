import mongoose from 'mongoose'

const teacherBranchSchema = mongoose.Schema({
    
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'branch'
    },
    
})

const TeacherBranch = mongoose.model('teacherBranch', teacherBranchSchema)



export default TeacherBranch