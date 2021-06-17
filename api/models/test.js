import mongoose from 'mongoose'

const testSchema = mongoose.Schema({
    TestName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'grade'
    },
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'exam'
    },
    
})

const Test = mongoose.model('test', testSchema)



export default Test