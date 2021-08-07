import mongoose from 'mongoose'

const classroomSchema = mongoose.Schema({
    classroomName: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    forLesson: {
        type: Boolean,
        default: true
    },
})

const Classroom = mongoose.model('classroom', classroomSchema)



export default Classroom