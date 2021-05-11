import PrivateLesson from "../models/privateLesson"

exports.newprivateLesson = async(req,res) => {
    let privateLesson = req.body.privateLesson
    const newprivateLesson = await PrivateLesson.create(privateLesson)
    res.status(201).json({ privateLesson: newprivateLesson})
}

exports.getAllprivateLessons = async (req,res) =>{
    PrivateLesson.find({}, function(err, privateLessons) {
        var privateLessonMap = {};
    
        privateLessons.forEach(function(privateLesson) {
            privateLessonMap[privateLesson._id] = privateLesson;
        });
    
        res.send(privateLessonMap);  
    });
}