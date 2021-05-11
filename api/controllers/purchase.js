import Purchase from "../models/purchase"

exports.newPurchase = async(req,res) => {
    let purchase = req.body.purchase
    const newpurchase = await Purchase.create(purchase)
    res.status(201).json({ purchase: newpurchase})
}

exports.getAllPurchases = async (req,res) =>{
    Purchase.find({}, function(err, purchases) {
        var purchaseMap = {};
    
        purchases.forEach(function(purchase) {
            purchaseMap[purchase._id] = purchase;
        });
    
        res.send(purchaseMap);  
    });
}