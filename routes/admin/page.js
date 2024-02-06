const express = require('express');
const {indexPage, loginPage, dosenPage, mahasiswaPage} = require("../../controller/admin/pageController");
const {authMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/login', loginPage);

router.get('/', authMiddleware, indexPage);
router.get('/mahasiswa', authMiddleware, mahasiswaPage);
router.get('/dosen', authMiddleware, dosenPage);

module.exports = router;
