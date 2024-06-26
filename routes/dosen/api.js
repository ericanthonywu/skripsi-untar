const express = require('express');
const {
    migrateController, logoutController, loginDosenController, changeDosenPassword
} = require("../../controller/api/authController");
const {
    penelitianDatatableController,
    kategoriDatatableController,
    subkategoriDatatableController,
    mahasiswaDatatableController,
} = require("../../controller/api/datatableController");
const {
    getSubKategoriByKategoriIdController,
    addPenelitianController,
    addKategoriController,
    addSubkategoriController,
    ubahKategoriController,
    updateSubkategoriController,
    ubahPenelitianController,
    cancelPenelitianController,
    addMahasiswa,
    addMahasiswaByExcel,
    updateMahasiswa,
    deleteMahasiswa,
    checkNIMMahasiswaExists,
    checkNisnDosenExists,
    addPenelitianExcelController,
    findDosenByNameAndNIDN,
    findMahasiswaByNameAndNIDN,
    readNotif,
} = require("../../controller/api/ajaxApiController");
const {multerMultipleFieldHandler, multerSingleFieldFileHandler} = require("../../middleware/fileMiddleware");
const {authMiddleware, dosenRoleMiddleware, adminRoleMiddleware} = require("../../middleware/authMiddleware");
const {getPenelitian, getBiayaPenelitian} = require("../../controller/api/chartController");
const router = express.Router();

router.get("/auth/migrate", migrateController)
router.post("/auth/login", loginDosenController)
router.get("/auth/logout", logoutController)
router.post("/auth/change-password", authMiddleware, dosenRoleMiddleware, changeDosenPassword)

router.get("/table/penelitian", authMiddleware, dosenRoleMiddleware, penelitianDatatableController)
router.get("/table/mahasiswa", authMiddleware, dosenRoleMiddleware, mahasiswaDatatableController)
router.get("/table/kategori", authMiddleware, dosenRoleMiddleware, kategoriDatatableController)
router.get("/table/subkategori/:id", authMiddleware, dosenRoleMiddleware, subkategoriDatatableController)

router.get('/chart/penelitian/all/:year', authMiddleware, dosenRoleMiddleware, getPenelitian)
router.get('/chart/penelitian/biaya/:year', authMiddleware, dosenRoleMiddleware, getBiayaPenelitian)

router.get('/subkategori/:kategoriId', authMiddleware, dosenRoleMiddleware, getSubKategoriByKategoriIdController)

router.post('/penelitian/excel', authMiddleware, dosenRoleMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addPenelitianExcelController);
router.post('/penelitian', authMiddleware, dosenRoleMiddleware, multerMultipleFieldHandler([{
    name: 'file_proposal', dest: 'file_proposal', maxCount: 1
}, {
    name: 'surat_perjanjian_kerjasama', dest: 'surat_perjanjian_kerjasama', maxCount: 1
}, {
    name: 'file_monev', dest: 'file_monev', maxCount: 1
}, {
    name: 'file_laporan_kemajuan', dest: 'file_laporan_kemajuan', maxCount: 1
}, {
    name: 'file_laporan_akhir', dest: 'file_laporan_akhir', maxCount: 1
}]), addPenelitianController)

router.patch('/penelitian', authMiddleware, multerMultipleFieldHandler([{
    name: 'file_proposal', dest: 'file_proposal', maxCount: 1
}, {
    name: 'surat_perjanjian_kerjasama', dest: 'surat_perjanjian_kerjasama', maxCount: 1
}, {
    name: 'file_monev', dest: 'file_monev', maxCount: 1
}, {
    name: 'file_laporan_kemajuan', dest: 'file_laporan_kemajuan', maxCount: 1
}, {
    name: 'file_laporan_akhir', dest: 'file_laporan_akhir', maxCount: 1
}]), ubahPenelitianController)

router.patch('/penelitian/cancel/:id', authMiddleware, dosenRoleMiddleware, cancelPenelitianController)

router.post('/kategori', authMiddleware, dosenRoleMiddleware, addKategoriController)
router.patch('/kategori', authMiddleware, dosenRoleMiddleware, ubahKategoriController)

router.post('/subkategori', authMiddleware, dosenRoleMiddleware, addSubkategoriController)
router.patch('/subkategori', authMiddleware, dosenRoleMiddleware, updateSubkategoriController)

router.post('/mahasiswa', authMiddleware, dosenRoleMiddleware, addMahasiswa)
router.post('/mahasiswa/excel', authMiddleware, dosenRoleMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addMahasiswaByExcel)
router.patch('/mahasiswa', authMiddleware, dosenRoleMiddleware, updateMahasiswa)
router.delete('/mahasiswa/:id', authMiddleware, dosenRoleMiddleware, deleteMahasiswa)
router.post('/mahasiswa/check', authMiddleware, dosenRoleMiddleware, checkNIMMahasiswaExists)
router.get('/mahasiswa/search', authMiddleware, dosenRoleMiddleware, findMahasiswaByNameAndNIDN)

router.post('/dosen/check', authMiddleware, dosenRoleMiddleware, checkNisnDosenExists)
router.get('/dosen/search', authMiddleware, dosenRoleMiddleware, findDosenByNameAndNIDN)

router.post('/notif/read', authMiddleware, dosenRoleMiddleware, readNotif)

module.exports = router;
