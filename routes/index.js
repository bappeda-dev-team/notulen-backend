const router = require('express').Router();
const OPDRouter = require('./opdController');
const PegawaiRouter = require('./pegawaiRoutes');
const UndanganRouter = require('./undanganRoutes');
const PesertaRouter = require('./pesertaRoutes');
const NotulenRouter = require('./notulenRoutes');
const TaggingRouter = require('./taggingRoutes');
const LaporanRouter = require('./laporanRoutes');
const UploadRouter = require('./uploadRoutes');

router.use('/opd', OPDRouter);
router.use('/pegawai', PegawaiRouter);
router.use('/undangan', UndanganRouter);
router.use('/peserta', PesertaRouter);
router.use('/notulen', NotulenRouter);
router.use('/laporan', LaporanRouter);
router.use('/tagging', TaggingRouter);
router.use('/upload', UploadRouter);
router.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }

  res.status(200).send(data);
})

module.exports = router;
