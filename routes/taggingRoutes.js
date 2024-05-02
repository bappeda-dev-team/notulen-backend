const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const TaggingController = require('../controllers/taggingController');
const { authorizeAdminOrAdminOPD } = require('../middlewares/authorize');

router.use(authenticate);
router.get('/getAllTagging/:kode_opd', TaggingController.getAllTagging);
router.get('/getOneTagging/:id', TaggingController.getOneTagging);
router.put('/editTagging/:id', TaggingController.editTagging);
router.delete('/deleteTagging/:id', TaggingController.deleteTagging);
router.post('/addTagging', TaggingController.addTagging);

module.exports = router;