import mongoose from 'mongoose'

const groupSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'grade'
    },
    student:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user'
    }
})
groupSchema.index({ groupName: 1}, { unique: true})

const Group = mongoose.model('group', groupSchema)



export default Group