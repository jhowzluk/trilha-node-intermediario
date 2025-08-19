const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.get("/search", userController.searchUserByName);

module.exports = router;
