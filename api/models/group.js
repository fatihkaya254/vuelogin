import mongoose from 'mongoose'

const groupSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Grade'
    }
    
})

const Group = mongoose.model('group', groupSchema)



export default Group