import Purchase from "../models/purchase"
import Package from "../models/package"


exports.newPurchase = async(req,res) => {

    let purchase = req.body.purchase
    let purshasedPackage = purchase.package
    let branch = purchase.branches
    let life = purchase.life
    let authKey = purchase.authkey

    // POST İLE AL
    const thatPackage = await Package.findById(purshasedPackage)
    const creatingPurchase = {
        package: purshasedPackage,
        parent:"",
        student: "",
        purchaseDate: "",
        endDate: "",
        fee: "",
        weeklyPrivateLesson: "",
        oncePrivateLesson: "",
        weeklyExam: "",
        onceExam:"",
        installment: "",
        branch: ""
    }
    //const newPurchase = await Purchase.create(purchaseInfo)
    res.status(201).json({ purchase: parent})
}

exports.getAllPurchases = async (req,res) =>{
    Purchase.find({}, function(err, purchases) {
        var purchaseMap = {};
    
        purchases.forEach(function(purchaseInfo) {
            purchaseMap[purchaseInfo._id] = purchaseInfo;
        });
    
        res.send(purchaseMap);  
    });
}



