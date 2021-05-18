import SubTopic from "../models/subtopic"

exports.newSubTopic = async(req,res) => {
    let subTopic = req.body.subTopic
    const newsubtopic = await SubTopic.create(subTopic)
    res.status(201).json({ subTopic: newsubtopic})
}

exports.getAllSubTopics = async (req,res) =>{
    SubTopic.find({}, function(err, subtopics) {
        var subtopicMap = {};
    
        subtopics.forEach(function(subtopic) {
            subtopicMap[subtopic._id] = subtopic;
        });
    
        res.send(subtopicMap);  
    });
}