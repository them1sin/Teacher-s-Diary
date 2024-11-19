const express = require("express");
const router = express.Router();

const {user_list, user_delete, user_create} = require("../controllers/user/user.js")


router.post("/create", user_create);
router.delete("/delete", user_delete);
router.get("/get_users", user_list);


module.exports = router;