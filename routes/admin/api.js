const express = require('express');
const {login, migrate, logout} = require("../../controller/admin/api/authController");
const {mahasiswa} = require("../../controller/admin/api/datatableController");
const router = express.Router();

router.get("/auth/migrate", migrate)
router.post("/auth/login", login)
router.get("/auth/logout", logout)

router.get("/table/mahasiswa", mahasiswa)

module.exports = router;
