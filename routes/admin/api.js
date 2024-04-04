const express = require('express');
const {loginController, migrateController, logoutController} = require("../../controller/admin/api/authController");
const {
    penelitianDatatableController,
    kategoriDatatableController
} = require("../../controller/admin/api/datatableController");
const {
    getSubKategoriByKategoriIdController,
    addPenelitianController, deletePenelitianController, addKategoriController, deleteKategoriController
} = require("../../controller/admin/api/ajaxApiController");
const {multerMultipleFieldHandler} = require("../../middleware/fileMiddleware");
const {authMiddleware} = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/auth/migrate", authMiddleware, migrateController)
router.post("/auth/login", authMiddleware, loginController)
router.get("/auth/logout", authMiddleware, logoutController)

router.get("/table/penelitian", authMiddleware, penelitianDatatableController)
router.get("/table/kategori", authMiddleware, kategoriDatatableController)

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

router.delete('/penelitian/:id', authMiddleware, deletePenelitianController)

router.post('/kategori', authMiddleware, addKategoriController)
router.delete('/kategori/:id', authMiddleware, deleteKategoriController)

module.exports = router;
