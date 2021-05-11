import Package from "../models/package"

exports.newpackage = async(req,res) => {
    let package = req.body.package
    const newpackage = await Package.create(package)
    res.status(201).json({ package: newpackage})
}

exports.getAllpackages = async (req,res) =>{
    Package.find({}, function(err, packages) {
        var packageMap = {};
    
        packages.forEach(function(package) {
            packageMap[package._id] = package;
        });
    
        res.send(packageMap);  
    });
}