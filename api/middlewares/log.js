exports.log = async (req, res, next) => {
    console.log(req._parsedUrl.pathname)
    next()
  };