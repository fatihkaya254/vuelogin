import mongoose from 'mongoose'

const educationBackSchema = mongoose.Schema({
    entryDate: {
        type: Date,
        required: true
    },
    exitDate: {
        type: Date,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student',
        required: true,
    },
    schoolCourse:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'schoolCourse',
        required: true
    }
    
})

const EducationBack = mongoose.model('educationBack', educationBackSchema)



export default EducationBack