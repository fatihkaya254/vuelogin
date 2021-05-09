import mongoose from 'mongoose'

const teacherBranchSchema = mongoose.Schema({
    
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Purchased'
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    
})

const TeacherBranch = mongoose.model('teacherBranch', teacherBranchSchema)



export default TeacherBranch