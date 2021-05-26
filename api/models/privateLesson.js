import mongoose from 'mongoose'

const privateLessonSchema = mongoose.Schema({
    sayi: {
        type: String,
        required: true
    },
    purchase:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Purchase'
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    
})

const PrivateLesson = mongoose.model('privateLesson', privateLessonSchema)



export default PrivateLesson