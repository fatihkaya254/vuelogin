import mongoose from 'mongoose'

const packageSchema = mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    fee:{
        type: mongoose.Schema.Types.Double,
        required: true
    },
    scope:{
        type: String,
        enum: ["private", "group"],
        required: true
    },
    privateLessonCount:{
        type: Number,
        required: true
    },
    condition:{
        type: String,
        enum: ["private", "group"],
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    
})

const Package = mongoose.model('package', packageSchema)



export default Package