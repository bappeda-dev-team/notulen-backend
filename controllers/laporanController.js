const { Uuid, Perangkat_Daerah, Pegawai, Undangan, Peserta, Notulen, Tagging, Sasaran } = require('../models');
const { Op } = require("sequelize");

class LaporanController {
  static getAllLaporan = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Uuid.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: ['nama', 'nip']
            },
            {
              model: Sasaran,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Tagging,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Undangan,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archieve'
                },
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Peserta,
              required: false,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Notulen,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archieve'
                },
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            }
          ]
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response,
          },
        });
      } else if (req.decoded.role == 2) {
        const response = await Uuid.findAll({
          where: {
            kode_opd: req.params.kode_opd,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: ['nama', 'nip']
            },
            {
              model: Sasaran,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Tagging,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Undangan,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archieve'
                },
                tanggal_surat: {
                  [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
                }
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Peserta,
              required: false,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Notulen,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archieve'
                },
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            }
          ]
        })

        if (response === null) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "Undangan tidak ditemukan!",
              data: response,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: "Success",
              data: response,
            },
          });
        }
      } else if (req.decoded.role == 3 || req.decoded.role == 4) {
        const response = await Uuid.findAll({
          where: {
            nip_pegawai: req.decoded.nip,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: ['nama', 'nip']
            },
            {
              model: Sasaran,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'Sasaran_Uuid']]
              }
            },
            {
              model: Tagging,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'Tagging_Uuid']]
              }
            },
            {
              model: Undangan,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archieve'
                },
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Peserta,
              required: false,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Notulen,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archieve',
                }
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            }
          ]
        })

        if (response === null) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "Notulen tidak ditemukan!",
              data: response,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: "Success",
              data: response,
            },
          });
        }
      } else {
        res.status(401).json({
          success: false,
          data: {
            code: 401,
            message: "Unauthorized",
            data: null,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err.message,
        },
      });
    }
  }

  static getLaporanDetail = async (req, res) => {
    try {
      const response = await Uuid.findAll({
        where: {
          uuid: req.params.uuid
        },
        include: [
          {
            model: Undangan,
            required: false,
            where: {
              status: {
                [Op.not]: 'archieve'
              }
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          },
          {
            model: Peserta,
            required: false,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            include: [
              {
                model: Pegawai,
                attributes: {
                  exclude: ['password', 'status', 'createdAt', 'updatedAt']
                }
              }
            ]
          },
          {
            model: Notulen,
            required: false,
            where: {
              status: {
                [Op.not]: 'archieve'
              }
            },
            include: [
              {
                model: Pegawai,
                attributes: {
                  exclude: ['password', 'status', 'createdAt', 'updatedAt']
                }
              }
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ]
      })

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "Notulen tidak ditemukan!",
            data: response,
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
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
          data: err.message,
        },
      });
    }
  }
}

module.exports = LaporanController;