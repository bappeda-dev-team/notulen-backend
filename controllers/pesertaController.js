const {
  Uuid,
  Peserta,
  Perangkat_Daerah,
  Pegawai,
  Undangan,
  Notification
} = require('../models');
const { Op } = require("sequelize");

class PesertaController {
  static showResponsiblePeserta = async (req, res) => {
    try {
      const response = await Notification.findAll({
        where: {
          nip_penanggungjawab_peserta: {
            [Op.eq]: req.decoded.nip
          },
        },
        order: [["createdAt", "DESC"]],
        attributes: ['nip_penanggungjawab_peserta', 'status_notification_peserta'],
        include: [
          {
            model: Peserta,
            where: {
              tanggal: {
                [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
              }
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
          },
          {
            model: Uuid,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'uuid']
            },
            include: [
              {
                model: Pegawai,
                attributes: {
                  exclude: ['password', 'createdAt', 'updatedAt']
                }
              },
              {
                model: Undangan,
                attributes: ['acara', 'lokasi', 'tanggal', 'waktu']
              }
            ]
          }
        ]
      })

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "Notifikasi daftar hadir tidak ditemukan!",
            data: response,
          },
        });
      } else {
        let output = [];
        response.forEach(el => {
          output.push({
            status: el.dataValues.status_notification_peserta,
            Undangan: {
              acara: el.dataValues.Uuid.dataValues.Undangan.dataValues.acara,
              lokasi: el.dataValues.Uuid.dataValues.Undangan.dataValues.lokasi,
              tanggal: el.dataValues.Uuid.dataValues.Undangan.dataValues.tanggal,
              waktu: el.dataValues.Uuid.dataValues.Undangan.dataValues.waktu
            },
            Peserta: el.dataValues.Pesertum,
            Pelapor: el.dataValues.Uuid.dataValues.Pegawai
          })
        })
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: output,
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

  static getOnePeserta = async (req, res) => {
    try {
      const response = await Peserta.findOne({
        where: { id: +req.params.id },
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
                attributes: ['acara', 'lokasi', 'tanggal', 'waktu']
              }
            ]
          },
          {
            model: Notification,
            attributes: ['nip_penanggungjawab_peserta', 'status_notification_peserta']
          },
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
        if (response.dataValues.Notification.dataValues.nip_penanggungjawab_peserta !== null) {
          Pegawai.findOne({
            where: { nip: response.dataValues.Notification.dataValues.nip_penanggungjawab_peserta }
          })
            .then(pegawai => {
              response.dataValues.Notification.dataValues.Penanggungjawab = {
                nama: pegawai.nama,
                nip: pegawai.nip,
                pangkat: pegawai.pangkat,
                nama_pangkat: pegawai.nama_pangkat,
                jabatan: pegawai.jabatan,
                eselon: pegawai.eselon,
                role: pegawai.role,
              };

              res.status(200).json({
                success: true,
                data: {
                  code: 200,
                  message: "Success",
                  data: response,
                },
              });
            })
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
          }
          Peserta.create(payload)
            .then(response => {
              if (req.body.nip_penanggungjawab_peserta !== null) {
                const payload2 = {
                  uuid: req.body.uuid,
                  id_peserta: response.id,
                  status_notification_peserta: 'unread',
                  nip_penanggungjawab_peserta: req.body.nip_penanggungjawab_peserta
                }
                Notification.create(payload2)
              }
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
        jumlah_peserta: req.body.jumlah_peserta,
        jenis_peserta: req.body.jenis_peserta,
        tanggal: req.body.tanggal
      }

      const response = await Peserta.update(payload, {
        where: { id: +req.params.id },
        returning: true
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
        const payload2 = {
          nip_penanggungjawab_peserta: req.body.nip_penanggungjawab_peserta
        }

        Notification.update(payload2, {
          where: {
            id_peserta: response[1][0]?.dataValues.id
          },
          returning: true
        })
          .then(data => {
            res.status(200).json({
              success: true,
              data: {
                code: 200,
                message: "Success",
                data: data,
              },
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              data: {
                code: 500,
                message: "Internal server error",
                data: err,
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