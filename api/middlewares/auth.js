exports.update = async (req, res, next) => {
  var key = "TBYEfaFGAsFoyiph9c4OmnFEWZQZrpSLT3RgGbJ93OTE7WdT"
  var lock =  ""+req.headers.authorization
  if (lock == key) {
      next()
  }else{
    res.redirect(process.env.OUR_URL)
    
  }
};
