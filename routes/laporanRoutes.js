const router = require("express").Router();
const LaporanController = require("../controllers/laporanController");
const authenticate = require("../middlewares/authenticate");

router.use(authenticate);
router.get("/getAuthLaporan/:kode_opd", LaporanController.getAllLaporan);
router.get('/getLaporanDetail/:uuid', LaporanController.getLaporanDetail);

module.exports = router;