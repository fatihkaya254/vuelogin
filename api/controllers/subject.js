import Subject from "../models/subject"

exports.newSubject = async(req,res) => {
    let subject = req.body.subject
    const newsubject = await Subject.create(subject)
    res.status(201).json({ subject: newsubject})
}

exports.getAllSubjects = async (req,res) =>{
    Subject.find({}, function(err, subjects) {
        var subjectMap = {};
    
        subjects.forEach(function(subject) {
            subjectMap[subject._id] = subject;
        });
    
        res.send(subjectMap);  
    });
}