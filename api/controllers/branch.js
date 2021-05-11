import Branch from "../models/branch"

exports.newbranch = async(req,res) => {
    let branch = req.body.branch
    const newbranch = await Branch.create(branch)
    res.status(201).json({ branch: newbranch})
}

exports.getAllbranches = async (req,res) =>{
    Branch.find({}, function(err, branches) {
        var branchMap = {};
    
        branches.forEach(function(branch) {
            branchMap[branch._id] = branch;
        });
    
        res.send(branchMap);  
    });
}