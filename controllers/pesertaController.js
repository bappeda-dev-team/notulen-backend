const {
  Uuid,
  Peserta,
  Perangkat_Daerah,
  Pegawai,
  Undangan,
} = require('../models');

class PesertaController {
  static showResponsiblePeserta = async (req, res) => {
    try {
      const response = await Peserta.findAll({
        where: {
          penanggungjawab: req.params.nip
        },
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Uuid,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            include: [
              {
                model: Perangkat_Daerah,
                attributes: ['kode_opd', 'nama_opd', 'singkatan']
              },
              {
                model: Pegawai,
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'password']
                }
              }
            ]
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

  static getOnePeserta = async (req, res) => {
    try {
      const response = await Peserta.findOne({
        where: {
          id: +req.params.id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Uuid,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            include: [
              {
                model: Perangkat_Daerah,
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              },
              {
                model: Pegawai,
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'password']
                }
              },
              {
                model: Undangan,
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              },
            ]
          }
        ]
      })

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Daftar Hadir tidak ditemukan!",
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
          data: err,
        },
      });
    }
  }

  static addPeserta = async (req, res) => {
    if (req.decoded.role == 4) {
      Uuid.findOrCreate({
        where: {
          uuid: req.body.uuid
        },
        defaults: {
          uuid: req.body.uuid,
          kode_opd: req.body.kode_opd,
          nip_pegawai: req.body.nip_pegawai,
        }
      })
        .then(_ => {
          const payload = {
            uuid: req.body.uuid,
            jumlah_peserta: req.body.jumlah_peserta,
            jenis_peserta: req.body.jenis_peserta,
            tanggal: req.body.tanggal,
            penanggungjawab: req.body.penanggungjawab
          }

          Peserta.create(payload)
            .then(response => {
              res.status(201).json({
                success: true,
                data: {
                  code: 201,
                  message: "Jumlah peserta berhasil ditambahkan",
                  data: response,
                },
              });
            })
            .catch(err => {
              console.log(err);
              if (err.name === "SequelizeDatabaseError") {
                res.status(400).json({
                  success: false,
                  data: {
                    code: 400,
                    message: "Periksa kembali data Anda!",
                    data: null,
                  },
                });
              } else if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({
                  success: false,
                  data: {
                    code: 400,
                    message: "Nama Peserta sudah terdaftar",
                  },
                });
              } else {
                res.status(500).json({
                  success: false,
                  data: {
                    code: 500,
                    message: "Internal server error",
                    data: err,
                  },
                });
              }
            })
        })
    } else {
      res.status(401).json({
        success: false,
        data: {
          code: 404,
          message: 'Unauthorized',
          data: null
        }
      })
    }
  }

  static editPeserta = async (req, res) => {
    try {
      const payload = {
        uuid: req.body.uuid,
        jumlah_peserta: req.body.jumlah_peserta,
        jenis_peserta: req.body.jenis_peserta,
        tanggal: req.body.tanggal
      }

      const response = await Peserta.update(payload, {
        where: { id: +req.params.id }
      })

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Daftar Hadir tidak ditemukan!",
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Berhasil update data Daftar Hadir",
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

  static deletePeserta = async (req, res) => {
    try {
      const response = await Peserta.destroy({
        where: { id: +req.params.id },
        returning: true
      })

      if (response == 1) {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil hapus data daftar hadir',
            data: response
          }
        })
      } else {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID daftar hadir tidak ditemukan!'
          }
        })
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
}

module.exports = PesertaController;