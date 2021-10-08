import Purchase from "../models/purchase";
import Package from "../models/package";
import axios from "axios";
axios.defaults.headers.common['Authorization'] = process.env.AXIOS_AUTH;

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

exports.actives = async (req, res) => {
  Purchase.find({
    cancel: { $ne: true },
    fee: { $ne: 0 },
  })
    //.populate({ path: "branch", populate: { path: "grade" } })
    .populate({ path: "parent" })
    .sort("parent")
    .then(purchases => {
      var purchaseMap = {};
      purchases.forEach(function(purchaseInfo) {
        purchaseMap[purchaseInfo._id] = purchaseInfo;
      });
      res.send(purchaseMap);
    });
};

exports.getMyPurchases = async (req, res, context) => {
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
      endDate: { $gte: startOfToday },
      cancel: { $ne: true }
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
      cancel: { $ne: true },
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

exports.update = async (req, res) => {
  let id = req.body.id;
  let where = req.body.where;
  let value = req.body.value;
  try {
    Purchase.findByIdAndUpdate({ _id: id }, { [where]: value }, () => {
      res.status(200).json({
        message: "updated"
      });
    });
  } catch (error) {
    console.log(error);
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
  console.log(req)

  Purchase.find()
    .sort("parent student")
    .populate([{ path: "branch", populate: { path: "grade" } }])
    .populate("grade")
    .populate("parent")
    .populate("student")
    .then(purchases => {
      function fixDate(mydate) {
        let date = mydate;
        var d = date.getDate();
        if (d < 10) d = "0" + d;
        var m = date.getMonth() + 1;
        if (m < 10) m = "0" + m;
        var y = date.getFullYear();
        return y + "-" + m + "-" + d;
      }
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
      earns.cronosTotal = {};
      earns.total = 0;
      earns.totalWaived = 0;
      earns.totalUnWaived = 0;
      earns.priv = 0;
      earns.group = 0;
      earns.privCount = 0;
      earns.yearlyPrivCount = 0;
      earns.groupCount = 0;
      earns.parents = 0;
      earns.cparents = 0;
      earns.students = 0;
      earns.cstudents = 0;
      earns.grades = {};
      earns.branches = {};
      earns.generalBranches = {};
      earns.sList = {};
      earns.csList = {};
      earns.csList2 = {};
      earns.cpList = {};
      earns.pList = {};
      earns.groupPM = {};
      earns.groupPMC = {};
      earns.cronosStudent = {};
      var parent = "";
      var student = "";
      var nextP = "";
      var nextS = "";
      purchases.forEach(function(p) {
        nextP = "" + p.parent._id;
        nextS = "" + p.student._id;
        if (p.cancel) {
          if (parent != nextP) {
            if (earns.cpList[p.parent._id] == undefined) {
              earns.cpList[p.parent._id] = {};
              earns.cpList[p.parent._id].fee = 0;
            }
            earns.cpList[p.parent._id].name =
              p.parent.name + " " + p.parent.surname;
            earns.cparents += 1;
          }
          earns.cpList[p.parent._id].fee += p.waivedWage;
          if (student != nextS) {
            if (earns.csList[p.student._id] == undefined) {
              earns.csList[p.student._id] = {};
              earns.csList2[p.student._id] = {};
              earns.csList[p.student._id].fee = 0;
              earns.csList2[p.student._id].fee = 0;
            }
            earns.csList[p.student._id].name =
              p.student.name + " " + p.student.surname;
            earns.csList2[p.student._id].name =
              p.student.name + " " + p.student.surname;
            earns.cstudents += 1;
          }
          var date = new Date(p.cancelDate);
          if (earns.cronosTotal[fixDate(date)] == undefined) {
            earns.cronosTotal[fixDate(date)] = 0;
          }
          if (earns.cronosStudent[fixDate(date)] != undefined) {
            earns.cronosStudent[fixDate(date)] = 0;
          }
          earns.cronosStudent[fixDate(date)] -= 1;
          date = new Date(p.purchaseDate);
          if (earns.cronosTotal[fixDate(date)] == undefined) {
            earns.cronosTotal[fixDate(date)] = 0;
          }
          if (earns.cronosStudent[fixDate(date)] == undefined) {
            earns.cronosStudent[fixDate(date)] = 0;
          }
          earns.cronosStudent[fixDate(date)] += 1;
          if (p.groupRight) {
            if (earns.groupPM[fixDate(date)] == undefined) {
              earns.groupPM[fixDate(date)] = 0;
            }
            earns.groupPM[fixDate(date)] += p.fee;
            if (earns.groupPMC[fixDate(date)] == undefined) {
              earns.groupPMC[fixDate(date)] = 0;
            }
            earns.groupPMC[fixDate(date)] += 1;
          }
          earns.cronosTotal[fixDate(date)] += p.fee;
          earns.cronosTotal[fixDate(date)] -= p.waivedWage;
          earns.csList[p.student._id].fee += p.waivedWage;
          earns.csList2[p.student._id].fee += p.fee - p.waivedWage;
          earns.totalWaived += p.waivedWage;
          earns.totalUnWaived += p.fee - p.waivedWage;
          earns.total += p.fee - p.waivedWage;
          parent = nextP;
          student = nextS;
          return;
        }
        // grup sınıflarını say
        if (p.grade != undefined && p.grade.length != 0) {
          if (gStudent[p.grade[0]._id] == undefined)
            gStudent[p.grade[0]._id] = 0;
          if (gFee[p.grade[0]._id] == undefined) gFee[p.grade[0]._id] = 0;
          gStudent[p.grade[0]._id] += 1;
          gFee[p.grade[0]._id] += p.fee;
          gInfo[p.grade[0]._id] = {
            name: p.grade[0].gradeName,
            students: gStudent[p.grade[0]._id],
            totalFee: gFee[p.grade[0]._id]
          };
          gInfoTotal[p.grade[0]._id] = gInfo[p.grade[0]._id];
          earns.grades = gInfoTotal;
        }

        // özel dersleri say
        if (
          p.weeklyPrivateLesson != 0 &&
          p.branch != undefined &&
          p.branch.length != 0
        ) {
          var life = p.installment;
          var weeks = parseInt((life * 30) / 7, 10);
          var perBranchFee = parseInt(p.fee / p.weeklyPrivateLesson, 10);
          for (
            let branchCount = 0;
            branchCount < p.branch.length;
            branchCount++
          ) {
            var branchId = p.branch[branchCount]._id;
            var branchName = p.branch[branchCount].branchName;
            var gradeName = p.branch[branchCount].grade.gradeName;
            if (pGradeBranch[branchId] == undefined) pGradeBranch[branchId] = 0;
            pGradeBranch[branchId] += 1;
            if (pGradeBranchFee[branchId] == undefined)
              pGradeBranchFee[branchId] = 0;
            pGradeBranchFee[branchId] += perBranchFee;
            if (pGradeBranchAverageFee[branchId] == undefined)
              pGradeBranchAverageFee[branchId] = 0;
            pGradeBranchAverageFee[branchId] = parseInt(
              pGradeBranchFee[branchId] / pGradeBranch[branchId] / weeks,
              10
            );
            if (pNameBranch[branchName] == undefined)
              pNameBranch[branchName] = 0;
            pNameBranch[branchName] += 1;
            if (pNameBranchFee[branchName] == undefined)
              pNameBranchFee[branchName] = 0;
            pNameBranchFee[branchName] += perBranchFee;
            if (pNameBranchAverageFee[branchName] == undefined)
              pNameBranchAverageFee[branchName] = 0;
            pNameBranchAverageFee[branchName] = parseInt(
              pNameBranchFee[branchName] / pNameBranch[branchName] / weeks,
              10
            );
            pInfoGrade[branchId] = {
              name: gradeName + " " + branchName,
              hours: pGradeBranch[branchId],
              total: pGradeBranchFee[branchId],
              perHour: pGradeBranchAverageFee[branchId]
            };
            pInfo[branchName] = {
              name: branchName,
              hours: pNameBranch[branchName],
              total: pNameBranchFee[branchName],
              perHour: pNameBranchAverageFee[branchName]
            };
            pInfoGradeTotal[branchId] = pInfoGrade[branchId];
            earns.branches = pInfoGradeTotal;
            pInfoTotal[branchName] = pInfo[branchName];
            earns.generalBranches = pInfoTotal;
          }
        }

        if (p.fee == 0) return; // ücretsiz paketleri atla

        // veli ve öğrencileri say

        if (parent != nextP) {
          if (earns.pList[p.parent._id] == undefined) {
            earns.pList[p.parent._id] = {};
            earns.pList[p.parent._id].fee = 0;
          }
          earns.pList[p.parent._id].name =
            p.parent.name + " " + p.parent.surname;
          earns.parents += 1;
        }
        earns.pList[p.parent._id].fee += p.fee;
        if (student != nextS) {
          if (earns.sList[p.student._id] == undefined) {
            earns.sList[p.student._id] = {};
            earns.sList[p.student._id].fee = 0;
          }
          earns.sList[p.student._id].name =
            p.student.name + " " + p.student.surname;
          earns.students += 1;
          var date = new Date(p.purchaseDate);
          if (earns.cronosStudent[fixDate(date)] == undefined) {
            earns.cronosStudent[fixDate(date)] = 0;
          }
          earns.cronosStudent[fixDate(date)] += 1;
        }
        earns.sList[p.student._id].fee += p.fee;
        parent = nextP;
        student = nextS;

        var date = new Date(p.purchaseDate);
        if (p.groupRight) {
          if (earns.groupPM[fixDate(date)] == undefined) {
            earns.groupPM[fixDate(date)] = 0;
          }
          earns.groupPM[fixDate(date)] += p.fee;
          if (earns.groupPMC[fixDate(date)] == undefined) {
            earns.groupPMC[fixDate(date)] = 0;
          }
          earns.groupPMC[fixDate(date)] += 1;
        }
        if (earns.cronosTotal[fixDate(date)] == undefined) {
          earns.cronosTotal[fixDate(date)] = 0;
        }
        earns.cronosTotal[fixDate(date)] += p.fee;
        // kazançları ve ortalamaları hesapla
        earns.total += p.fee;
        if (p.weeklyPrivateLesson != 0) {
          earns.privCount += p.weeklyPrivateLesson;
          var weeks = (p.installment * 30) / 7;
          var i = parseInt(weeks, 10);
          earns.yearlyPrivCount += p.weeklyPrivateLesson * i;
          earns.priv += p.fee;
        }
        if (p.groupRight) {
          earns.groupCount += 1;
          earns.group += p.fee;
        }
      });
      earns.perPriv = parseInt(earns.priv / earns.privCount, 10);
      earns.perHourPriv = parseInt(earns.priv / earns.yearlyPrivCount, 10);
      earns.perGroup = parseInt(earns.group / earns.groupCount, 10);
      earns.perParent = parseInt(earns.total / earns.parents, 10);
      earns.perStudent = parseInt(earns.total / earns.students, 10);
      res.send(earns);
    });
};
