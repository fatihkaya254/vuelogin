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
        ref:'Student'
    },
    brachProcess:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'BranchProcess'
    }
    
})

const BranchProgress = mongoose.model('branchProgress', branchProgressSchema)



export default BranchProgress