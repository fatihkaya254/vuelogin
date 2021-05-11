import Subtopic from "../models/subtopic"

exports.newSubtopic = async(req,res) => {
    let subtopic = req.body.subtopic
    const newsubtopic = await Subtopic.create(subtopic)
    res.status(201).json({ subtopic: newsubtopic})
}

exports.getAllSubtopics = async (req,res) =>{
    Subtopic.find({}, function(err, subtopics) {
        var subtopicMap = {};
    
        subtopics.forEach(function(subtopic) {
            subtopicMap[subtopic._id] = subtopic;
        });
    
        res.send(subtopicMap);  
    });
}