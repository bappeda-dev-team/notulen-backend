const { verifyToken } = require('../helpers/jwt');
const { Pegawai } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    const token = headerToken.replace(/^Bearer\s+/i, "");

    const decoded = verifyToken(token);

    const user = await Pegawai.findOne({
      where: {
        nip: decoded.nip
      }
    })

    if (!user) {
      res.status(401).json({
        code: 401,
        data: {
          code: 401,
          message: 'Invalid authentication',
          data: null
        }
      })
    }

    req.decoded = decoded;
    next();
  } catch (err) {
    if (err.message === 'jwt must be provided') {
      res.status(401).json({
        success: false,
        data: {
          code: 401,
          message: err.message,
          data: null
        }
      })
    } else {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'OwO terjadi kesalahan >.<',
          data: err
        }
      })
    }
  }
}

module.exports = authenticate;
