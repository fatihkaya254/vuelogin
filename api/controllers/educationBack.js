import EducationBack from "../models/educationBack"

exports.neweducationBack = async(req,res) => {
    let educationBack = req.body.educationBack
    const neweducationBack = await EducationBack.create(educationBack)
    res.status(201).json({ educationBack: neweducationBack})
}

exports.getAlleducationBacks = async (req,res) =>{
    EducationBack.find({}, function(err, educationBacks) {
        var educationBackMap = {};
    
        educationBacks.forEach(function(educationBack) {
            educationBackMap[educationBack._id] = educationBack;
        });
    
        res.send(educationBackMap);  
    });
}