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
    condition:{
        type: String,
        enum: ["private", "group", "none"],
        required: true
    },
    weeklyPrivateLesson:{
        type: Number,
        required: true
    },
    oncePrivateLesson:{
        type: Number,
        required: true
    },
    weeklyExam:{
        type: Number,
        required: true
    },
    onceExam:{
        type: Number,
        required: true
    },
    installability:{
        type: Boolean,
        required: true
    },
    affordability:{
        type: Boolean,
        default: true,
        required: true
    }
})

const Package = mongoose.model('package', packageSchema)



export default Package