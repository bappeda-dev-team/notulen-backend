class UploadFileController {
  static uploadSuratUndangan = async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: "Sukses upload surat undangan",
          data: req.file.path
        },
      });
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

  static uploadDaftarHadir = async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: "Sukses upload daftar hadir",
          data: req.file.path
        },
      });
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

  static uploadSPJ = async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: "Sukses upload SPJ",
          data: req.file.path
        },
      });
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

  static uploadFoto = async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: "Sukses upload foto",
          data: req.file.path
        },
      });
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

  static uploadPendukung = async (req, res) => {
    try {
      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: "Sukses upload file pendukung",
          data: req.file.path
        },
      });
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
}

module.exports = UploadFileController;