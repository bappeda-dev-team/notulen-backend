const { Pegawai, Perangkat_Daerah } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const axios = require("axios");

class PegawaiController {
  static getAllPegawai = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Pegawai.findAll({
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ["nama_opd"],
            },
          ],
          attributes: {
            exclude: ["password"],
          },
        });

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response,
          },
        });
      } else if (
        req.decoded.role == 2 ||
        req.decoded.role == 3 ||
        req.decoded.role == 4
      ) {
        const response = await Pegawai.findAll({
          where: {
            kode_opd: req.params.kode_opd,
          },
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ["nama_opd"],
            },
          ],
          attributes: {
            exclude: ["password"],
          },
        });

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
          success: true,
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

  static getAllPelapor = async (req, res) => {
    try {
      const type = req.params.tipe;
      let response;
      if (type === "atasan") {
        response = await Pegawai.findAll({
          where: {
            kode_opd: req.params.kode_opd,
            role: 3,
          },
        });
      } else if (type === "all") {
        response = await Pegawai.findAll({
          where: {
            kode_opd: req.params.kode_opd,
          },
        });
      }

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
  };

  static getProfile = async (req, res) => {
    console.log(req, "/.,/.,");
    try {
      const data = req.decoded;

      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: "Success",
          data: data,
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
  };

  static getOnePegawai = async (req, res) => {
    try {
      const response = await Pegawai.findOne({
        where: { nip: req.params.nip },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Perangkat_Daerah,
          },
        ],
      });

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID pegawai tidak ditemukan!",
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
  };

  static syncDataPegawai = async (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    try {
      const fetchPegawai = await axios({
        method: "post",
        url: `https://kak.madiunkota.go.id/api/opd/daftar_pegawai.json`,
        data: {
          kode_opd: req.params.kode_opd,
        },
      });

      if (fetchPegawai.data.status) {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: fetchPegawai.data.data,
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

  static addPegawai = async (req, res) => {
    try {
      const payload = {
        nama: req.body.nama,
        nip: req.body.nip,
        password: req.body.password,
        pangkat: req.body.pangkat,
        nama_pangkat: req.body.nama_pangkat,
        jabatan: req.body.jabatan,
        role: req.body.role,
        kode_opd: req.body.kode_opd,
      };

      const response = await Pegawai.create(payload);

      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: "Data tagging berhasil ditambahkan",
          data: response,
        },
      });
    } catch (err) {
      if (err.name === "SequelizeDatabaseError") {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: "Periksa kembali data Anda!",
            data: err.message,
          },
        });
      } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: "NIK sudah terdaftar",
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
    }
  };

  static updatePegawai = async (req, res) => {
    try {
      const payload = {
        nama: req.body.nama,
        nip: req.body.nip,
        password: hashPassword(req.body.password),
        pangkat: req.body.pangkat,
        nama_pangkat: req.body.nama_pangkat,
        jabatan: req.body.jabatan,
        role: req.body.role,
        status: req.body.status,
        kode_opd: req.body.kode_opd,
      };

      const response = await Pegawai.update(payload, {
        where: { nip: req.params.nip },
      });

      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: "Data tagging berhasil ditambahkan",
          data: response,
        },
      });
    } catch (err) {
      console.log(err, ">>>");
      if (err.name === "SequelizeDatabaseError") {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: "Periksa kembali data Anda!",
            data: err.message,
          },
        });
      } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: "NIK sudah terdaftar",
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
    }
  };

  static login = async (req, res) => {
    try {
      const user = await Pegawai.findOne({
        where: { nip: req.body.nip },
      });
      console.log(req.body);

      if (!user) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "NIP tidak ditemukan",
          },
        });
      } else {
        const comparedPassword = comparePassword(
          req.body.password,
          user.dataValues.password,
        );

        if (!comparedPassword) {
          res.status(400).json({
            success: false,
            data: {
              code: 400,
              message: "Password yang Anda masukkan salah",
            },
          });
        } else {
          const access_token = generateToken({
            id: user.id,
            nama: user.nama,
            nip: user.nip,
            pangkat: user.pangkat,
            namaPangkat: user.nama_pangkat,
            posisi: user.jabatan,
            role: user.role,
          });

          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: "Success",
              data: {
                accessToken: access_token,
                user: {
                  nama: user.nama,
                  nip: user.nip,
                  pangkat: user.pangkat,
                  namaPangkat: user.nama_pangkat,
                  posisi: user.jabatan,
                  role: user.role,
                },
              },
            },
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internet server error",
          data: err.message,
        },
      });
    }
  };
}

module.exports = PegawaiController;
