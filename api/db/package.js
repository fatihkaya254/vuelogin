import mongoose from 'mongoose'

const packageSchema = mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    privateLessonTimeW: {
        type: String,
    },
    groupLessonTimeW: {
        type: String,
    },
    montlyFee: {
        type: String,
    },
    createdAt: { 
        type: Date, 
    }
})

const Package = mongoose.model('package', packageSchema)



export default Package