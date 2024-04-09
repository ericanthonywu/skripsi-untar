const express = require('express');
const {loginController, migrateController, logoutController} = require("../../controller/admin/api/authController");
const {
    penelitianDatatableController,
    kategoriDatatableController, subkategoriDatatableController, mahasiswaDatatableController, dosenDatatableController,
    adminDatatableController
} = require("../../controller/admin/api/datatableController");
const {
    getSubKategoriByKategoriIdController,
    addPenelitianController,
    deletePenelitianController,
    addKategoriController,
    deleteKategoriController,
    addSubkategoriController,
    deleteSubkategoriController,
    ubahKategoriController,
    updateSubkategoriController,
    addDosen,
    updateDosen,
    deleteDosen,
    addMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    checkNisnDosenExists,
    checkNIMMahasiswaExists, ubahPenelitianController, addDosenByExcel, addMahasiswaByExcel, cancelPenelitianController,
    addAdmin, updateAdmin, deleteAdmin
} = require("../../controller/admin/api/ajaxApiController");
const {multerMultipleFieldHandler, multerSingleFieldFileHandler} = require("../../middleware/fileMiddleware");
const {authMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/auth/migrate", authMiddleware, migrateController)
router.post("/auth/login", authMiddleware, loginController)
router.get("/auth/logout", authMiddleware, logoutController)

router.get("/table/mahasiswa", authMiddleware, mahasiswaDatatableController)
router.get("/table/dosen", authMiddleware, dosenDatatableController)
router.get("/table/penelitian", authMiddleware, penelitianDatatableController)
router.get("/table/kategori", authMiddleware, kategoriDatatableController)
router.get("/table/subkategori/:id", authMiddleware, subkategoriDatatableController)
router.get("/table/admin", authMiddleware, adminDatatableController)

router.get('/subkategori/:kategoriId', authMiddleware, getSubKategoriByKategoriIdController)

router.post('/penelitian', authMiddleware, multerMultipleFieldHandler([
    {
        name: 'file_proposal',
        dest: 'file_proposal',
        maxCount: 1
    }, {
        name: 'surat_perjanjian_kerjasama',
        dest: 'surat_perjanjian_kerjasama',
        maxCount: 1
    }, {
        name: 'file_monef',
        dest: 'file_monef',
        maxCount: 1
    }, {
        name: 'file_laporan_akhir',
        dest: 'file_laporan_akhir',
        maxCount: 1
    }
]), addPenelitianController)

router.patch('/penelitian', authMiddleware, multerMultipleFieldHandler([
    {
        name: 'file_proposal',
        dest: 'file_proposal',
        maxCount: 1
    }, {
        name: 'surat_perjanjian_kerjasama',
        dest: 'surat_perjanjian_kerjasama',
        maxCount: 1
    }, {
        name: 'file_monef',
        dest: 'file_monef',
        maxCount: 1
    }, {
        name: 'file_laporan_akhir',
        dest: 'file_laporan_akhir',
        maxCount: 1
    }
]), ubahPenelitianController)

router.patch('/penelitian/cancel/:id', authMiddleware, cancelPenelitianController)

router.delete('/penelitian/:id', authMiddleware, deletePenelitianController)

router.post('/kategori', authMiddleware, addKategoriController)
router.patch('/kategori', authMiddleware, ubahKategoriController)
router.delete('/kategori/:id', authMiddleware, deleteKategoriController)

router.post('/subkategori', authMiddleware, addSubkategoriController)
router.patch('/subkategori', authMiddleware, updateSubkategoriController)
router.delete('/subkategori/:id', authMiddleware, deleteSubkategoriController)

router.post('/dosen', authMiddleware, addDosen)
router.post('/dosen/excel', authMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addDosenByExcel)
router.patch('/dosen', authMiddleware, updateDosen)
router.delete('/dosen/:id', authMiddleware, deleteDosen)
router.post('/dosen/check', authMiddleware, checkNisnDosenExists)

router.post('/mahasiswa', authMiddleware, addMahasiswa)
router.post('/mahasiswa/excel', authMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addMahasiswaByExcel)
router.patch('/mahasiswa', authMiddleware, updateMahasiswa)
router.delete('/mahasiswa/:id', authMiddleware, deleteMahasiswa)
router.post('/mahasiswa/check', authMiddleware, checkNIMMahasiswaExists)

router.post('/admin', authMiddleware, addAdmin)
router.patch('/admin', authMiddleware, updateAdmin)
router.delete('/admin/:id', authMiddleware, deleteAdmin)

module.exports = router;
