import Purchase from "../models/purchase"

exports.newPurchase = async(req,res) => {
    let purchaseInfo = req.body.purchase
    const newPurchase = await Purchase.create(purchaseInfo)
    res.status(201).json({ purchase: newPurchase})
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



