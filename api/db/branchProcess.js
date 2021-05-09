import mongoose from 'mongoose'

const branchProcessSchema = mongoose.Schema({
    sequence: {
        type: String,
        required: true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    
})

const BranchProcess = mongoose.model('branchProcess', branchProcessSchema)



export default BranchProcess