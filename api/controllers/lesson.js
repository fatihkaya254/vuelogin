import Lesson from "../models/lesson"

exports.newLesson = async(req,res) => {
    let lesson = req.body.lesson
    console.log('api lesson: ' + lesson);
    try {
        const newlesson = await Lesson.create(lesson)
        res.status(201).json({ lesson: newlesson})
    } catch (error) {
        res.status(400).json({ dublicate: Object.keys(error.keyPattern)[2]})
    }
}

exports.getAllLessons = async (req,res) =>{
    Lesson.find({}, function(err, lessons) {
        var lessonMap = {};
    
        lessons.forEach(function(lesson) {
            lessonMap[lesson._id] = lesson;
        });
    
        res.send(lessonMap);  
    });
}