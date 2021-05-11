import SubjectProcess from "../models/subjectProcess"

exports.newsubjectProcess = async(req,res) => {
    let subjectProcess = req.body.subjectProcess
    const newsubjectProcess = await SubjectProcess.create(subjectProcess)
    res.status(201).json({ subjectProcess: newsubjectProcess})
}

exports.getAllsubjectProcesses = async (req,res) =>{
    SubjectProcess.find({}, function(err, subjectProcesss) {
        var subjectProcessMap = {};
    
        subjectProcesses.forEach(function(subjectProcess) {
            subjectProcessMap[subjectProcess._id] = subjectProcess;
        });
    
        res.send(subjectProcessMap);  
    });
}