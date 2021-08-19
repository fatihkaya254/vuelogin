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
    },
    sms: {
        type: String,
    },
    smsApp: {
        type: Boolean,
        default: false,
    },
    homeworkStatus: {
        type: Number,
        default: 0,
    },
    lesson: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lesson'
    },
    subTopics:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'subtopic'
    },
    student:{
        type: [mongoose.Schema.Types.ObjectId],
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
    }
})

lessonRecordchema.index({ lesson: 1, recordDate: 1}, { unique: true })

const LessonRecord = mongoose.model('lessonRecord', lessonRecordchema)



export default LessonRecord