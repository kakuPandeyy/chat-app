const router = require('express').Router()
const {addMsg} = require("../controllers/messageControllles")
const {showMsg} = require("../controllers/messageControllles")
router.post("/addMsg",addMsg).get("/addMsg",(req,res)=>{
    res.send("kaku")
})
router.post("/showMsg",showMsg).get("/showMsg",(req,res)=>{
    res.send("kaku")
})
module.exports = router 