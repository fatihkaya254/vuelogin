import mongoose from 'mongoose'

const branchProgressSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    startProgress: {
        type: String,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student',
        required: true,
    },
    brachProcess:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'branchProcess',
        required: true,
        
    }
    
})

const BranchProgress = mongoose.model('branchProgress', branchProgressSchema)



export default BranchProgress