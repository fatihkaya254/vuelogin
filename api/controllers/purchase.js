import Purchase from "../models/purchase";
import Package from "../models/package";
import axios from "axios";

exports.newPurchase = async (req, res) => {
  let purchase = req.body.purchase;
  let purshasedPackage = purchase.package;
  let branch = purchase.branches;
  let life = purchase.life;
  life = parseInt(life);
  let authKey = purchase.authkey;
  let parent = "";
  await axios
    .post(`${process.env.OUR_HOST}/auth`, { token: authKey })
    .then(res => {
      parent = res.data.user._id;
    });
  const starih = new Date();
  const ftarih = new Date();
  ftarih.setMonth(ftarih.getMonth() + life);
  // POST İLE AL
  const thatPackage = await Package.findById(purshasedPackage);
  if (thatPackage.scope == "group") {
    res.status(201).json({ purchase: "WrongScope" });
  } else {
    let fee = thatPackage.fee * life;
    const creatingPurchase = {
      package: thatPackage._id,
      parent: parent,
      purchaseDate: starih,
      endDate: ftarih,
      fee: fee,
      weeklyPrivateLesson: thatPackage.weeklyPrivateLesson,
      packageName: thatPackage.name,
      packageDesc: thatPackage.description,
      oncePrivateLesson: thatPackage.oncePrivateLesson,
      weeklyExam: thatPackage.weeklyExam,
      onceExam: thatPackage.onceExam,
      installment: life,
      branch: branch
    };
    const newPurchase = await Purchase.create(creatingPurchase);
    res.status(201).json({ purchase: newPurchase });
  }
};

exports.getAllPurchases = async (req, res) => {
  Purchase.find()
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "student" })
    .sort("student")
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(purchaseInfo) {
        purchaseMap[purchaseInfo._id] = purchaseInfo;
      });
      res.send(purchaseMap);
    });
};

exports.getMyPurchases = async (req, res) => {
  var id = req.body.id;
  await axios.post(`${process.env.OUR_HOST}/auth`, { token: id }).then(res => {
    id = res.data.user._id;
  });
  Purchase.find({ parent: id })
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "student" })
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(purchaseInfo) {
        purchaseMap[purchaseInfo._id] = purchaseInfo;
      });
      res.send(purchaseMap);
    });
};

exports.getStudentPurchases = async (req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  Purchase.find({
    student: { $exists: true, $ne: null, $ne: undefined },
    endDate: { $gte: startOfToday }
  })
    .select("student branch packageName")
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate("student", "name surname")
    .sort("student")
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(purchaseInfo) {
        purchaseMap[purchaseInfo._id] = purchaseInfo;
      });
      res.send(purchaseMap);
    });
};
