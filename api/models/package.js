import mongoose from 'mongoose'

const packageSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    fee:{
        type: Number,
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
        enum: ["private", "group", "none"],
        required: true
    },
    
})

const Package = mongoose.model('package', packageSchema)



export default Package