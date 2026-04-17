const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile")["development"]);

router.get("/rooms", async function(req, res) {
    const rooms = await knex("rooms").select("*");
    res.setHeader("Content-Type", "application/json");
    res.send(rooms);
});

module.exports = router;