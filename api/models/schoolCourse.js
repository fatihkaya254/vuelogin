import mongoose from 'mongoose'

const schoolCourseSchema = mongoose.Schema({
    schoolCourseName: {
        type: String,
        required: true,
        unique: true,
    },
})

const SchoolCourse = mongoose.model('schoolCourse', schoolCourseSchema)



export default SchoolCourse