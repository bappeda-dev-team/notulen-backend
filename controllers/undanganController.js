const { Uuid, Undangan, Perangkat_Daerah, Pegawai, Sasaran, Tagging } = require('../models');
const { Op } = require("sequelize");

class UndanganController {
  static getAllUndangan = async (req, res) => {
    const currentYear = new Date().getFullYear();
    try {
      if (req.decoded.role == 1) {
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archive'
            },
            tahun: currentYear.toString()
          },
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
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
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            kode_opd: req.params.kode_opd,
            tahun: currentYear.toString()
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'password']]
              }
            },
          ],
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response,
          },
        });
      } else if (req.decoded.role == 3 || req.decoded.role == 4) {
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            nip_pegawai: req.decoded.nip,
            tahun: currentYear.toString()
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'password']]
              }
            },
          ],
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response
          },
        });
      } else {
        res.status(401).json({
          success: false,
          data: {
            code: 401,
            message: "Unauthorized",
            data: err,
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

  static getAuthUndangan = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Uuid,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              },
              include: [
                {
                  model: Perangkat_Daerah,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt']]
                  }
                },
                {
                  model: Pegawai,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt', 'password']]
                  }
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
      } else if (req.decoded.role == 2) {
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Uuid,
              where: {
                kode_opd: req.params.kode_opd,
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              },
              include: [
                {
                  model: Perangkat_Daerah,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt']]
                  }
                },
                {
                  model: Pegawai,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt', 'password']]
                  }
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
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Uuid,
              where: {
                nip_pegawai: req.decoded.nip,
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              },
              include: [
                {
                  model: Perangkat_Daerah,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt']]
                  }
                },
                {
                  model: Pegawai,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt', 'password']]
                  }
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
      console.log(err.message, '???');
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

  static getOneUndangan = async (req, res) => {
    try {
      const response = await Undangan.findOne({
        where: {
          id: +req.params.id,
        },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: [['createdAt', 'updatedAt']]
        },
        include: [
          {
            model: Uuid,
            attributes: {
              exclude: [['createdAt', 'updatedAt']]
            },
            include: [
              {
                model: Perangkat_Daerah,
                attributes: {
                  exclude: [['createdAt', 'updatedAt']]
                }
              },
              {
                model: Pegawai,
                attributes: {
                  exclude: [['createdAt', 'updatedAt', 'password']]
                }
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
              }
            ]
          }
        ]
      });

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Undangan tidak ditemukan!",
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

  static addUndangan = (req, res) => {
    if (req.decoded.role == 2 || req.decoded.role == 3 || req.decoded.role == 4) {
      Uuid.findOrCreate({
        where: {
          uuid: req.body.uuid
        },
        defaults: {
          uuid: req.body.uuid,
          kode_opd: req.body.kode_opd,
          nip_pegawai: req.body.nip_pegawai
        }
      })
        .then(_ => {
          Undangan.create({
            id: Math.floor(Math.random() * 10000),
            uuid: req.body.uuid,
            nomor_surat: req.body.nomor_surat,
            sifat: req.body.sifat,
            perihal: req.body.perihal,
            ditujukan: req.body.ditujukan,
            pendahuluan: req.body.pendahuluan,
            isi_undangan: req.body.isi_undangan,
            tanggal: req.body.tanggal,
            waktu: req.body.waktu,
            lokasi: req.body.lokasi,
            acara: req.body.acara,
            catatan: req.body.catatan,
            tanggal_surat: req.body.tanggal_surat,
            penutup: req.body.penutup,
            signature: req.body.signature,
            status: req.body.status,
            atasan: req.body.atasan,
            nip_atasan: req.body.nip_atasan,
            lampiran: req.body.lampiran
          })
            .then(response => {
              res.status(201).json({
                success: true,
                data: {
                  code: 201,
                  message: "Data undangan berhasil ditambahkan",
                  data: response,
                },
              });
            })
            .catch(err => {
              Uuid.destroy({
                where: {
                  uuid: req.body.uuid
                }
              })
                .then(_ => {
                  console.log('BERHASIL TERHAPUS');
                })
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
                    message: "Nama undangan sudah terdaftar",
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

  static editUndangan = async (req, res) => {
    try {
      const payload = {
        uuid: req.body.uuid,
        nomor_surat: req.body.nomor_surat,
        sifat: req.body.sifat,
        perihal: req.body.perihal,
        ditujukan: req.body.ditujukan,
        pendahuluan: req.body.pendahuluan,
        isi_undangan: req.body.isi_undangan,
        tanggal: req.body.tanggal,
        waktu: req.body.waktu,
        lokasi: req.body.lokasi,
        acara: req.body.acara,
        catatan: req.body.catatan,
        penutup: req.body.penutup,
        tanggal_surat: tanggal_surat,
        signature: req.body.signature,
        status: req.body.status,
        atasan: req.body.atasan,
        nip_atasan: req.body.nip_atasan,
        lampiran: req.body.lampiran
      }

      if (req.body.status !== "Disetujui") {
        const response = await Undangan.update(payload, {
          where: { id: +req.params.id }
        })

        if (response[0] == 0) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "ID undangan tidak ditemukan!",
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: "Berhasil update data undangan",
              data: response,
            },
          });
        }
      } else {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: "Tidak bisa mengedit undangan yang sudah disetujui!",
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

  static archieveUndangan = async (req, res) => {
    try {
      const payload = {
        status: 'archieve'
      }
      const response = await Undangan.update(payload, {
        where: { id: req.params.id }
      })

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID undangan tidak ditemukan!",
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Berhasil update data undangan",
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

  static getArchieveUndangan = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Undangan.findAll({
          where: { status: 'archieve' },
          order: [["updatedAt", "DESC"]],
          attributes: {
            attributes: {
              exclude: [['createdAt', 'updatedAt']]
            }
          },
          include: [
            {
              model: Uuid,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              },
              include: [
                {
                  model: Perangkat_Daerah,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt']]
                  }
                },
                {
                  model: Pegawai,
                  attributes: {
                    exclude: [['createdAt', 'updatedAt', 'password']]
                  }
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
              ]
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

  static deleteUndangan = async (req, res) => {
    try {
      const response = await Undangan.destroy({
        where: { id: +req.params.id },
        returning: true
      })

      if (response == 1) {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil hapus data undangan',
            data: response
          }
        })
      } else {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID undangan tidak ditemukan!'
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

module.exports = UndanganController;