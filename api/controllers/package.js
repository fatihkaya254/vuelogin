import Package from "../models/package"

exports.newPackage = async(req,res) => {
    let packageInfo = req.body.package
    const newPackage = await Package.create(packageInfo)
    res.status(201).json({ package: newPackage})
}

exports.getAllPackages = async (req,res) =>{
    Package.find({}, function(err, packages) {
        var packageMap = {};
    
        packages.forEach(function(packageInfo) {
            packageMap[packageInfo._id] = packageInfo;
        });
    
        res.send(packageMap);  
    });
}