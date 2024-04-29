const express = require('express');
const {
    loginController,
    migrateController,
    logoutController,
    loginDosenController
} = require("../../controller/api/authController");
const {
    penelitianDatatableController,
    kategoriDatatableController,
    subkategoriDatatableController, mahasiswaDatatableController,
} = require("../../controller/api/datatableController");
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
    ubahPenelitianController,
    cancelPenelitianController,
    addMahasiswa,
    addMahasiswaByExcel,
    updateMahasiswa,
    deleteMahasiswa,
    checkNIMMahasiswaExists, checkNisnDosenExists,
} = require("../../controller/api/ajaxApiController");
const {multerMultipleFieldHandler, multerSingleFieldFileHandler} = require("../../middleware/fileMiddleware");
const {authMiddleware, dosenRoleMiddleware, adminRoleMiddleware} = require("../../middleware/authMiddleware");
const {getPenelitian, getBiayaPenelitian} = require("../../controller/api/chartController");
const router = express.Router();

router.get("/auth/migrate", migrateController)
router.post("/auth/login", loginDosenController)
router.get("/auth/logout", logoutController)

router.get("/table/penelitian", authMiddleware, penelitianDatatableController)
router.get("/table/mahasiswa", authMiddleware, mahasiswaDatatableController)
router.get("/table/kategori", authMiddleware, kategoriDatatableController)
router.get("/table/subkategori/:id", authMiddleware, subkategoriDatatableController)

router.get('/chart/penelitian/all/:year', authMiddleware, getPenelitian)
router.get('/chart/penelitian/biaya/:year', authMiddleware, getBiayaPenelitian)

router.get('/subkategori/:kategoriId', authMiddleware, getSubKategoriByKategoriIdController)

router.post('/penelitian', authMiddleware, multerMultipleFieldHandler([{
    name: 'file_proposal', dest: 'file_proposal', maxCount: 1
}, {
    name: 'surat_perjanjian_kerjasama', dest: 'surat_perjanjian_kerjasama', maxCount: 1
}, {
    name: 'file_monef', dest: 'file_monef', maxCount: 1
}, {
    name: 'file_laporan_akhir', dest: 'file_laporan_akhir', maxCount: 1
}]), addPenelitianController)

router.patch('/penelitian', authMiddleware, multerMultipleFieldHandler([{
    name: 'file_proposal', dest: 'file_proposal', maxCount: 1
}, {
    name: 'surat_perjanjian_kerjasama', dest: 'surat_perjanjian_kerjasama', maxCount: 1
}, {
    name: 'file_monef', dest: 'file_monef', maxCount: 1
}, {
    name: 'file_laporan_akhir', dest: 'file_laporan_akhir', maxCount: 1
}]), ubahPenelitianController)

router.patch('/penelitian/cancel/:id', authMiddleware, cancelPenelitianController)

router.delete('/penelitian/:id', authMiddleware, deletePenelitianController)

router.post('/kategori', authMiddleware, addKategoriController)
router.patch('/kategori', authMiddleware, ubahKategoriController)
router.delete('/kategori/:id', authMiddleware, deleteKategoriController)

router.post('/subkategori', authMiddleware, addSubkategoriController)
router.patch('/subkategori', authMiddleware, updateSubkategoriController)
router.delete('/subkategori/:id', authMiddleware, deleteSubkategoriController)

router.post('/mahasiswa', authMiddleware, dosenRoleMiddleware, addMahasiswa)
router.post('/mahasiswa/excel', authMiddleware, dosenRoleMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addMahasiswaByExcel)
router.patch('/mahasiswa', authMiddleware, dosenRoleMiddleware, updateMahasiswa)
router.delete('/mahasiswa/:id', authMiddleware, dosenRoleMiddleware, deleteMahasiswa)
router.post('/mahasiswa/check', authMiddleware, dosenRoleMiddleware, checkNIMMahasiswaExists)
router.post('/dosen/check', authMiddleware, dosenRoleMiddleware, checkNisnDosenExists)

module.exports = router;
