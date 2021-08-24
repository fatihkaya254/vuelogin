import Subject from "../models/subject"
import SubTopic from "../models/subtopic"

exports.newSubject = async(req,res) => {
    let subject = req.body.subject
    const newsubject = await Subject.create(subject)
    res.status(201).json({ subject: newsubject})
}

exports.getAllSubjects = async (req,res) =>{
    Subject.find({}).sort({subjectOrder: 'asc'}).exec((err, subjects) => {
        var subjectMap = {};
    
        subjects.forEach(function(subject) {
            subjectMap[subject._id] = subject;
        });
    
        res.send(subjectMap);  
    });
}

exports.update = async (req, res) => {
    let id = req.body.id
    let where = req.body.where
    let value = req.body.value
    try {
        Subject.findByIdAndUpdate({_id : id}, { [where]: value }, ()=>{
            res.status(200).json({
                message:"updated"
            })
        })
    } catch (error) {
        console.log(error);
    }
}

exports.delete = async(req,res) => {
    let id = req.body.id
    try {
        let subTopics = await SubTopic.find({subject : id})
        if(subTopics.length != 0){
            console.log('değiştiremennnnnn');
            res.status(200).json({
                message:"deleteFailed"
            })
        }
        else{
            Subject.findByIdAndDelete({_id : id}, ()=>{
                res.status(200).json({
                    message:"deleted"
                })
            })
        }
        }catch (error) {
            console.log(error)
        }
        
}