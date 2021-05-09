import mongoose from 'mongoose'

const privateLessonSchema = mongoose.Schema({
    sayi: {
        type: String,
        required: true
    },
    
    purchased:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Purchased'
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    
})

const PrivateLesson = mongoose.model('purchases', privateLessonSchema)



export default PrivateLesson