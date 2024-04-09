const express = require('express');
const {indexPage, loginPage, penelitianPage, tambahPenelitianPage, kategoriPage, tambahKategoriPage, subkategoriPage,
    tambahSubkategoriPage, ubahKategoriPage, ubahSubkategoriPage, dosenPage, mahasiswaPage, tambahDosenPage,
    ubahDosenPage, tambahMahasiswaPage, ubahMahasiswaPage, ubahPenelitianPage, adminPage, tambahAdminPage, ubahAdminPage
} = require("../../controller/admin/pageController");
const {authMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/login', loginPage);

router.get('/', authMiddleware, indexPage);

router.get('/dosen', authMiddleware, dosenPage);
router.get('/dosen/tambah', authMiddleware, tambahDosenPage);
router.get('/dosen/ubah/:id', authMiddleware, ubahDosenPage);

router.get('/mahasiswa', authMiddleware, mahasiswaPage);
router.get('/mahasiswa/tambah', authMiddleware, tambahMahasiswaPage);
router.get('/mahasiswa/ubah/:id', authMiddleware, ubahMahasiswaPage);

router.get('/penelitian', authMiddleware, penelitianPage);
router.get('/penelitian/tambah', authMiddleware, tambahPenelitianPage);
router.get('/penelitian/ubah/:id', authMiddleware, ubahPenelitianPage);

router.get('/kategori', authMiddleware, kategoriPage);
router.get('/kategori/tambah', authMiddleware, tambahKategoriPage);
router.get('/kategori/ubah/:id', authMiddleware, ubahKategoriPage);

router.get('/kategori/detail/:kategoriId', authMiddleware, subkategoriPage);
router.get('/kategori/detail/:kategoriId/tambah', authMiddleware, tambahSubkategoriPage);
router.get('/kategori/detail/:kategoriId/ubah/:id', authMiddleware, ubahSubkategoriPage);

router.get('/admin', authMiddleware, adminPage)
router.get('/admin/tambah', authMiddleware, tambahAdminPage)
router.get('/admin/ubah/:id', authMiddleware, ubahAdminPage)
module.exports = router;
