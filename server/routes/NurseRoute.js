// nurseRoute.js
const express = require("express");
const router = express.Router();
const adminAuth = require('./middlewares/adminAuth');
const {
  getNurses,
  getNurseCount,
  getNurseById,
  saveNurse,
  updateNurse,
  deleteNurse,
} = require("../controllers/NurseController.js");

router.get("/nurses", getNurses);
router.get("/nurses/count", getNurseCount);
router.get("/nurses/:id", adminAuth, getNurseById);
router.post("/nurses", adminAuth, saveNurse);
router.patch("/nurses/:id", adminAuth, updateNurse);
router.delete("/nurses/:id", adminAuth, deleteNurse);

module.exports = router;