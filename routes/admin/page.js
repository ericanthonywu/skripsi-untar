const express = require('express');
const {indexPage, loginPage, dosenPage, mahasiswaPage, tambahDosenPage} = require("../../controller/admin/pageController");
const {authMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/login', loginPage);

router.get('/', authMiddleware, indexPage);
router.get('/mahasiswa', authMiddleware, mahasiswaPage);
router.get('/dosen', authMiddleware, dosenPage);
router.get('/dosen/tambah', authMiddleware, tambahDosenPage);

module.exports = router;
