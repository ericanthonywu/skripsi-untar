const express = require('express');
const {
    indexPage, loginAdminPage, penelitianPage, tambahPenelitianPage, kategoriPage, tambahKategoriPage, subkategoriPage,
    tambahSubkategoriPage, ubahKategoriPage, ubahSubkategoriPage, dosenPage, mahasiswaPage, tambahDosenPage,
    ubahDosenPage, tambahMahasiswaPage, ubahMahasiswaPage, ubahPenelitianPage, adminPage, tambahAdminPage, ubahAdminPage
} = require("../../controller/pageController");
const {authMiddleware, adminRoleMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/login', loginAdminPage);

router.get('/', authMiddleware, indexPage);

router.get('/dosen', authMiddleware, adminRoleMiddleware, dosenPage);
router.get('/dosen/tambah', authMiddleware, adminRoleMiddleware, tambahDosenPage);
router.get('/dosen/ubah/:id', authMiddleware, adminRoleMiddleware, ubahDosenPage);

router.get('/mahasiswa', authMiddleware, adminRoleMiddleware, mahasiswaPage);
router.get('/mahasiswa/tambah', authMiddleware, adminRoleMiddleware, tambahMahasiswaPage);
router.get('/mahasiswa/ubah/:id', authMiddleware, adminRoleMiddleware, ubahMahasiswaPage);

router.get('/penelitian', authMiddleware, adminRoleMiddleware, penelitianPage);
router.get('/penelitian/tambah', authMiddleware, adminRoleMiddleware, tambahPenelitianPage);
router.get('/penelitian/ubah/:id', authMiddleware, adminRoleMiddleware, ubahPenelitianPage);

router.get('/kategori', authMiddleware, adminRoleMiddleware, kategoriPage);
router.get('/kategori/tambah', authMiddleware, adminRoleMiddleware, tambahKategoriPage);
router.get('/kategori/ubah/:id', authMiddleware, adminRoleMiddleware, ubahKategoriPage);

router.get('/kategori/detail/:kategoriId', authMiddleware, adminRoleMiddleware, subkategoriPage);
router.get('/kategori/detail/:kategoriId/tambah', authMiddleware, adminRoleMiddleware, tambahSubkategoriPage);
router.get('/kategori/detail/:kategoriId/ubah/:id', authMiddleware, adminRoleMiddleware, ubahSubkategoriPage);

router.get('/admin', authMiddleware, adminRoleMiddleware, adminPage)
router.get('/admin/tambah', authMiddleware, adminRoleMiddleware, tambahAdminPage)
router.get('/admin/ubah/:id', authMiddleware, adminRoleMiddleware, ubahAdminPage)
module.exports = router;
