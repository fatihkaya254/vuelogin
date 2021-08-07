import mongoose from 'mongoose'

const lessonSchema = mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'branch'
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
})

lessonSchema.index({ day: 1, hour: 1, student: 1 }, { unique: true,  partialFilterExpression: { student: { $exists: true } } })
lessonSchema.index({ day: 1, hour: 1, teacher: 1 }, { unique: true, partialFilterExpression: { teacher: { $exists: true } } })
lessonSchema.index({ day: 1, hour: 1, group: 1 }, { unique: true, partialFilterExpression: { group: { $exists: true } } })
lessonSchema.index({ day: 1, hour: 1, classroom: 1 }, { unique: true, partialFilterExpression: { classroom: { $exists: true } } })

const Lesson = mongoose.model('lesson', lessonSchema)



export default Lesson