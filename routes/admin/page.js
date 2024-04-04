const express = require('express');
const {indexPage, loginPage, penelitianPage, tambahPenelitianPage, kategoriPage, tambahKategoriPage, subkategoriPage,
    tambahSubkategoriPage
} = require("../../controller/admin/pageController");
const {authMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/login', loginPage);

router.get('/', authMiddleware, indexPage);
router.get('/penelitian', authMiddleware, penelitianPage);
router.get('/penelitian/tambah', authMiddleware, tambahPenelitianPage);

router.get('/kategori', authMiddleware, kategoriPage);
router.get('/kategori/tambah', authMiddleware, tambahKategoriPage);

router.get('/kategori/detail/:id', authMiddleware, subkategoriPage);
router.get('/kategori/detail/:id/tambah', authMiddleware, tambahSubkategoriPage);

module.exports = router;
