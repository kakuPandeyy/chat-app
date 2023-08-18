const router = require("express").Router();
const {register,login,setAvatar,getContact} = require("../controllers/userControlles")

router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar",setAvatar)
router.get("/getContact/:id",getContact)
module.exports = router 