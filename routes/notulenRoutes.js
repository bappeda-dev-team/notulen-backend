const router = require("express").Router();
const NotulenController = require("../controllers/notulenController");
const authenticate = require("../middlewares/authenticate");
const {
  authorizeVerifikator,
} = require("../middlewares/authorize");

router.get("/getFile", NotulenController.downloadFile);
router.delete("/deleteFile", NotulenController.deleteFile);
router.use(authenticate);
router.get("/getNotulenDetail/:id", NotulenController.getOneNotulen);
router.get("/getAuthNotulen/:kode_opd/:tanggal_surat", NotulenController.getAuthNotulen);
router.get('/getAgreement/:kode_opd/:tanggal_surat', NotulenController.getNeedAgreement)
router.get("/getAllNotulens/:kode_opd/:tanggal_surat", NotulenController.getAllNotulen);
router.get('/showResponsible/:tanggal_surat', NotulenController.showResponsibleNotulen);
router.put('/updateNotification/:id_notulen', NotulenController.updateStatusNotification)
router.post("/addNotulen", NotulenController.addNotulen);
router.put("/editNotulen/:id", NotulenController.editNotulen);
router.put("/updateStatus/:id", NotulenController.updateStatus);
router.post('/syncSasaran', NotulenController.syncSasaran);
router.post("/addTagging", NotulenController.addTagging);
router.delete("/deleteTagging", NotulenController.deleteTagging);
router.post('/addSasaran', NotulenController.addSasaran);
router.delete('/deleteSasaran', NotulenController.deleteSasaran);
router.put('/archieve/:id', NotulenController.archievedNotulen);
router.get('/getArchieve', NotulenController.getArchieveNotulen);
router.delete('/deleteNotulen/:id', NotulenController.deleteNotulen)

module.exports = router;
