const { Tagging, Uuid, Tagging_Notulen, Perangkat_Daerah } = require('../models');

class TaggingController {
  static getAllTagging = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Tagging.findAll({
          where: { kode_opd: '1234567890' },
          include: [
            {
              model: Perangkat_Daerah,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Uuid,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
          ]
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response
          }
        })
      } else {
        const response = await Tagging.findAll({
          where: { kode_opd: req.params.kode_opd },
          include: [
            {
              model: Uuid,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
          ]
        })

        if (response === null) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "ID Tagging tidak ditemukan!",
              data: response,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: 'Success',
              data: response
            }
          })
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err
        }
      })
    }
  }

  // static getSelectNotulen = async (req, res) => {
  //   try {
  //     const response = await Tagging.findAll({
  //       where: { kode_opd: '1234567890' },
  //       include: [
  //         {
  //           model: Perangkat_Daerah,
  //           attributes: {
  //             exclude: [['createdAt', 'updatedAt']]
  //           }
  //         },
  //         {
  //           model: Notulen,
  //           attributes: {
  //             exclude: [['createdAt', 'updatedAt']]
  //           }
  //         },
  //       ]
  //     })

  //     res.status(200).json({
  //       success: true,
  //       data: {
  //         code: 200,
  //         message: 'Success',
  //         data: response
  //       }
  //     })
  //   } catch (err) {

  //   }
  // }

  static getOneTagging = async (req, res) => {
    try {
      const response = await Tagging.findOne({
        where: { id: +req.params.id },
        include: [
          {
            model: Notulen,
            attributes: {
              exclude: [['createdAt', 'updatedAt']]
            }
          },
        ]
      })

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Tagging tidak ditemukan!",
            data: response,
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response
          }
        })
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err
        }
      })
    }
  }

  static addTagging = async (req, res) => {
    try {
      const payload = {
        nama_tagging: req.body.nama_tagging,
        kode_opd: req.body.kode_opd
      }

      const response = await Tagging.create(payload);

      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: 'Data tagging berhasil ditambahkan',
          data: response
        }
      })
    } catch (err) {
      if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'Periksa kembali data Anda!',
            data: err.message
          }
        })
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'Nama notulen sudah terdaftar'
          }
        })
      } else {
        res.status(500).json({
          success: false,
          data: {
            code: 500,
            message: 'Internal server error',
            data: err
          }
        })
      }
    }
  }

  static editTagging = async (req, res) => {
    try {
      const payload = {
        nama_tagging: req.body.nama_tagging
      }

      const response = await Tagging.update(payload, {
        where: { id: +req.params.id },
      })

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Komponen tidak ditemukan!",
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Berhasil update data pegawai",
            data: response,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err,
        },
      });
    }
  }

  static deleteTagging = async (req, res) => {
    try {
      Tagging_Notulen.destroy({
        where: { id_tagging: +req.params.id },
        returning: true
      })
        .then(async () => {
          try {
            const response = await Tagging.destroy({
              where: { id: +req.params.id },
              returning: true
            })

            if (response == 1) {
              res.status(200).json({
                success: true,
                data: {
                  code: 200,
                  message: 'Berhasil hapus data Tagging',
                  data: response
                }
              })
            } else {
              res.status(404).json({
                success: false,
                data: {
                  code: 404,
                  message: 'ID Tagging tidak ditemukan!'
                }
              })
            }
          } catch (err) {
            res.status(500).json({
              success: false,
              data: {
                code: 500,
                message: 'Internal server error',
                data: err
              }
            })
          }
        })
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err,
        },
      });
    }
  }
}

module.exports = TaggingController