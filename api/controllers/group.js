import Group from "../models/group"

exports.newGroup = async(req,res) => {
    let group = req.body.group
    const newgroup = await Group.create(group)
    res.status(201).json({ group: newgroup})
}

exports.getAllGroups = async (req,res) =>{
    Group.find({}, function(err, groups) {
        var groupMap = {};
    
        groups.forEach(function(group) {
            groupMap[group._id] = group;
        });
    
        res.send(groupMap);  
    });
}