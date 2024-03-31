const express = require('express');
const {loginController, migrateController, logoutController} = require("../../controller/admin/api/authController");
const {penelitianDatatableController} = require("../../controller/admin/api/datatableController");
const {
    getSubKategoriByKategoriIdController,
    addPenelitianController
} = require("../../controller/admin/api/ajaxApiController");
const {multerMultipleFieldHandler} = require("../../middleware/fileMiddleware");
const router = express.Router();

router.get("/auth/migrate", migrateController)
router.post("/auth/login", loginController)
router.get("/auth/logout", logoutController)

router.get("/table/penelitian", penelitianDatatableController)

router.get('/subkategori/:kategoriId', getSubKategoriByKategoriIdController)

router.post('/penelitian', addPenelitianController, multerMultipleFieldHandler([
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
]))

module.exports = router;
