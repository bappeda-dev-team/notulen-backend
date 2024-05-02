const { Perangkat_Daerah, Pegawai } = require('../models');
const axios = require('axios');

class OPDController {
  static syncOPD = async (req, res) => {
    try {
      const responseOPD = await axios({
        method: 'post',
        url: 'https://kak.madiunkota.go.id/api/opd/daftar_opd',
        headers: {
          "Content-Type": "application/json",
          "Accept": 'application/json'
        },
      })
      if (responseOPD.data.results.length != 0) {
        const opdData = responseOPD.data.results.map(async el => {
          const created = await Perangkat_Daerah.findOrCreate({
            where: {
              kode_opd: el.kode_opd,
            },
            defaults: {
              kode_opd: el.kode_opd,
              nama_opd: el.nama_opd,
            }
          })
        })
        if (opdData.length != 0) {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: 'Success',
              data: opdData
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

  static getAllOPD = async (req, res) => {
    try {
      const response = await Perangkat_Daerah.findAll({
        order: [['createdAt', 'DESC']]
      })

      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: 'Success',
          data: response
        }
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err.message
        }
      })
    }
  }

  static getOneOPDWithPegawai = async (req, res) => {
    try {
      const response = await Perangkat_Daerah.findOne({
        where: { kode_opd: req.params.kode_opd },
        include: [{
          model: Pegawai,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }]
      })

      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: 'Success',
          data: response
        }
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err.message
        }
      })
    }
  }

  static addDataOPD = async (req, res) => {
    try {
      const payload = {
        singkatan: req.body.singkatan,
        alamat: req.body.alamat,
        telepon: req.body.telepon,
        faximile: req.body.faximile,
        website: req.body.website,
        kepala_opd: req.body.kepala_opd
      }

      const response = await Perangkat_Daerah.update(payload, {
        where: {
          kode_opd: req.params.kode_opd
        }
      });

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'Kode OPD tidak ditemukan!'
          }
        })
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil update data pegawai',
            data: response
          }
        })
      }
    } catch (err) {
      if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'Periksa kembali data Anda!',
            data: null
          }
        })
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'Kode OPD sudah terdaftar'
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

  static getMasterUrusan = async (req, res) => {
    try {
      const response = await axios({
        url: 'https://kak.madiunkota.go.id/api/opd/urusan_opd',
        method: 'post',
        data: {},
        headers: {
          "Content-Type": "application/json",
          "Accept": 'application/json',
        },
      })
      if (response.data.results.length != 0) {

        const data = response.data.results
        let data2 = [];
        const urusanMap = new Map();

        data.forEach((opd) => {
          opd.urusan_opd.forEach((urusanOpd) => {
            urusanOpd.bidang_urusan_opd.forEach((bidangOpd) => {
              const key = `${urusanOpd.urusan}-${bidangOpd.bidang_urusan}`;
              if (!urusanMap.has(key)) {
                urusanMap.set(key, {
                  urusan: urusanOpd.urusan,
                  bidang_urusan_opd: [],
                });
              }
              urusanMap.get(key).bidang_urusan_opd.push({
                kode_bidang_urusan: bidangOpd.kode_bidang_urusan,
                bidang_urusan: bidangOpd.bidang_urusan,
                opd: {
                  kode_opd: opd.kode_opd,
                  nama_opd: opd.nama_opd,
                },
              });
            });
          });
        });
        data2.push(...urusanMap.values());

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: data2
          }
        })
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err.message
        }
      })
    }
  }
}

module.exports = OPDController;