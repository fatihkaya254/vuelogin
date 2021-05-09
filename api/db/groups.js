import mongoose from 'mongoose'

const groupsSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Grade'
    },
    
})

const Groups = mongoose.model('groups', groupsSchema)



export default Groups