import BranchProcess from "../models/branchProcess"

exports.newbranchProcess = async(req,res) => {
    let branchProcess = req.body.branchProcess
    const newbranchProcess = await BranchProcess.create(branchProcess)
    res.status(201).json({ branchProcess: newbranchProcess})
}

exports.getAllbranchProcesses = async (req,res) =>{
    BranchProcess.find({}, function(err, branchProcesses) {
        var branchProcessMap = {};
    
        branchProcesses.forEach(function(branchProcess) {
            branchProcessMap[branchProcess._id] = branchProcess;
        });
    
        res.send(branchProcessMap);  
    });
}