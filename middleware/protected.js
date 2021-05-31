const jwt = require('jsonwebtoken')

exports.protected = async function (req, res, next) {
  let token = req.cookies.token

  if (!token) {
    return res.status(400).json({ success: false, msg: 'No token' })
  }

  try {
    await jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      req.token = data
    })
    next()
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'Something wrong..' })
  }
}
