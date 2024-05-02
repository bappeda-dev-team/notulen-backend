const router = require('express').Router();
const PegawaiController = require('../controllers/pegawaiController');
const authenticate = require('../middlewares/authenticate');
const { authorizeAdminOrAdminOPD } = require('../middlewares/authorize');

router.post('/login', PegawaiController.login);
router.use(authenticate);
router.get('/syncDataPegawai/:kode_opd', PegawaiController.syncDataPegawai);
router.get('/getAllPegawai/:kode_opd', PegawaiController.getAllPegawai);
router.get('/getPelapor/:kode_opd/:tipe', PegawaiController.getAllPelapor);
router.get('/getPegawai/:nip', PegawaiController.getOnePegawai);
router.post('/addPegawai', PegawaiController.addPegawai);
router.put('/editPegawai/:nip', PegawaiController.updatePegawai);
router.get('/getProfile', PegawaiController.getProfile);

module.exports = router;
