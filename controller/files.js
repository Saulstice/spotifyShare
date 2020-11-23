//
const express = require("express");
var router = express.Router();
router.get("/",function(req,res){
    if (req.user) {
        res.redirect("/home");
    }
    res.render("index");
});
module.exports = router;