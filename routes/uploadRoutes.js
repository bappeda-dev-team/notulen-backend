const router = require('express').Router();
const UploadFileController = require('../controllers/uploadFileController');
const upload = require('../helpers/upload');

router.post('/undangan', upload.single("undangan"), UploadFileController.uploadSuratUndangan);
router.post('/daftarhadir', upload.single("daftarhadir"), UploadFileController.uploadDaftarHadir);
router.post('/spj', upload.single("spj"), UploadFileController.uploadSPJ);
router.post('/foto', upload.single("foto"), UploadFileController.uploadFoto);
router.post('/pendukung', upload.single("pendukung"), UploadFileController.uploadPendukung);

module.exports = router;