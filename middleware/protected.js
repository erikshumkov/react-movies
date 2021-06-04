const jwt = require('jsonwebtoken')

exports.protected = async function (req, res, next) {
  try {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
      return res.status(401).json({ success: false, msg: 'Not authenticated.' })
    }

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedJWT) {
      const err = new Error('Not authenticated.')
      err.statusCode = 401
      throw err
    }

    req.userId = decodedJWT.id
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, msg: 'Something wrong, in protected middleware' })
  }
}
