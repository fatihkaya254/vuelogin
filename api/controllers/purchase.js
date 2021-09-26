import Purchase from "../models/purchase";
import Package from "../models/package";
import axios from "axios";

exports.adminPurchase = async (req, res) => {
  let purchase = req.body.purchase;
  try {
    const newPurchase = await Purchase.create(purchase);
    res.status(201).json({ newPurchase: newPurchase });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

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
  try {
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
  } catch (error) {
    console.log(error);
  }
};

exports.getGroupStudentPurchases = async (req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    Purchase.find({
      groupRight: true,
      student: { $exists: true, $ne: null, $ne: undefined },
      endDate: { $gte: startOfToday }
    })
      .select("student branch packageName")
      .populate("student", "name surname")
      .populate("grade")
      .sort("student")
      .then(purchases => {
        var purchaseMap = {};
        purchases.forEach(function(purchaseInfo) {
          purchaseMap[purchaseInfo.student._id] = purchaseInfo;
        });
        res.send(purchaseMap);
      });
  } catch (error) {
    console.log(error);
  }
};

exports.addStudent = async (req, res) => {
  const student = req.body.student;
  const id = req.body.purchase;
  try {
    Purchase.findByIdAndUpdate({ _id: id }, { student }, () => {
      res.status(200).json({
        message: "updated"
      });
    });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

exports.parentShip = async (req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    var now = new Date();
    const todays = await Purchase.find({ endDate: { $gte: startOfToday } })
      .select("parent student")
      .populate({ path: "student" })
      .populate({ path: "parent" });
    res.status(201).json({ todays });
  } catch (error) {
    console.log(error);
  }
};

exports.listAll = async (req, res) => {
  Purchase.find()
    .sort("-purchaseDate")
    .populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "student", select: "name surname phone" })
    .populate({ path: "parent", select: "name surname phone" })
    .populate({ path: "grade" })
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(purchaseInfo) {
        purchaseMap[purchaseInfo._id] = purchaseInfo;
      });
      res.send(purchaseMap);
    });
};

exports.yearlyEarns = async (req, res) => {
  Purchase.find()
    .sort("parent student")
    .populate([{ path: 'branch', populate: { path: 'grade'}}])
    .populate('grade')
    .then(purchases => {
      var earns = {};
      var gStudent = {};
      var gFee = {};
      var gInfo = {};
      var gInfoTotal = {};
      var pGradeBranch = {};
      var pGradeBranchFee = {};
      var pGradeBranchAverageFee = {};
      var pNameBranch = {};
      var pNameBranchFee = {};
      var pNameBranchAverageFee = {};
      var pInfoGrade = {};
      var pInfoGradeTotal = {};
      var pInfo = {};
      var pInfoTotal = {};
      earns.total = 0 
      earns.priv = 0
      earns.group = 0
      earns.privCount = 0
      earns.yearlyPrivCount = 0
      earns.groupCount = 0
      earns.parents = 0
      earns.students = 0
      var parent = ""
      var student = ""
      var nextP = ""
      var nextS = ""
      purchases.forEach(function(p) {
        // grup sınıflarını say
        if (p.grade != undefined && p.grade.length != 0 ) { 
          if(gStudent[p.grade[0]._id] == undefined)  gStudent[p.grade[0]._id] = 0
          if(gFee[p.grade[0]._id] == undefined)  gFee[p.grade[0]._id] = 0
          gStudent[p.grade[0]._id] += 1
          gFee[p.grade[0]._id] += p.fee
          gInfo[p.grade[0]._id] = {name: p.grade[0].gradeName, students: gStudent[p.grade[0]._id], totalFee: gFee[p.grade[0]._id]}
          gInfoTotal[p.grade[0]._id] = gInfo[p.grade[0]._id]
          earns.grades = gInfoTotal
        }

        // özel dersleri say
        if (p.weeklyPrivateLesson != 0 && p.branch != undefined && p.branch.length != 0) {
            var life = p.installment
            var weeks = parseInt(life * 30 / 7, 10)
            var perBranchFee = parseInt(p.fee / p.weeklyPrivateLesson, 10)
          for (let branchCount = 0; branchCount < p.branch.length; branchCount++) {
            var branchId = p.branch[branchCount]._id
            var branchName = p.branch[branchCount].branchName
            var gradeName = p.branch[branchCount].grade.gradeName
            if(pGradeBranch[branchId] == undefined)  pGradeBranch[branchId] = 0
            pGradeBranch[branchId] += 1
            if(pGradeBranchFee[branchId] == undefined)  pGradeBranchFee[branchId] = 0
            pGradeBranchFee[branchId] += perBranchFee
            if(pGradeBranchAverageFee[branchId] == undefined)  pGradeBranchAverageFee[branchId] = 0
            pGradeBranchAverageFee[branchId] = parseInt(pGradeBranchFee[branchId] / pGradeBranch[branchId] / weeks, 10)
            if(pNameBranch[branchName] == undefined)  pNameBranch[branchName] = 0
            pNameBranch[branchName] += 1
            if(pNameBranchFee[branchName] == undefined)  pNameBranchFee[branchName] = 0
            pNameBranchFee[branchName] += perBranchFee
            if(pNameBranchAverageFee[branchName] == undefined)  pNameBranchAverageFee[branchName] = 0
            pNameBranchAverageFee[branchName] = parseInt(pNameBranchFee[branchName] / pNameBranch[branchName] / weeks, 10)
            pInfoGrade[branchId] = {name: gradeName + " " +branchName, hours: pGradeBranch[branchId], total:pGradeBranchFee[branchId], perHour: pGradeBranchAverageFee[branchId] }
            pInfo[branchName] = {name: branchName, hours: pNameBranch[branchName], total:pNameBranchFee[branchName], perHour: pNameBranchAverageFee[branchName] }
            pInfoGradeTotal[branchId]= pInfoGrade[branchId]
            earns.branches = pInfoGradeTotal
            pInfoTotal[branchName]= pInfo[branchName]
            earns.generalBranches= pInfoTotal
          }
        }

        if (p.fee == 0) return // ücretsiz paketleri atla

        // veli ve öğrencileri say
        nextP = ""+p.parent
        nextS = ""+p.student
        if(parent != nextP) earns.parents += 1
        if(student != nextS) earns.students += 1
        parent = nextP
        student = nextS

        // kazançları ve ortalamaları hesapla
        earns.total += p.fee;
        if (p.weeklyPrivateLesson != 0){
          earns.privCount += p.weeklyPrivateLesson
          var weeks = p.installment * 30 / 7
          var i = parseInt(weeks, 10)
          earns.yearlyPrivCount += p.weeklyPrivateLesson * i
          earns.priv += p.fee
        } 
        if (p.groupRight)
        {
          earns.groupCount += 1
          earns.group += p.fee
        }
      });
      earns.perPriv = parseInt(earns.priv / earns.privCount,10) 
      earns.perHourPriv = parseInt(earns.priv / earns.yearlyPrivCount,10) 
      earns.perGroup = parseInt(earns.group / earns.groupCount,10) 
      earns.perParent = parseInt(earns.total / earns.parents,10) 
      earns.perStudent = parseInt(earns.total / earns.students,10) 
      res.send(earns);
    });
};