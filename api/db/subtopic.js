import mongoose from 'mongoose'

const subtopicSchema = mongoose.Schema({
    subtopicName: {
        type: String,
        required: true
    },
    subtopicStat: {
        type: String,
        required: true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    },
    
})

const Subtopic = mongoose.model('subtopic', subtopicSchema)



export default Subtopic