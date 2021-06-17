import mongoose from 'mongoose'

const branchSchema = mongoose.Schema({
    branchName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'grade',
        required: true
    },
    
})

const Branch = mongoose.model('branch', branchSchema)



export default Branch