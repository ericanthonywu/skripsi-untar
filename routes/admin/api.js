const express = require('express');
const {loginController, migrateController, logoutController} = require("../../controller/admin/api/authController");
const {penelitianDatatableController} = require("../../controller/admin/api/datatableController");
const {getSubKategoriByKategoriIdController} = require("../../controller/admin/api/ajaxApiController");
const router = express.Router();

router.get("/auth/migrate", migrateController)
router.post("/auth/login", loginController)
router.get("/auth/logout", logoutController)

router.get("/table/penelitian", penelitianDatatableController)

router.get('/subkategori/:kategoriId', getSubKategoriByKategoriIdController)

module.exports = router;
