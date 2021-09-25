import mongoose from 'mongoose'

const lessonRecordchema = mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    homework: {
        type: String,
        default: "",
    },
    sms: {
        type: String,
    },
    smsApp: {
        type: Number,
        default: 0,
    },
    homeworkStatus: {
        type: Number,
        default: 0,
    },
    join: {
        type: Boolean,
    },
    lesson: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lesson'
    },
    branch: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'branch'
    },
    subTopics:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'subTopic'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'group'
    },
    classroom:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'classroom'
    },
    recordDate: { 
        type: Date,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

lessonRecordchema.index({ lesson: 1, recordDate: 1, student: 1, branch: 1}, { unique: true })

const LessonRecord = mongoose.model('lessonRecord', lessonRecordchema)



export default LessonRecord