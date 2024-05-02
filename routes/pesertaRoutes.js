const router = require('express').Router();
const PesertaController = require('../controllers/pesertaController');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
router.get('/showResponsible/:nip', PesertaController.showResponsiblePeserta);
router.get('/getPesertaDetail/:id', PesertaController.getOnePeserta);
router.put('/editPeserta/:id', PesertaController.editPeserta);
router.delete('/deletePeserta/:id', PesertaController.deletePeserta);
router.post('/addPeserta', PesertaController.addPeserta);

module.exports = router;