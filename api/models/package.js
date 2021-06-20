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
    classroomQuota:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    scope:{
        type: String,
        enum: ["private", "group", "exam"],
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