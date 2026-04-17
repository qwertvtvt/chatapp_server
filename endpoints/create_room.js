const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile")["development"]);

function generateId(length) {
    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM012345679".split("");
    let result = "";
    for(let i = 0;i < length;i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

router.post("/create_room", async function(req, res) {
    const roomId = generateId(5);
    const roomname = req.body.name;
    const created_at = Date.now();
    knex("rooms").insert({
        roomId, roomname, created_at
    }).then(function() {
        res.setHeader("Content-Type", "application/json");
        res.send({
            status: "OK"
        });
    }).catch(function(error) {
        console.log(error);
        res.setHeader("Content-Type", "application/json");
        res.send({
            status: "error"
        });
    });
});

module.exports = router;