const express = require('express');
const {loginController, migrateController, logoutController, changeAdminPassword} = require("../../controller/api/authController");
const {
    penelitianDatatableController,
    kategoriDatatableController, subkategoriDatatableController, mahasiswaDatatableController, dosenDatatableController,
    adminDatatableController
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
    addDosen,
    updateDosen,
    deleteDosen,
    addMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    checkNisnDosenExists,
    checkNIMMahasiswaExists, ubahPenelitianController, addDosenByExcel, addMahasiswaByExcel, cancelPenelitianController,
    addAdmin, updateAdmin, deleteAdmin, addPenelitianExcelController, findMahasiswaByNameAndNIDN, findDosenByNameAndNIDN,
    readNotif
} = require("../../controller/api/ajaxApiController");
const {multerMultipleFieldHandler, multerSingleFieldFileHandler} = require("../../middleware/fileMiddleware");
const {authMiddleware, adminRoleMiddleware} = require("../../middleware/authMiddleware");
const {getPenelitian, getBiayaPenelitian} = require("../../controller/api/chartController");
const router = express.Router();

router.get("/auth/migrate", migrateController)
router.post("/auth/login", loginController)
router.get("/auth/logout", logoutController)
router.post("/auth/change-password", authMiddleware, changeAdminPassword)

router.get("/table/mahasiswa", authMiddleware, adminRoleMiddleware, mahasiswaDatatableController)
router.get("/table/dosen", authMiddleware, adminRoleMiddleware, dosenDatatableController)
router.get("/table/penelitian", authMiddleware, adminRoleMiddleware, penelitianDatatableController)
router.get("/table/kategori", authMiddleware, kategoriDatatableController)
router.get("/table/subkategori/:id", authMiddleware, adminRoleMiddleware, subkategoriDatatableController)
router.get("/table/admin", authMiddleware, adminRoleMiddleware, adminDatatableController)

router.get('/chart/penelitian/all/:year', authMiddleware, getPenelitian)
router.get('/chart/penelitian/biaya/:year', authMiddleware, getBiayaPenelitian)

router.get('/subkategori/:kategoriId', authMiddleware, adminRoleMiddleware, getSubKategoriByKategoriIdController)

router.post('/penelitian/excel', authMiddleware, adminRoleMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addPenelitianExcelController);
router.post('/penelitian', authMiddleware, adminRoleMiddleware, multerMultipleFieldHandler([
    {
        name: 'file_proposal',
        dest: 'file_proposal',
        maxCount: 1
    },
    {
        name: 'surat_perjanjian_kerjasama',
        dest: 'surat_perjanjian_kerjasama',
        maxCount: 1
    },
    {
        name: 'file_monev',
        dest: 'file_monev',
        maxCount: 1
    },
    {
        name: 'file_laporan_kemajuan',
        dest: 'file_laporan_kemajuan',
        maxCount: 1
    },
    {
        name: 'file_laporan_akhir',
        dest: 'file_laporan_akhir',
        maxCount: 1
    }
]), addPenelitianController)

router.patch('/penelitian', authMiddleware, adminRoleMiddleware, multerMultipleFieldHandler([
    {
        name: 'file_proposal',
        dest: 'file_proposal',
        maxCount: 1
    },
    {
        name: 'surat_perjanjian_kerjasama',
        dest: 'surat_perjanjian_kerjasama',
        maxCount: 1
    },
    {
        name: 'file_monev',
        dest: 'file_monev',
        maxCount: 1
    },
    {
        name: 'file_laporan_kemajuan',
        dest: 'file_laporan_kemajuan',
        maxCount: 1
    },
    {
        name: 'file_laporan_akhir',
        dest: 'file_laporan_akhir',
        maxCount: 1
    }]), ubahPenelitianController)

router.patch('/penelitian/cancel/:id', authMiddleware, adminRoleMiddleware, cancelPenelitianController)

router.delete('/penelitian/:id', authMiddleware, adminRoleMiddleware, deletePenelitianController)

router.post('/kategori', authMiddleware, adminRoleMiddleware, addKategoriController)
router.patch('/kategori', authMiddleware, adminRoleMiddleware, ubahKategoriController)
router.delete('/kategori/:id', authMiddleware, adminRoleMiddleware, deleteKategoriController)

router.post('/subkategori', authMiddleware, adminRoleMiddleware, addSubkategoriController)
router.patch('/subkategori', authMiddleware, adminRoleMiddleware, updateSubkategoriController)
router.delete('/subkategori/:id', authMiddleware, adminRoleMiddleware, deleteSubkategoriController)

router.post('/dosen', authMiddleware, adminRoleMiddleware, addDosen)
router.post('/dosen/excel', authMiddleware, adminRoleMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addDosenByExcel)
router.patch('/dosen', authMiddleware, adminRoleMiddleware, updateDosen)
router.delete('/dosen/:id', authMiddleware, adminRoleMiddleware, deleteDosen)
router.post('/dosen/check', authMiddleware, adminRoleMiddleware, checkNisnDosenExists)
router.get('/dosen/search', authMiddleware, adminRoleMiddleware, findDosenByNameAndNIDN)

router.post('/mahasiswa', authMiddleware, adminRoleMiddleware, addMahasiswa)
router.post('/mahasiswa/excel', authMiddleware, adminRoleMiddleware, multerSingleFieldFileHandler('/excel', 'file'), addMahasiswaByExcel)
router.patch('/mahasiswa', authMiddleware, adminRoleMiddleware, updateMahasiswa)
router.delete('/mahasiswa/:id', authMiddleware, adminRoleMiddleware, deleteMahasiswa)
router.post('/mahasiswa/check', authMiddleware, adminRoleMiddleware, checkNIMMahasiswaExists)
router.get('/mahasiswa/search', authMiddleware, adminRoleMiddleware, findMahasiswaByNameAndNIDN)

router.post('/admin', authMiddleware, adminRoleMiddleware, addAdmin)
router.patch('/admin', authMiddleware, adminRoleMiddleware, updateAdmin)
router.delete('/admin/:id', authMiddleware, adminRoleMiddleware, deleteAdmin)

router.post('/notif/read', authMiddleware, adminRoleMiddleware, readNotif)

module.exports = router;
