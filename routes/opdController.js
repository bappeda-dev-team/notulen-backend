const router = require('express').Router();
const OPDController = require('../controllers/opdController');
const authenticate = require('../middlewares/authenticate');
const { authorizeAdmin } = require('../middlewares/authorize');

// router.use(authenticate);
router.get('/getAllOPD', OPDController.getAllOPD);
router.get('/getOneOPDWithPegawai/:kode_opd', OPDController.getOneOPDWithPegawai);
router.post('/addOPD/:kode_opd', OPDController.addDataOPD);
router.post('/syncOPD', OPDController.syncOPD);
router.post('/getUrusan', OPDController.getMasterUrusan);

module.exports = router;