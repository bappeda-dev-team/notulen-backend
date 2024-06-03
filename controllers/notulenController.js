const {
  Uuid,
  Notulen,
  Pegawai,
  Perangkat_Daerah,
  Sasaran,
  Sasaran_Uuid,
  Tagging,
  Tagging_Uuid,
  Notification
} = require("../models");
const { Op } = require("sequelize");
const axios = require('axios');
const fs = require('fs');
const { promisify, log } = require('util')

const unlinkAsync = promisify(fs.unlink)

class NotulenController {
  static getAllNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
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
                  attributes: ['nama_opd']
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
      } else if (req.decoded.role == 2) {
        const response = await Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [['createdAt', 'DESC']],
          attributes: {
            exclude: [['createdAt', 'updatedAt']]
          },
          include: [
            {
              model: Uuid,
              where: {
                kode_opd: req.params.kode_opd
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              },
              include: [
                {
                  model: Perangkat_Daerah,
                  attributes: ['nama_opd']
                },
                {
                  model: Pegawai,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                  }
                },
              ]
            }
          ],
          order: [["createdAt", "DESC"]],
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response,
          },
        });
      } else if (req.decoded.role == 3) {
        Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            nip_atasan: req.decoded.nip,
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: [['createdAt', 'updatedAt']]
          },
          include: [
            {
              model: Uuid,
              where: {
                kode_opd: req.params.kode_opd
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              },
              include: [
                {
                  model: Perangkat_Daerah,
                  attributes: ['nama_opd']
                },
                {
                  model: Pegawai,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                  }
                },
              ]
            }
          ]
        })
          .then(async (verif) => {
            const data = await Notulen.findAll({
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
                    nip_pegawai: req.decoded.nip
                  },
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  },
                  include: [
                    {
                      model: Perangkat_Daerah,
                      attributes: ['nama_opd']
                    },
                    {
                      model: Pegawai,
                      attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                      }
                    },
                  ]
                }
              ]
            })

            res.status(200).json({
              success: true,
              data: {
                code: 200,
                message: "Success",
                data: {
                  verif,
                  data
                },
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
      } else if (req.decoded.role == 4) {
        const response = await Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [
            {
              model: Uuid,
              where: {
                nip_pegawai: req.decoded.nip
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              },
              include: [
                {
                  model: Perangkat_Daerah,
                  attributes: ['nama_opd']
                },
                {
                  model: Pegawai,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                  }
                },
              ]
            }
          ]
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
  };

  static getAuthNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
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
                  model: Sasaran,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
                {
                  model: Tagging,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
              ]
            },
            {
              model: Notification,
              attributes: ['nip_penanggungjawab_notulen', 'status_notification_notulen']
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
        const response = await Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [
            {
              model: Uuid,
              where: {
                kode_opd: req.params.kode_opd,
              },
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
                  model: Sasaran,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
                {
                  model: Tagging,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
              ]
            },
            {
              model: Notification,
              attributes: ['nip_penanggungjawab_notulen', 'status_notification_notulen']
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
        const response = await Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            }
          },
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: [['createdAt', 'updatedAt']]
          },
          include: [
            {
              model: Uuid,
              where: {
                nip_pegawai: req.decoded.nip,
              },
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
                  model: Sasaran,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
                {
                  model: Tagging,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
              ]
            },
            {
              model: Notification,
              attributes: ['nip_penanggungjawab_notulen', 'status_notification_notulen']
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
  };

  static getOneNotulen = async (req, res) => {
    try {
      const response = await Notulen.findOne({
        where: { id: +req.params.id },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Uuid,
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
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
                model: Sasaran,
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              },
              {
                model: Tagging,
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              },
            ]
          },
          {
            model: Notification,
            attributes: ['nip_penanggungjawab_notulen', 'status_notification_notulen']
          },
        ],
      });

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Laporan tidak ditemukan!",
            data: response,
          },
        });
      } else {
        if (response.dataValues.Notification !== null) {
          Pegawai.findOne({
            where: { nip: response.Notification.nip_penanggungjawab_notulen }
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
  };

  static downloadFile = async (req, res) => {
    res.download(req.query.pathname)
  };

  static deleteFile = async (req, res) => {
    await unlinkAsync(req.query.pathname);
  };

  static addNotulen = async (req, res) => {
    if (req.decoded.role == 4) {
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
          const payload = {
            id: Math.floor(Math.random() * 10000),
            uuid: req.body.uuid,
            tagging: req.body.tagging,
            tanggal: req.body.tanggal,
            waktu: req.body.waktu,
            pendahuluan: req.body.pendahuluan,
            pimpinan_rapat: req.body.pimpinan_rapat,
            peserta_rapat: req.body.peserta_rapat,
            isi_rapat: req.body.isi_rapat,
            tindak_lanjut: req.body.tindak_lanjut,
            lokasi: req.body.lokasi,
            acara: req.body.acara,
            atasan: req.body.atasan,
            status: req.body.status,
            tanggal_surat: req.body.tanggal_surat,
            id_sasaran: req.body.id_sasaran,
            link_img_surat_undangan: req.body.link_img_surat_undangan,
            link_img_daftar_hadir: req.body.link_img_daftar_hadir,
            link_img_spj: req.body.link_img_spj,
            link_img_foto: req.body.link_img_foto,
            link_img_pendukung: req.body.link_img_pendukung,
            signature: req.body.signature,
            nip_atasan: req.body.nip_atasan,
            nip_penanggungjawab: req.body.nip_penanggungjawab
          }

          Notulen.create(payload)
            .then(response => {
              if (req.body.nip_penanggungjawab_notulen !== null) {
                const payload2 = {
                  uuid: req.body.uuid,
                  id_notulen: response.id,
                  status_notification_notulen: 'unread',
                  nip_penanggungjawab_notulen: req.body.nip_penanggungjawab_notulen
                }
                Notification.create(payload2);
              }
              res.status(201).json({
                success: true,
                data: {
                  code: 201,
                  message: "Data notulen berhasil ditambahkan",
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
                    message: "Nama notulen sudah terdaftar",
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
          message: 'Unauthorize as a User',
          data: null
        }
      })
    }
  };

  static editNotulen = async (req, res) => {
    try {
      const payload = {
        tagging: req.body.tagging,
        tanggal: req.body.tanggal,
        waktu: req.body.waktu,
        pendahuluan: req.body.pendahuluan,
        pimpinan_rapat: req.body.pimpinan_rapat,
        peserta_rapat: req.body.peserta_rapat,
        isi_rapat: req.body.isi_rapat,
        tindak_lanjut: req.body.tindak_lanjut,
        lokasi: req.body.lokasi,
        acara: req.body.acara,
        atasan: req.body.atasan,
        status: req.body.status,
        tanggal_surat: req.body.tanggal_surat,
        id_sasaran: req.body.id_sasaran,
        link_img_surat_undangan: req.body.link_img_surat_undangan,
        link_img_daftar_hadir: req.body.link_img_daftar_hadir,
        link_img_spj: req.body.link_img_spj,
        link_img_foto: req.body.link_img_foto,
        link_img_pendukung: req.body.link_img_pendukung,
        signature: req.body.signature,
        nip_atasan: req.body.nip_atasan,
      };

      if (req.body.status !== "Disetujui") {
        const response = await Notulen.update(payload, {
          where: { id: +req.params.id },
        })

        if (response[0] == 0) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "ID notulen tidak ditemukan!",
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: "Berhasil update data notulen",
              data: response,
            },
          });
        }
      } else {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: "Tidak bisa mengedit notulen yang sudah disetujui!",
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err,
        },
      });
    }
  };

  static updateStatus = async (req, res) => {
    try {
      if (req.decoded.role == 3) {
        const payload = {
          status: req.body.status,
          keterangan: req.body.keterangan,
          signature_atasan: req.body.signature_atasan
        };

        const response = await Notulen.update(payload, {
          where: { id: +req.params.id },
          returning: true
        });

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
              message: "Berhasil update data notulen",
              data: response,
            },
          });
        }
      } else {
        res.status(401).json({
          success: false,
          data: {
            code: 401,
            message: "Unauthorized as verificator",
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
  };

  static updateStatusNotification = async (req, res) => {
    try {
      const payload = {
        status_notification_notulen: req.body.status
      }

      const response = await Notification.update(payload, {
        where: { id_notulen: +req.params.id_notulen },
        returning: true
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
            message: "Berhasil update data notulen",
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

  static syncSasaran = async (req, res) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://kak.madiunkota.go.id/api/skp/sasaran_pohon_kinerja_pegawai.json',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": 'application/x-www-form-urlencoded'
        },
        data: {
          nip: req.body.nip,
          tahun: req.body.tahun
        }
      })

      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: 'Success',
          data: response.data
        }
      })
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

  static addSasaran = (req, res) => {
    if (req.decoded.role == 3 || req.decoded.role == 4) {
      if (!req.body) {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'req body cannot be empty',
            data: null
          }
        })
      }

      Sasaran.findOrCreate({
        where: {
          id_sasaran: req.body.id_sasaran
        },
        defaults: {
          id_sasaran: req.body.id_sasaran,
          sasaran: req.body.sasaran,
          nama_pembuat: req.body.nama_pembuat
        }
      })
        .then(async () => {
          try {
            const payload = [];
            payload.push({
              id_sasaran: req.body.id_sasaran,
              id_uuid: req.body.id_uuid
            })
            const response = await Sasaran_Uuid.bulkCreate(payload);

            if (response.length != 0) {
              res.status(200).json({
                success: true,
                data: {
                  code: 200,
                  message: 'Success',
                  data: 'Success'
                }
              })
            }
          } catch (err) {
            console.log(err.message, "ERROR");
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
        .catch(err => {
          res.status(500).json({
            success: false,
            data: {
              code: 500,
              message: 'Internal server error',
              data: err
            }
          })
        })
    } else {
      res.status(401).json({
        success: false,
        data: {
          code: 401,
          message: "Unauthorize",
          data: null
        }
      })
    }
  }

  static deleteSasaran = (req, res) => {
    if (req.decoded.role == 3 || req.decoded.role == 4) {
      Sasaran_Uuid.destroy({
        where: { id_sasaran: req.body.id_sasaran }
      })
        .then(async () => {
          try {
            const response = Sasaran.destroy({
              where: { id_sasaran: req.body.id_sasaran }
            })

            res.status(200).json({
              success: true,
              data: {
                code: 200,
                message: 'Success',
                data: response.data
              }
            })
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
        .catch(err => {
          res.status(500).json({
            success: false,
            data: {
              code: 500,
              message: 'Internal server error',
              data: err
            }
          })
        })
    }
  }

  static addTagging = async (req, res) => {
    if (req.decoded.role == 1 || req.decoded.role == 2) {
      try {
        const payload = {
          id_uuid: req.body.id_uuid,
          id_tagging: req.body.id_tagging
        }
        const response = await Tagging_Uuid.create(payload)

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response.data
          }
        })
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          data: {
            code: 500,
            message: 'Internal server error',
            data: err
          }
        })
      }
    } else {
      res.status(401).json({
        success: false,
        data: {
          code: 401,
          message: "Unauthorize",
          data: null
        }
      })
    }
  };

  static getNeedAgreement = async (req, res) => {
    try {
      if (req.decoded.role == 3) {
        const response = await Notulen.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            tanggal_surat: {
              [Op.like]: `%${decodeURIComponent(req.params.tanggal_surat)}%`
            },
            nip_atasan: {
              [Op.eq]: req.decoded.nip
            },
          },
          attributes: {
            exclude: [['createdAt', 'updatedAt']]
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

  static deleteTagging = (req, res) => {
    if (req.decoded.role == 1 || req.decoded.role == 2) {
      try {
        const response = Tagging_Uuid.destroy({
          where: {
            id_tagging: req.body.id_tagging,
            id_uuid: req.body.id_uuid
          }
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil hapus tagging',
            data: response
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

  static archievedNotulen = async (req, res) => {
    try {
      const payload = {
        status: 'archieve'
      }
      const response = await Notulen.update(payload, {
        where: { id: req.params.id }
      })

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID notulen tidak ditemukan!",
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Berhasil update data notulen",
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

  static getArchieveNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Notulen.findAll({
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

  static showResponsibleNotulen = async (req, res) => {
    try {
      const response = await Notification.findAll({
        where: {
          nip_penanggungjawab_notulen: {
            [Op.eq]: req.decoded.nip
          },
        },
        order: [["createdAt", "DESC"]],
        attributes: ['nip_penanggungjawab_notulen', 'status_notification_notulen'],
        include: [
          {
            model: Notulen,
            where: {
              status: {
                [Op.not]: 'archieve',
              },
              tanggal_surat: {
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
              exclude: ['createdAt', 'updatedAt']
            },
            include: [
              {
                model: Pegawai,
                attributes: {
                  exclude: ['password', 'createdAt', 'updatedAt']
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
            message: "Notifikasi notulen tidak ditemukan!",
            data: response,
          },
        });
      } else {
        let output = [];
        response.forEach(el => {
          output.push({
            status: el.dataValues.status_notification_notulen,
            Notulen: el.dataValues.Notulen,
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
          data: err.message,
        },
      });
    }
  }

  static deleteNotulen = async (req, res) => {
    try {
      const response = await Notulen.destroy({
        where: { id: +req.params.id },
        returning: true
      })

      if (response == 1) {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil hapus data Notulen',
            data: response
          }
        })
      } else {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID Notulen tidak ditemukan!'
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

module.exports = NotulenController;
