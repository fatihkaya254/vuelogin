import mongoose from 'mongoose'

const testSchema = mongoose.Schema({
    TestName: {
        type: String,
        required: true
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Grade'
    },
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Exam'
    },
    
})

const Test = mongoose.model('test', testSchema)



export default Test