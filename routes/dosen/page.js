const express = require('express');
const {
    indexPage, loginPage, penelitianPage, tambahPenelitianPage, kategoriPage, tambahKategoriPage, subkategoriPage,
    tambahSubkategoriPage, ubahKategoriPage, ubahSubkategoriPage,
    ubahPenelitianPage,
} = require("../../controller/dosen/pageController");
const {authMiddleware, dosenRoleMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/login', loginPage);

router.get('/', authMiddleware, indexPage);

router.get('/penelitian', authMiddleware, dosenRoleMiddleware, penelitianPage);
router.get('/penelitian/tambah', authMiddleware, dosenRoleMiddleware, tambahPenelitianPage);
router.get('/penelitian/ubah/:id', authMiddleware, dosenRoleMiddleware, ubahPenelitianPage);

router.get('/kategori', authMiddleware, dosenRoleMiddleware, kategoriPage);
router.get('/kategori/tambah', authMiddleware, dosenRoleMiddleware, tambahKategoriPage);
router.get('/kategori/ubah/:id', authMiddleware, dosenRoleMiddleware, ubahKategoriPage);

router.get('/kategori/detail/:kategoriId', authMiddleware, dosenRoleMiddleware, subkategoriPage);
router.get('/kategori/detail/:kategoriId/tambah', authMiddleware, dosenRoleMiddleware, tambahSubkategoriPage);
router.get('/kategori/detail/:kategoriId/ubah/:id', authMiddleware, dosenRoleMiddleware, ubahSubkategoriPage);

module.exports = router;
