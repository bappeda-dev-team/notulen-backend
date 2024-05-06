const {
  Uuid,
  Perangkat_Daerah,
  Pegawai,
  Undangan,
  Peserta,
  Notulen,
  Tagging,
  Sasaran,
  Notification
} = require('../models');
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
            include: {
              model: Notification,
              required: false,
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            }
          },
          {
            model: Notulen,
            required: false,
            where: {
              status: {
                [Op.not]: 'archieve'
              }
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            include: {
              model: Notification,
              required: false,
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            }
          },

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
        let nipArr = [];
        response.forEach(el => {
          el.Peserta.forEach(el2 => {
            if (el2.Notification !== null) {
              nipArr.push(el2.Notification.nip_penanggungjawab_peserta);
            }
          })
          el.Notulens.forEach(el2 => {
            if (el2.Notification !== null) {
              nipArr.push(el2.Notification.nip_penanggungjawab_notulen)
            }
          })
        })
        Pegawai.findAll({
          where: { nip: nipArr }
        })
          .then(resPegawai => {
            response.map(entry => {
              const Peserta = entry.Peserta.map(peserta => {
                if (peserta.Notification !== null) {
                  const pegawai = resPegawai.find(p => p.nip === peserta.Notification.nip_penanggungjawab_peserta);
                  if (pegawai) {
                    peserta.dataValues.Notification.dataValues.Penanggungjawab = {
                      nama: pegawai.nama,
                      nip: pegawai.nip,
                      pangkat: pegawai.pangkat,
                      nama_pangkat: pegawai.nama_pangkat,
                      jabatan: pegawai.jabatan,
                      eselon: pegawai.eselon,
                      role: pegawai.role,
                    };
                  }
                  return peserta;
                }
              });

              const Notulen = entry.Notulens.map(notulen => {
                if (notulen.Notification !== null) {
                  const pegawai = resPegawai.find(p => p.nip === notulen.Notification.nip_penanggungjawab_notulen);
                  if (pegawai) {
                    notulen.dataValues.Notification.dataValues.Penanggungjawab = {
                      nama: pegawai.nama,
                      nip: pegawai.nip,
                      pangkat: pegawai.pangkat,
                      nama_pangkat: pegawai.nama_pangkat,
                      jabatan: pegawai.jabatan,
                      eselon: pegawai.eselon,
                      role: pegawai.role,
                    };
                  }
                }
              })

              entry.Peserta = Peserta;
              entry.Notulen = Notulen;

              return entry;
            });

            res.status(200).json({
              success: true,
              data: {
                code: 200,
                message: "Success",
                data: response,
              },
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              data: {
                code: 500,
                message: "Internal server error",
                data: err.message,
              },
            });
          })
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