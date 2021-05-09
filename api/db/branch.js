import mongoose from 'mongoose'

const branchSchema = mongoose.Schema({
    branchName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Grade'
    },
    
})

const Branch = mongoose.model('branch', branchSchema)



export default Branch