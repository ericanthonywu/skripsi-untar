const express = require('express');
const {indexPage, loginPage, penelitianPage, tambahPenelitianPage} = require("../../controller/admin/pageController");
const {authMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/login', loginPage);

router.get('/', authMiddleware, indexPage);
router.get('/penelitian', authMiddleware, penelitianPage);
router.get('/penelitian/tambah', authMiddleware, tambahPenelitianPage);

module.exports = router;
