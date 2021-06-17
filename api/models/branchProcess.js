import mongoose from 'mongoose'

const branchProcessSchema = mongoose.Schema({
    sequence: {
        type: String,
        required: true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subject',
        required: true,
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'branch',
        required: true
    },
    
})

const BranchProcess = mongoose.model('branchProcess', branchProcessSchema)



export default BranchProcess