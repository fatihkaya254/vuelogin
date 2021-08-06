import mongoose from 'mongoose'

const lessonSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'grade'
    },
    user:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user'
    }
})

const Lesson = mongoose.model('lesson', lessonSchema)



export default Lesson