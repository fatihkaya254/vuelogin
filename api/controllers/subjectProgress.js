import SubjectProgress from "../models/subjectProgress"

exports.newSubjectProgress = async(req,res) => {
    let subjectProgress = req.body.subjectProgress
    const newsubjectProgress = await SubjectProgress.create(subjectProgress)
    res.status(201).json({ subjectProgress: newsubjectProgress})
}

exports.getAllSubjectProgresses = async (req,res) =>{
    SubjectProgress.find({}, function(err, subjectProgresses) {
        var subjectProgressMap = {};
    
        subjectProgresses.forEach(function(subjectProgress) {
            subjectProgressMap[subjectProgress._id] = subjectProgress;
        });
    
        res.send(subjectProgressMap);  
    });
}