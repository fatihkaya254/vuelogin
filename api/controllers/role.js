import Role from "../models/role"

exports.newRole = async(req,res) => {
    let role = req.body.role
    const newrole = await Role.create(role)
    res.status(201).json({ role: newrole})
}

exports.getAllRoles = async (req,res) =>{
    Role.find({}, function(err, roles) {
        var roleMap = {};
    
        roles.forEach(function(role) {
            roleMap[role._id] = role;
        });
    
        res.send(roleMap);  
    });
}