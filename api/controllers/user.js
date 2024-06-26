import User from "../models/user.js";
import axios from "axios";
import PhoneAuth from "../models/phoneAuth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;
const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, "G@#FCs5,2Bpy!wN}YCVE", {
    expiresIn: maxAge
  });
};
exports.generateCode = async (req, res) => {
  const phoneNumber = req.body.phone;
  console.log("numara giriş yapıyor: " + phoneNumber);
  const passcode = Math.floor(Math.random() * (99999 - 10000)) + 10000;
  axios
    .post("https://api.iletimerkezi.com/v1/send-sms/json", {
      request: {
        authentication: {
          username: "5073857166",
          password: "ZLeen-hNN4-01"
        },
        order: {
          sender: "ISLYNZHNLR",
          message: {
            text: "İzders.com giriş kodu: " + passcode,
            receipents: {
              number: [phoneNumber]
            }
          }
        }
      }
    })
    .then(async resp => {
      console.log(resp.status);
      console.log(resp.statusText);
      if (resp.status == 200) {
        res.status(201).json({
          smsStatus: "success"
        });
      } else {
        console.log("sms gönderilemedi");
      }
    })
    .catch(resp => {
      console.log(resp.status);
      console.log(resp.statusText);
      if (resp.response.status == 452) {
        res.status(201).json({
          smsStatus: "numberInvalid"
        });
      }
    });

  try {
    const auth = { phone: phoneNumber, code: passcode };
    const authInfo = await PhoneAuth.findOne({ phone: phoneNumber });
    if (authInfo) {
      const deleteAuth = await PhoneAuth.deleteOne({ phone: phoneNumber });
    } else {
      console.log("bu kayıt yok");
    }
    const createdPost = await PhoneAuth.create(auth);
    //  console.log(createdPost);
  } catch (error) {
    //  console.log(error);
  }
};

exports.authCode = async (req, res) => {
  const enteredCode = req.body.code;
  const phoneNumber = req.body.phone;
  try {
    const auth = { phone: phoneNumber, code: enteredCode };
    const authInfo = await PhoneAuth.findOne(auth);
    if (authInfo) {
      const userInfo = await User.findOne({ phone: phoneNumber });
      if (userInfo) {
        const token = createToken(userInfo._id);
        res
          .status(201)
          .json({ auth: true, userInfo: userInfo, authKey: token });
      } else {
        const NewUser = { phone: phoneNumber };
        const createdUser = await User.create(NewUser);
        const token = createToken(createdUser._id);
        res
          .status(201)
          .json({ auth: true, userInfo: createdUser, authKey: token });
      }
    } else {
      res.status(201).json({ auth: false });
    }
  } catch (error) {}
};

exports.changePass = async (req, res) => {
  const id = req.body.user;
  const enteredCode = req.body.passcode;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(enteredCode, salt, function(err, hash) {
      console.log("saltRounds");
      console.log(saltRounds);
      console.log(salt);
      console.log(hash);
      User.findByIdAndUpdate({ _id: id }, { password: hash }, () => {
        res.status(200).json({
          message: "updated"
        });
      });
    });
  });
};
exports.authPass = async (req, res) => {
  const enteredCode = req.body.code;
  const phoneNumber = req.body.phone;
  try {
    const auth = { phone: phoneNumber };
    const userInfo = await User.findOne(auth);
    if (userInfo) {
      bcrypt.compare(enteredCode, userInfo.password, function(err, result) {
        if (result) {
          const token = createToken(userInfo._id);
          res
            .status(201)
            .json({ auth: true, userInfo: userInfo, authKey: token });
        } else {
          res.status(201).json({ auth: false });
        }
      });
    } else {
      res.status(201).json({ auth: false });
    }
  } catch (error) {
    res.status(201).json({ auth: false });
    console.log(error);
  }
};

exports.authGoogle = async (req, res) => {
  const googleId = req.body.googleId;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const profilePic = req.body.profilePic;
  try {
    const userInfo = await User.findOne({ googleId: googleId });
    if (userInfo) {
      const token = createToken(userInfo._id);
      res.status(201).json({ auth: true, userInfo: userInfo, authKey: token });
    } else {
      const NewUser = { googleId, name, surname, email, profilePic };
      const createdUser = await User.create(NewUser);
      const token = createToken(createdUser._id);
      res
        .status(201)
        .json({ auth: true, userInfo: createdUser, authKey: token });
    }
  } catch (error) {}
};

exports.auth = async (req, res) => {
  console.log("token taken");
  let token = req.body.token;
  if (token) {
    console.log("token verifing");
    jwt.verify(token, "G@#FCs5,2Bpy!wN}YCVE", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        //console.log("id: " + decodedToken.id);
        const userInfo = await User.findById(decodedToken.id).populate("role");
        console.log("token verifing ok");
        //console.log("userinfobeforeid: " + userInfo);
        res.status(201).json({ auth: true, user: userInfo });
      }
    });
  } else {
    res.status(201).json({auth: false,  user: null });
  }
};

exports.changePhoneCheck = async (req, res) => {
  const enteredCode = req.body.code;
  const phoneNumber = req.body.phone;
  const id = req.body.id;
  try {
    const auth = { phone: phoneNumber, code: enteredCode };
    const authInfo = await PhoneAuth.findOne(auth);
    if (authInfo) {
      const userInfo = await User.findOne({ phone: phoneNumber });
      if (userInfo) {
        res.status(200).json({
          message: "alreadyUsed"
        });
      } else {
        try {
          const userInfo = await User.findOne({ _id: id });
          var oldPhone = userInfo.phone;
          var name = userInfo.name + " " + userInfo.surname;
          axios
            .post("https://api.iletimerkezi.com/v1/send-sms/json", {
              request: {
                authentication: {
                  username: "5073857166",
                  password: "Up3QKbnUGxGp9TL"
                },
                order: {
                  sender: "ISLYNZHNLR",
                  message: {
                    text:
                      "Sayın " +
                      name +
                      " izders.com profilinizdeki telefon numaranız değiştirilmiştir. İşlem bilginiz dahilinde değilse lütfen iletişme geçiniz.",
                    receipents: {
                      number: [oldPhone]
                    }
                  }
                }
              }
            })
            .then(async resp => {
              console.log("res: " + resp.status);
              if (resp.status == 200) {
              } else {
                console.log("habu rizeye emicen vefat etti");
              }
            })
            .catch(resp => {
              console.log(resp.response.status);
              if (resp.response.status == 452) {
              }
            });
        } catch (error) {}
        try {
          await User.findByIdAndUpdate(
            { _id: id },
            { phone: phoneNumber },
            () => {
              res.status(200).json({
                message: "updated"
              });
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      res.status(201).json({ auth: false });
    }
  } catch (error) {}
};

async function generateSMS(phone) {
  const phoneNumber = phone;
  const passcode = Math.floor(Math.random() * (99999 - 10000)) + 10000;
  axios
    .post("https://api.iletimerkezi.com/v1/send-sms/json", {
      request: {
        authentication: {
          username: "5073857166",
          password: "Up3QKbnUGxGp9TL"
        },
        order: {
          sender: "ISLYNZHNLR",
          message: {
            text:
              "İzders.com telefon numarası değişrimek için onay kodu: " +
              passcode,
            receipents: {
              number: [phoneNumber]
            }
          }
        }
      }
    })
    .then(async resp => {
      if (resp.status == 200) {
      } else {
        console.log("habu rizeye emicen vefat etti");
      }
    })
    .catch(resp => {
      if (resp.response.status == 452) {
      }
    });

  try {
    const auth = { phone: phoneNumber, code: passcode };
    const authInfo = await PhoneAuth.findOne({ phone: phoneNumber });
    if (authInfo) {
      const deleteAuth = await PhoneAuth.deleteOne({ phone: phoneNumber });
    } else {
      console.log("bu kayıt yok");
    }
    const createdPost = await PhoneAuth.create(auth);
    //  console.log(createdPost);
  } catch (error) {
    //  console.log(error);
  }
}

exports.update = async (req, res) => {
  let id = req.body.id;
  let where = req.body.where;
  let value = req.body.value;
  if (where != "phone") {
    try {
      User.findByIdAndUpdate({ _id: id }, { [where]: value }, () => {
        res.status(200).json({
          message: "updated"
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    await generateSMS(value);
    res.status(200).json({
      message: "generated"
    });
  }
};
exports.getNumbers = async (req, res) => {
  User.find().then(users => {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user.phone] = user.name + ' ' + user.surname;
    });

    res.send(userMap);
  });
};
exports.getNumbersandSoft = async (req, res) => {
  User.find().then(users => {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user.phone] = user.name + ' ' + user.surname + " - " + user.annonate;
    });
    res.send(userMap);
  });
};
exports.getAll = async (req, res) => {
  User.find().then(users => {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
};

exports.getAllNames = async ( req, res ) => {
  try {
    const users = await User.find()
    const userNames = users.reduce((acc, user) => {
      acc[user._id] = `${user.name} ${user.surname}`;
      return acc;
  }, {});
    res.send({userNames})
  } catch (error) {
    res.send({ error })
  }
}
// belirli bir branşı aramak için $elemMatch : { $eq: "60a38a65252c3e2968a6e0f7"}
exports.getTeachers = async (req, res) => {
  User.find({ branch: { $exists: true, $ne: null, $ne: [] } }).then(users => {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
};

exports.getUserRole = async (req, res) => {
  User.find()
    .populate("role")
    .then(users => {
      var userMap = {};
      users.forEach(function(user) {
        userMap[user._id] = user;
      });

      res.send(userMap);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.newUser = async (req, res) => {
  const user = req.body.user;
  const phone = user.phone;
  const isset = await User.findOne({ phone });

  if (isset != null && isset != undefined) {
    res.status(201).json({ user: isset, message: "Bu numara kullanılmakta" });
  } else {
    const newuser = await User.create(user);
    res
      .status(201)
      .json({ user: newuser, message: "Kullanıcı Kaydı Başarılı" });
  }
};

exports.getOneUser = async (req, res) => {
  let phone = req.body.phone;
  try {
    const userInfo = await User.findOne({ phone: phone }).populate({
      path: "branch",
      populate: { path: "grade" }
    });
    res.status(201).json({ user: userInfo });
  } catch (error) {
    res.status(201).json({ user: null });
  }
};
