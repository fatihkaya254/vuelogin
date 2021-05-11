import mongoose from 'mongoose'

const schoolCourseSchema = mongoose.Schema({
    SchoolCourseName: {
        type: String,
        required: true
    },
})

const SchoolCourse = mongoose.model('schoolCourse', schoolCourseSchema)



export default SchoolCourse