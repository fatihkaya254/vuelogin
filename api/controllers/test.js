import Test from "../models/test"

exports.newtest = async(req,res) => {
    let test = req.body.test
    const newtest = await Test.create(test)
    res.status(201).json({ test: newtest})
}

exports.getAlltests = async (req,res) =>{
    Test.find({}, function(err, tests) {
        var testMap = {};
    
        tests.forEach(function(test) {
            testMap[test._id] = test;
        });
    
        res.send(testMap);  
    });
}