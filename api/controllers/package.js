import Package from "../models/package"

exports.newPackage = async(req,res) => {
    let package = req.body.package
    const newPackage = await Package.create(package)
    res.status(201).json({ package: newPackage})
}

exports.getAllPackage = async (req,res) =>{
    Package.find({}, function(err, packages) {
        var packageMap = {};
    
        packages.forEach(function(package) {
            packageMap[package._id] = package;
        });
    
        res.send(packageMap);  
    });
}