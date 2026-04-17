const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile")["development"]);

router.get("/test", async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send({
        "status": "OK"
    });
});

module.exports = router;