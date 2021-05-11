import EducationBack from "../models/educationBack"

exports.newEducationBack = async(req,res) => {
    let educationBack = req.body.educationBack
    const neweducationBack = await EducationBack.create(educationBack)
    res.status(201).json({ educationBack: neweducationBack})
}

exports.getAllEducationBacks = async (req,res) =>{
    EducationBack.find({}, function(err, educationBacks) {
        var educationBackMap = {};
    
        educationBacks.forEach(function(educationBack) {
            educationBackMap[educationBack._id] = educationBack;
        });
    
        res.send(educationBackMap);  
    });
}