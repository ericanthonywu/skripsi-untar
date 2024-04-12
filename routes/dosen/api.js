const express = require('express');
const {loginController, migrateController, logoutController, loginDosenController} = require("../../controller/api/authController");
const {
    penelitianDatatableController,
    kategoriDatatableController,
    subkategoriDatatableController,
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
} = require("../../controller/api/ajaxApiController");
const {multerMultipleFieldHandler, multerSingleFieldFileHandler} = require("../../middleware/fileMiddleware");
const {authMiddleware, adminRoleMiddleware} = require("../../middleware/authMiddleware");
const {getPenelitian, getBiayaPenelitian} = require("../../controller/api/chartController");
const router = express.Router();

router.get("/auth/migrate", migrateController)
router.post("/auth/login", loginDosenController)
router.get("/auth/logout", logoutController)

router.get("/table/penelitian", authMiddleware, adminRoleMiddleware, penelitianDatatableController)
router.get("/table/kategori", authMiddleware, adminRoleMiddleware, kategoriDatatableController)
router.get("/table/subkategori/:id", authMiddleware, adminRoleMiddleware, subkategoriDatatableController)

router.get('/chart/penelitian/all/:year', authMiddleware, getPenelitian)
router.get('/chart/penelitian/biaya/:year', authMiddleware, getBiayaPenelitian)

router.get('/subkategori/:kategoriId', authMiddleware, adminRoleMiddleware, getSubKategoriByKategoriIdController)

router.post('/penelitian', authMiddleware, adminRoleMiddleware, multerMultipleFieldHandler([{
    name: 'file_proposal', dest: 'file_proposal', maxCount: 1
}, {
    name: 'surat_perjanjian_kerjasama', dest: 'surat_perjanjian_kerjasama', maxCount: 1
}, {
    name: 'file_monef', dest: 'file_monef', maxCount: 1
}, {
    name: 'file_laporan_akhir', dest: 'file_laporan_akhir', maxCount: 1
}]), addPenelitianController)

router.patch('/penelitian', authMiddleware, adminRoleMiddleware, multerMultipleFieldHandler([{
    name: 'file_proposal', dest: 'file_proposal', maxCount: 1
}, {
    name: 'surat_perjanjian_kerjasama', dest: 'surat_perjanjian_kerjasama', maxCount: 1
}, {
    name: 'file_monef', dest: 'file_monef', maxCount: 1
}, {
    name: 'file_laporan_akhir', dest: 'file_laporan_akhir', maxCount: 1
}]), ubahPenelitianController)

router.patch('/penelitian/cancel/:id', authMiddleware, adminRoleMiddleware, cancelPenelitianController)

router.delete('/penelitian/:id', authMiddleware, adminRoleMiddleware, deletePenelitianController)

router.post('/kategori', authMiddleware, adminRoleMiddleware, addKategoriController)
router.patch('/kategori', authMiddleware, adminRoleMiddleware, ubahKategoriController)
router.delete('/kategori/:id', authMiddleware, adminRoleMiddleware, deleteKategoriController)

router.post('/subkategori', authMiddleware, adminRoleMiddleware, addSubkategoriController)
router.patch('/subkategori', authMiddleware, adminRoleMiddleware, updateSubkategoriController)
router.delete('/subkategori/:id', authMiddleware, adminRoleMiddleware, deleteSubkategoriController)

module.exports = router;
