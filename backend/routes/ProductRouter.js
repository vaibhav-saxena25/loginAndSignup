const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
    console.log("----------Logged in User detail ------------");
    console.log(req.user);
    res.status(200).json([
        {
            "name": "mobile",
            "price": 1000
        },
        {
            "name": "tv",
            "price": 12000
        }
    ]);
});

module.exports = router;
